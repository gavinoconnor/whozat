import './AnimalTile.css'
import { triggerHaptic } from 'tactus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlicorn,
  faBadgerHoney,
  faBat, faBee, faBird, faBugs,
  faCat, faCatSpace, faCow, faCrab, faCrow,
  faDeer, faDeerRudolph, faDinosaur, faDog, faDolphin,
  faDove, faDragon, faDuck, faElephant,
  faFish, faFrog, faHippo, faHorse, faHorseSaddle,
  faKiwiBird,
  faLobster, faLocust, faMonkey, faMosquito,
  faMouseField,
  faNarwhal, faOtter,
  faPegasus, faPig,
  faRabbit, faRaccoon, faRam,
  faSheep, faShrimp, faSnake, faSpider, faSpiderBlackWidow, faSquid, faSquirrel,
  faTurtle, faUnicorn, faWhale, faWorm,
} from '@fortawesome/pro-light-svg-icons'

const animalIcons = {
  alicorn:              faAlicorn,
  'badger-honey':       faBadgerHoney,
  bat:                  faBat,
  bee:                  faBee,
  bird:                 faBird,
  bugs:                 faBugs,
  cat:                  faCat,
  'cat-space':          faCatSpace,
  cow:                  faCow,
  crab:                 faCrab,
  crow:                 faCrow,
  deer:                 faDeer,
  'deer-rudolph':       faDeerRudolph,
  dinosaur:             faDinosaur,
  dog:                  faDog,
  dolphin:              faDolphin,
  dove:                 faDove,
  dragon:               faDragon,
  duck:                 faDuck,
  elephant:             faElephant,
  fish:                 faFish,
  frog:                 faFrog,
  hippo:                faHippo,
  horse:                faHorse,
  'horse-saddle':       faHorseSaddle,
  'kiwi-bird':          faKiwiBird,
  lobster:              faLobster,
  locust:               faLocust,
  monkey:               faMonkey,
  mosquito:             faMosquito,
  'mouse-field':        faMouseField,
  narwhal:              faNarwhal,
  otter:                faOtter,
  pegasus:              faPegasus,
  pig:                  faPig,
  rabbit:               faRabbit,
  raccoon:              faRaccoon,
  ram:                  faRam,
  sheep:                faSheep,
  shrimp:               faShrimp,
  snake:                faSnake,
  spider:               faSpider,
  'spider-black-widow': faSpiderBlackWidow,
  squid:                faSquid,
  squirrel:             faSquirrel,
  turtle:               faTurtle,
  unicorn:              faUnicorn,
  whale:                faWhale,
  worm:                 faWorm,
}

const displayNames = {
  'badger-honey':       'Honey Badger',
  'cat-space':          'Space Cat',
  'deer-rudolph':       'Rudolph',
  'horse-saddle':       'Saddled Horse',
  'kiwi-bird':          'Kiwi',
  'mouse-field':        'Field Mouse',
  'spider-black-widow': 'Black Widow',
}

function getDisplayName(animal) {
  if (!animal || typeof animal !== 'string') return ''
  if (displayNames[animal]) return displayNames[animal]
  return animal.charAt(0).toUpperCase() + animal.slice(1)
}

export default function AnimalTile({ isHeld, isMatched, isFaceDown, colorClass, handleClick, value }) {

  const tileClass = `
    animal-tile
    ${isFaceDown ? 'face-down' : ''}
    ${isHeld && !isFaceDown ? colorClass : ''}
    ${isMatched ? 'matched' : ''}
  `
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      triggerHaptic()
      handleClick()
    }
  }

  return (
    <div
      className={tileClass}
      onClick={() => { triggerHaptic(); handleClick() }}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-pressed={isHeld}
      aria-label={isFaceDown ? 'Face-down card' : getDisplayName(value)}
    >
      {isFaceDown ? (
        <span className="card-back" aria-hidden="true">?</span>
      ) : (
        <>
          {isHeld && !isMatched && <h2 className="animal-name">{getDisplayName(value)}</h2>}
          <FontAwesomeIcon
            icon={animalIcons[value]}
            size="3x"
            bounce={!!isHeld}
            flip={!!isMatched}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  )
}
