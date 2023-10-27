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

  function handleClick(tileId) {
    setAnimalTiles(prevTiles => prevTiles.map(tile => 
      tile.id === tileId ? {...tile, isHeld: !tile.isHeld} : tile
    ))
  }
  
  function getNewAnimalTiles() {
    const newAnimals = getFourRandomAnimals(animalNameArray)
    setAnimalTiles(shuffle(getTilesForSelectedAnimals(newAnimals)))
  }

  function scramble() {
    setAnimalTiles(prevTiles => shuffle([...prevTiles]))
  }

  const renderedTiles = animalTiles.map(tile => (
    <AnimalTile 
      key={tile.id} 
      value={tile.animal}
      isHeld={tile.isHeld} 
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
