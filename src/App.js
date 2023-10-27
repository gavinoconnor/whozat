import { useState } from 'react'
import { shuffle } from './utils'
import { animalNameArray, initialTiles } from './data/data'
import AnimalTile from './AnimalTile'
import './App.css'


function App() {

  const [animalTiles, setAnimalTiles] = useState(() => {
    const selectedAnimals = getFourRandomAnimals(animalNameArray)
    const selectedTiles = getTilesForSelectedAnimals(selectedAnimals)
    return shuffle(selectedTiles)
  })

  function getFourRandomAnimals(animalNames) {
    return shuffle(animalNames).slice(0, 4)
  }

  function getTilesForSelectedAnimals(selectedAnimals) {
    return selectedAnimals.flatMap(animal => 
      initialTiles.filter(tile => tile.animal === animal))
  }

  function getNewAnimalTiles() {
    const newAnimals = getFourRandomAnimals(animalNameArray)
    setAnimalTiles(shuffle(getTilesForSelectedAnimals(newAnimals)))
  }

  function scramble() {
    setAnimalTiles(prevTiles => shuffle([...prevTiles]))
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
            console.log(`Three ${animal}s have been selected!`)
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
  

  const renderedTiles = animalTiles.map(tile => (
    <AnimalTile 
      key={tile.id} 
      value={tile.animal}
      isHeld={tile.isHeld}
      isMatched={tile.isMatched} 
      handleClick={() => handleClick(tile.id)}   
    />
  ))
  
  return (
    <div className="App">
      <h2>WHOZAT!?</h2>
      <div className="wrapper">
        <div className="tile-container">
          {renderedTiles}
        </div>
        <div className="button-container">
          <button className="btn" onClick={getNewAnimalTiles}>New Animals</button>
          <button className="btn" onClick={scramble}>Scramble</button>
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
