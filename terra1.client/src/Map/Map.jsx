import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint';
import { useState, useEffect } from 'react';


export default function Map({ checkpoints, isWidgetActive, setCreationWindow, typeCheckpoint }) {
  const [position, setPosition] = useState(null)

  function LocationMarker() {

    useMapEvents({
      click(e) {
        setCreationWindow(true);
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    })
  
    return position === null ? null : <MarkerPoint position={position} image={typeCheckpoint}/>
  }

  useEffect(() => {
    if (!isWidgetActive) {
        setCreationWindow(false);
        setPosition(null);
    }
    }, [isWidgetActive]);

  return (
      <>
        <MapContainer zoomControl={false} attributionControl={false} className='map'center={[56.837405, 60.656652]} zoom={13}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

              {checkpoints && checkpoints.map((points) => <MarkerPoint idPoint={points.id} key={points.id} position={[points.x, points.y]} name={points.name} description={points.description} image={points.type}/>) }
        
          {isWidgetActive ? <LocationMarker /> : null}

        </MapContainer>
      </>
  )
}