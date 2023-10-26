import { useState } from 'react'
import './App.css'
import AnimalTile from './AnimalTile'
import { baseAnimals, initialTiles } from './data/data'



function App() {

  const [animalTiles, setAnimalTiles] = useState(() => {
    const selectedAnimals = selectAnimals(baseAnimals)
    return getTilesforSelectedAnimals(selectedAnimals)
  })

  function selectAnimals(allAnimals) {
    const shuffled = shuffle(allAnimals)
    return shuffled.slice(0, 4)
  }

  function getTilesforSelectedAnimals(selectedAnimals) {
    return initialTiles.filter(tile => selectedAnimals.includes(tile.animal))
  }

  function shuffle(array) {
    let shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      // swap elements 
      let temp = shuffledArray[i]
      shuffledArray[i] = shuffledArray[randomIndex]
      shuffledArray[randomIndex] = temp
    }
    return shuffledArray
  }

  function handleClick(tileId) {
    setAnimalTiles(prevTiles => prevTiles.map(tile => 
      tile.id === tileId ? {...tile, isHeld: !tile.isHeld} : tile
    ))
  }
  
  function getNewAnimals(animalNames) {
    const selected = selectAnimals(baseAnimals)
    setAnimalTiles(shuffle(getTilesforSelectedAnimals(selected)))
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
          <button className="btn" onClick={() => getNewAnimals(initialTiles)}>New Animals</button>
          <button className="btn" onClick={scramble}>Scramble</button>
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
