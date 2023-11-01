import { useState } from 'react'
import { shuffle } from './utils'
import { animalsData, generateTiles } from './data/data'
import AnimalTile from './AnimalTile'
import './App.css'


function App() {

  const [animalTiles, setAnimalTiles] = useState(() => {
    const selectedAnimals = getFourRandomAnimals(animalsData)
    const selectedTiles = getTilesForSelectedAnimals(selectedAnimals)
    return shuffle(selectedTiles)
  })

  const [hasWon, setHasWon] = useState(false)

  function getFourRandomAnimals(animalData) {
    return shuffle(animalData).slice(0, 4)
  }

  function getTilesForSelectedAnimals(selectedAnimals) {
    return generateTiles(selectedAnimals)
  }

  function getNewAnimalTiles() {
    const newAnimals = getFourRandomAnimals(animalsData)
    setAnimalTiles(shuffle(getTilesForSelectedAnimals(newAnimals)))
    setHasWon(false)
  }

  function scrambleCurrentTiles() {
    setAnimalTiles(prevTiles => shuffle([...prevTiles]))
  }

  function clearHeldTiles() {
    setAnimalTiles(prevTiles => 
      prevTiles.map(tile => {
        if (tile.isMatched) {
          return tile;
        }
        return { ...tile, isHeld: false }
      })
    )
  }

  function checkWinCondition(tiles) {
    return tiles.every(tile => tile.isMatched)
  }

  function triggerWinAnimation() {
    setHasWon(true)
  }
  
  function handleClick(tileId) {
    setAnimalTiles(prevTiles => {
      let updatedTiles = prevTiles.map(tile => 
        tile.id === tileId ? {...tile, isHeld: !tile.isHeld} : tile
        )
        // Check for three matching tiles
        const heldTiles = updatedTiles.filter(tile => tile.isHeld)
        const groupedTiles = {}

        heldTiles.forEach(tile => {
          if (!groupedTiles[tile.animal]) {
            groupedTiles[tile.animal] = []
          }
          groupedTiles[tile.animal].push(tile)
        })

        for (const animal in groupedTiles) {
          // If there are three held tiles that match...
          if (groupedTiles[animal].length === 3) {
            updatedTiles = updatedTiles.map(tile => {
              // and the clicked tile is one of those three...
              if (groupedTiles[animal].some(matchedTile => matchedTile.id === tile.id)) {
                // set isMatched to true
                return { ...tile, isMatched: true }
              }
              return tile
            })
          }
        }

        if (checkWinCondition(updatedTiles)) {
          triggerWinAnimation()
        }

        return updatedTiles
    })
  }
  

  const renderedTiles = animalTiles
  .sort((a, b) => b.isMatched - a.isMatched)
  .map(tile => (
    <AnimalTile 
      key={tile.id} 
      value={tile.animal}
      category={tile.category}
      isHeld={tile.isHeld}
      isMatched={tile.isMatched}
      colorClass={tile.colorClass} 
      handleClick={() => handleClick(tile.id)}   
    />
  ))
  
  return (
    <div className="app">
      <h2 className="title">WHOZAT<span>!?</span></h2>
      <div className="wrapper">
        <div className={`tile-container ${hasWon ? 'win-animation' : ''}`}>
          {renderedTiles}
        </div>
        <div className="button-container">
          <button className="btn" onClick={getNewAnimalTiles}>RESET</button>
          <button className="btn" onClick={scrambleCurrentTiles} disabled={hasWon}>MIX-UP</button>
          <button className="btn" onClick={clearHeldTiles} disabled={hasWon}>CLEAR</button>
        </div>
      </div>
    </div>
  );
}

export default App;
