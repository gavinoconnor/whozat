import './App.css'
import AnimalTile from './AnimalTile'

function App() {
  return (
    <div className="App">
      {/* Title component */}
      <h2>WHOZAT!?</h2>

      <div className="wrapper">
        {/* Game component */}
        <div className="tile-container">
          <AnimalTile value="🤗"/>
          <AnimalTile value="🤗"/>
          <AnimalTile value="🤗"/>
          <AnimalTile value="🤗"/>
          <AnimalTile value="🤗"/>
          <AnimalTile value="🤗"/>
          <AnimalTile value="🤗"/>
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
