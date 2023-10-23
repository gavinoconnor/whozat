import './AnimalTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOtter } from '@fortawesome/pro-regular-svg-icons'

 export default function AnimalTile(props) {
  return (
    <div className="animal-tile">
      {/* <h2>{props.value}</h2> */}
      <FontAwesomeIcon icon={faOtter}/>
    </div>
  )
}