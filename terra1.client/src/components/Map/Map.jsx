import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint.jsx';
import { useState, useEffect } from 'react'
import DataPoints from '../../../data-points.json'
import WindowMarker from '../WindowMarker/WindowMarker.jsx';

export default function Map({ isWidgetActive }) {

    const [window, setWindow] = useState(false)
    const [position, setPosition] = useState(null)

    function LocationMarker() {

      useMapEvents({
        click(e) {
          setWindow(true);
          setPosition([e.latlng.lat, e.latlng.lng]);
        }
      })
    
      return position === null ? null : <MarkerPoint position={position} />
    }

    useEffect(() => {
      if (!isWidgetActive) {
          setWindow(false);
          setPosition(null);
      }
  }, [isWidgetActive]);

  return (
    <>
      {window ? <WindowMarker position={position} onClick={() => (setWindow(false), setPosition(null))}/> : null}
      <MapContainer className='map'center={[56.837405, 60.656652]} zoom={13}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {/* {DataPoints.map((points) => <MarkerPoint key={points.name} position={points.position} />)} */}

        {isWidgetActive ? <LocationMarker /> : null}
      </MapContainer>
    </>
  );
}