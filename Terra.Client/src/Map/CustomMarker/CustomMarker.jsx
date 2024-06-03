import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CustomMarker.css'
import { Icon } from 'leaflet'

import dangerCheckpoint from './img/dangerCheckpoint.svg'
import haltCheckpoint from './img/haltCheckpoint.svg'
import noteCheckpoint from './img/noteCheckpoint.svg'
import sightCheckpoint from './img/sightCheckpoint.svg'
import startTrackCheckpoint from './img/startTrackCheckpoint.svg'
import endTrackCheckpoint from './img/endTrackCheckpoint.svg'
import intermediateTrackCheckpoint from './img/intermediateTrackCheckpoint.svg'
import rulerCheckpoint from './img/rulerCheckpoint.svg'

export default function CustomMarker({popRef = null, length = -1, position, type, popupSize = [41, 41], iconAnchor = [20, 41], popupAnchor = [4, -30], isPopup = true }) {

    const iconChecpoints = {
        "halt": haltCheckpoint,
        "danger": dangerCheckpoint,
        "note": noteCheckpoint,
        "sight": sightCheckpoint,
        "startTrack": startTrackCheckpoint,
        "endTrack": endTrackCheckpoint,
        "intermediateTrack": intermediateTrackCheckpoint,
        "ruler": rulerCheckpoint
    }

    const typesOfPopup = {
        "halt": null,
        "danger": null,
        "note": null,
        "sight": null,
        "startTrack": null,
        "endTrack": null,
        "intermediateTrack": null,
        "ruler": 
            <Popup closeButton={false} >
                <p className='popupRuler'>{`${length.toFixed(0)} м`}</p>
            </Popup>
    }


    const icon = new Icon ({
        iconUrl : iconChecpoints[type],
        iconSize : popupSize,
        iconAnchor: iconAnchor,
        popupAnchor: popupAnchor
      })

    return (
        <Marker position={position} icon={icon} ref={popRef}>
            {isPopup ? typesOfPopup[type] : null}
        </Marker>
    )
}