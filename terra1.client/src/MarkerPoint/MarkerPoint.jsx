import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MarkerPoint.css'
import {Icon} from 'leaflet'
import dangerChecpoints from './img/dangerChecpoints.svg'
import haltChecpoints from './img/haltChecpoints.svg'
import noteChecpoints from './img/noteChecpoints.svg'
import sightChecpoints from './img/sightChecpoints.svg'

export default function MarkerPoint({ position, name, description, imageIcon, isPopup, image }) {

    const iconChecpoints = [haltChecpoints, dangerChecpoints, noteChecpoints, sightChecpoints]

    const icon = new Icon ({
        iconUrl : iconChecpoints[imageIcon],
        iconSize : [40,40],
        iconAnchor: [17, 35],
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