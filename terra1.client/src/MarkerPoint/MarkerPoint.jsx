import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MarkerPoint.css'

export default function MarkerPoint({ position, name, description, idPoint }) {
    return (
        <Marker position={position}>
            <Popup>
                <div className='popup'>

                </div>
            </Popup>
        </Marker>
    ) 
}