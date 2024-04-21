import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MarkerPoint.css'
import {Icon} from 'leaflet'
import dangerCheckpoint from './img/dangerCheckpoint.svg'
import haltCheckpoint from './img/haltCheckpoint.svg'
import noteCheckpoint from './img/noteCheckpoint.svg'
import sightCheckpoint from './img/sightCheckpoint.svg'
import startCheckpoint from './img/startCheckpoint.svg'
import endCheckpoint from './img/endCheckpoint.svg'
import intermediateCheckpoint from './img/intermediateCheckpoint.svg'

export default function MarkerPoint({ position, name, description, imageIcon, isPopup, image }) {

    const iconChecpoints = [haltCheckpoint, dangerCheckpoint, noteCheckpoint, sightCheckpoint, startCheckpoint, endCheckpoint, intermediateCheckpoint]

    const icon = new Icon ({
        iconUrl : iconChecpoints[imageIcon],
        iconSize : [41,41],
        iconAnchor: [20, 41],
        popupAnchor: [4, -30]
      })
    return (
        <Marker position={position} icon={icon}>
            {isPopup ? <Popup>
                <div className='popup'>
                    <p className='nameCheckpoints'>{name ? name : "Чекпоинт без названия"}</p>
                    <p className='descriptionCheckpoints'>{description}</p>
                    {image !== null ? <img className="photoCheckpoints" key={image.fileDownloadName} src={`data:image/jpeg;base64,${image.fileContents}`} /> : null}
                </div>
            </Popup> : null}
            
        </Marker>
    ) 
}