import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MarkerPoint.css'
import {Icon} from 'leaflet'
import dangerChecpoints from './img/dangerChecpoints.svg'
import haltChecpoints from './img/haltChecpoints.svg'
import noteChecpoints from './img/noteChecpoints.svg'
import sightChecpoints from './img/sightChecpoints.svg'

export default function MarkerPoint({ position, name, description, image }) {

    const iconChecpoints = [haltChecpoints, dangerChecpoints, noteChecpoints, sightChecpoints]

    const icon = new Icon ({
        iconUrl : iconChecpoints[image],
        iconSize : [40,40],
        iconAnchor: [17, 35],
        popupAnchor: [4, -30]
      })
    return (
        <Marker position={position} icon={icon}>
            <Popup>
                <div className='popup'>

                </div>
            </Popup>
        </Marker>
    ) 
}