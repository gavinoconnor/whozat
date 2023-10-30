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
  return string.charAt(0).toUpperCase() + string.slice(1)
 }

 export default function AnimalTile(props) {
  let tileClass = `animal-tile`

  if (props.isHeld) {
    tileClass += ` ${props.colorClass}`
  }
  
  if (props.isMatched) {
    tileClass += ` matched`
  }
  return (
    <div 
      className={tileClass} 
      onClick={props.handleClick}
    >
      {props.isHeld && !props.isMatched && <h2 className="animal-name">{capitalizeName(props.value)}</h2>}
      <FontAwesomeIcon 
        icon={animalIcons[props.value]} 
        size="3x"
        bounce={props.isHeld ? true : false}
        flip={props.isMatched ? true : false}
      />
    </div>
  )
}