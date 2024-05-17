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
import sizeCheckpoint from './img/size.svg'
import { useRef, useEffect } from 'react';

export default function MarkerPoint({ popRef, isSetLenght, length, panchor, ianchor, size, position, name, description, imageIcon, isPopup, image }) {

    const iconChecpoints = [haltCheckpoint, dangerCheckpoint, noteCheckpoint, sightCheckpoint, startCheckpoint, endCheckpoint, intermediateCheckpoint, sizeCheckpoint]

    const icon = new Icon ({
        iconUrl : iconChecpoints[imageIcon],
        iconSize : size,
        iconAnchor: ianchor,
        popupAnchor: panchor
      })

    return (
        <Marker ref={popRef} position={position} icon={icon}>
            {isPopup ? <Popup closeButton={false}>
                <div className='popup'>
                    <p className='nameCheckpoints'>{name ? name : "Чекпоинт без названия"}</p>
                    <p className='descriptionCheckpoints'>{description}</p>
                    {image !== null ? <img className="photoCheckpoints" key={image.fileDownloadName} src={`data:image/jpeg;base64,${image.fileContents}`} /> : null}
                </div>
            </Popup> : null}

            {isSetLenght ? 
            <Popup closeButton={false} >
                <p className='popLength'>{`${length.toFixed(0)} м`}</p>
            </Popup> : null}
            
        </Marker>
    ) 
}

MarkerPoint.defaultProps = {
    size: [41, 41],
    ianchor: [20, 41],
    panchor: [4, -30],
    popRef: null
}