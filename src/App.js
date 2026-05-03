import { useRef, useState } from 'react'
import { triggerHaptic } from 'tactus'
import { shuffle } from './utils'
import { animalsData, generateTiles } from './data/data'
import { themes } from './themes'
import AnimalTile from './AnimalTile'
import './App.css'
import confetti from 'canvas-confetti'

const MODES = {
  classic:    { tilesPerAnimal: 3, animalCount: 4, faceDown: false, matchCount: 3, colorPerAnimal: true,  label: 'Classic' },
  'memory-2': { tilesPerAnimal: 2, animalCount: 6, faceDown: true,  matchCount: 2, colorPerAnimal: false, label: 'Memory' },
  // 'memory-3': { tilesPerAnimal: 3, animalCount: 4, faceDown: true, matchCount: 3, colorPerAnimal: false, label: 'Memory 3' },
}

const FLIP_BACK_MS = 800

function buildTiles(mode, themeId) {
  const config = MODES[mode]
  const category = themes.find(t => t.id === themeId)?.category ?? null
  const pool = category ? animalsData.filter(a => a.category === category) : animalsData
  const selectedAnimals = shuffle(pool).slice(0, config.animalCount)
  return shuffle(generateTiles(selectedAnimals, {
    tilesPerAnimal: config.tilesPerAnimal,
    faceDown: config.faceDown,
    colorPerAnimal: config.colorPerAnimal,
  }))
}

function App() {

  const [gameMode, setGameMode] = useState('classic')
  const [animalTiles, setAnimalTiles] = useState(() => buildTiles('classic', 'sea'))
  const [hasWon, setHasWon] = useState(false)
  const [theme, setTheme] = useState('sea')

  const flipBackTimeoutRef = useRef(null)
  const isEvaluatingRef = useRef(false)

  function cancelPendingFlipBack() {
    if (flipBackTimeoutRef.current) {
      clearTimeout(flipBackTimeoutRef.current)
      flipBackTimeoutRef.current = null
    }
    isEvaluatingRef.current = false
  }

  function getNewAnimalTiles(mode = gameMode, themeId = theme) {
    cancelPendingFlipBack()
    setAnimalTiles(buildTiles(mode, themeId))
    setHasWon(false)
  }

  function handleThemeChange(themeId) {
    setTheme(themeId)
    getNewAnimalTiles(gameMode, themeId)
  }

  function handleModeChange(nextMode) {
    if (nextMode === gameMode) return
    setGameMode(nextMode)
    getNewAnimalTiles(nextMode)
  }

  function checkWinCondition(tiles) {
    return tiles.every(tile => tile.isMatched)
  }

  function triggerWinAnimation() {
    confetti({
      particleCount: 140,
      spread: 60,
      origin: { y: 0.8 }
    })
    setHasWon(true)
  }

  function handleClick(tileId) {
    const mode = MODES[gameMode]

    // Memory mode: ignore clicks while a mismatch is flipping back
    if (mode.faceDown && isEvaluatingRef.current) return

    setAnimalTiles(prevTiles => {
      const clicked = prevTiles.find(t => t.id === tileId)
      if (!clicked) return prevTiles

      // Memory mode: ignore clicks on matched tiles or tiles already face-up
      if (mode.faceDown && (clicked.isMatched || !clicked.isFaceDown)) {
        return prevTiles
      }

      let updatedTiles = prevTiles.map(tile => {
        if (tile.id !== tileId) return tile
        if (mode.faceDown) {
          return { ...tile, isFaceDown: false, isHeld: true }
        }
        return { ...tile, isHeld: !tile.isHeld }
      })

      // Group held, non-matched tiles by animal
      const heldTiles = updatedTiles.filter(tile => tile.isHeld && !tile.isMatched)
      const groupedTiles = {}
      heldTiles.forEach(tile => {
        if (!groupedTiles[tile.animal]) {
          groupedTiles[tile.animal] = []
        }
        groupedTiles[tile.animal].push(tile)
      })

      for (const animal in groupedTiles) {
        if (groupedTiles[animal].length === mode.matchCount) {
          const matchedIds = new Set(groupedTiles[animal].map(t => t.id))
          updatedTiles = updatedTiles.map(tile =>
            matchedIds.has(tile.id) ? { ...tile, isMatched: true } : tile
          )
          // Classic mode: cluster this match group immediately after previously matched tiles
          // so each set of 3 occupies a single row.
          if (!mode.faceDown) {
            const alreadyMatched = updatedTiles.filter(t => t.isMatched && !matchedIds.has(t.id))
            const justMatched   = updatedTiles.filter(t => matchedIds.has(t.id))
            const notMatched    = updatedTiles.filter(t => !t.isMatched)
            updatedTiles = [...alreadyMatched, ...justMatched, ...notMatched]
          }
        }
      }

      // Memory mode: if matchCount tiles are still held and unmatched after grouping,
      // it's a mismatch — schedule them to flip back down.
      if (mode.faceDown) {
        const stillHeldUnmatched = updatedTiles.filter(t => t.isHeld && !t.isMatched)
        if (stillHeldUnmatched.length === mode.matchCount) {
          const flipIds = new Set(stillHeldUnmatched.map(t => t.id))
          isEvaluatingRef.current = true
          flipBackTimeoutRef.current = setTimeout(() => {
            setAnimalTiles(cur => cur.map(tile =>
              flipIds.has(tile.id) && !tile.isMatched
                ? { ...tile, isFaceDown: true, isHeld: false }
                : tile
            ))
            isEvaluatingRef.current = false
            flipBackTimeoutRef.current = null
          }, FLIP_BACK_MS)
        }
      }

      if (checkWinCondition(updatedTiles)) {
        triggerWinAnimation()
      }

      return updatedTiles
    })
  }


  const renderedTiles = animalTiles.map(tile => (
    <AnimalTile
      key={tile.id}
      value={tile.animal}
      isHeld={tile.isHeld}
      isMatched={tile.isMatched}
      isFaceDown={tile.isFaceDown}
      colorClass={tile.colorClass}
      handleClick={() => handleClick(tile.id)}
    />
  ))

  return (
    <div className={`app theme-${theme}`}>
      <h1 className="title">WHOZAT<span>!?</span></h1>
      <div className="theme-toggle">
        {themes.map(t => (
          <button
            key={t.id}
            className={`theme-btn ${theme === t.id ? 'active' : ''}`}
            data-theme={t.id}
            onClick={() => handleThemeChange(t.id)}
            aria-label={`${t.label} theme`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="wrapper">
        <div className={`tile-container ${hasWon ? 'win-animation' : ''}`}>
          <div className="biome-bg" aria-hidden="true">
            {theme === 'wild' && (
              <>
                <span className="leaf leaf-3" />
                <span className="leaf leaf-4" />
              </>
            )}
            {theme === 'sky' && (
              <>
                <span className="cloud cloud-3" />
                <span className="cloud cloud-4" />
              </>
            )}
          </div>
          {renderedTiles}
        </div>
        <div className="button-container">
          {Object.entries(MODES).map(([id, config]) => (
            <button
              key={id}
              className={`btn mode-btn ${gameMode === id ? 'active' : ''}`}
              onClick={() => { triggerHaptic(); handleModeChange(id) }}
              aria-label={`${config.label} mode`}
              aria-pressed={gameMode === id}
            >
              {config.label.toUpperCase()}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => { triggerHaptic(); getNewAnimalTiles() }}
            aria-label="Reset tiles"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
