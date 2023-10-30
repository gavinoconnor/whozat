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

  function getFourRandomAnimals(animalData) {
    return shuffle(animalData).slice(0, 4)
  }

  function getTilesForSelectedAnimals(selectedAnimals) {
    return generateTiles(selectedAnimals)
  }

  function getNewAnimalTiles() {
    const newAnimals = getFourRandomAnimals(animalsData)
    setAnimalTiles(shuffle(getTilesForSelectedAnimals(newAnimals)))
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
          if (groupedTiles[animal].length === 3) {
            updatedTiles = updatedTiles.map(tile => {
              if (groupedTiles[animal].some(matchedTile => matchedTile.id === tile.id)) {
                return { ...tile, isMatched: true }
              }
              return tile
            })
          }
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
      <h2>WHOZAT!?</h2>
      <div className="wrapper">
        <div className="tile-container">
          {renderedTiles}
        </div>
        <div className="button-container">
          <button className="btn" onClick={getNewAnimalTiles}>Reset</button>
          <button className="btn" onClick={scrambleCurrentTiles}>Scramble</button>
          <button className="btn" onClick={clearHeldTiles}>Clear</button>
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
