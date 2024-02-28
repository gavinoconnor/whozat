import './AnimalTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faAlicorn, 
  faBat, faBee, faBird, faBugs,
  faCat, faCrab, faCow, faCrow, 
  faDeer, faDinosaur, faDog, faDolphin, 
  faDove, faDragon, faDuck, faElephant,
  faFish, faFrog, faHippo, faHorse, 
  faLobster, faLocust, faMonkey, faMosquito,
  faNarwhal,faOtter, faPegasus, faPig,
  faRabbit, faRaccoon, faRam,
  faSheep, faShrimp, faSnake, faSpider, faSquid, faSquirrel,
  faTurtle, faUnicorn, faWhale, faWorm 
 } from '@fortawesome/pro-light-svg-icons'

 // name to icon mapping
 const animalIcons = {
    alicorn: faAlicorn,
    bat: faBat, bee: faBee, bird: faBird, bugs: faBugs,
    cat: faCat, crab: faCrab, cow: faCow, crow: faCrow, 
    deer: faDeer, dinosaur: faDinosaur, dog: faDog, dolphin: faDolphin,
    dove: faDove, dragon: faDragon, duck: faDuck, elephant: faElephant,
    fish: faFish, frog: faFrog, hippo: faHippo, horse: faHorse, 
    lobster: faLobster, locust: faLocust, monkey: faMonkey,
    mosquito: faMosquito, narwhal: faNarwhal, otter: faOtter, 
    pegasus: faPegasus, pig: faPig, rabbit: faRabbit, raccoon: faRaccoon,
    ram: faRam, sheep: faSheep, shrimp: faShrimp, snake: faSnake, 
    spider: faSpider, squid: faSquid, squirrel: faSquirrel,
    turtle: faTurtle, unicorn: faUnicorn, whale: faWhale, worm: faWorm
 }

 function capitalizeName(string) {
  if (!string || typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
 }

 export default function AnimalTile({ isHeld, isMatched, colorClass, handleClick, value }) {
  
  const tileClass = `
    animal-tile 
    ${isHeld ? colorClass : ''} 
    ${isMatched ? 'matched' : ''}
  `
  // Allow Enter and Spacebar keys to 'click' tiles
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick()
    }
  }

  return (
    <div 
      className={tileClass} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-pressed={isHeld}
    >
      {isHeld && !isMatched && <h2 className="animal-name">{capitalizeName(value)}</h2>}
      <FontAwesomeIcon 
        icon={animalIcons[value]} 
        size="3x"
        bounce={!!isHeld}
        flip={!!isMatched}
        aria-hidden="true"
      />
    </div>
  )
}