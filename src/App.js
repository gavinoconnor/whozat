import './App.css'
import AnimalTile from './AnimalTile'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faOtter } from '@fortawesome/pro-regular-svg-icons'



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
