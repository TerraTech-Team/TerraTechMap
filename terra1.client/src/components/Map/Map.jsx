import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint.jsx';
import { useState, useEffect } from 'react'
import WindowMarker from '../WindowMarker/WindowMarker.jsx';

export default function Map({ isWidgetActive, checkpoints, update }) {

    const [window, setWindow] = useState(false)
    const [position, setPosition] = useState(null)
    const [checkpointsData, setCheckpointsData] = useState([])

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
      {window ? <WindowMarker position={position} onClickDelete={() => (setWindow(false), setPosition(null))} onClickSave={() => setWindow(false)} checkpointsData={checkpointsData} onUpdate={setCheckpointsData}/> : null}
      <MapContainer className='map'center={[56.837405, 60.656652]} zoom={13}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        { checkpointsData.map((points) => <MarkerPoint key={points.id} position={[points.x, points.y]} />) }
        { checkpoints.map((points) => <MarkerPoint key={points.id} position={[points.x, points.y]} />) }

        {isWidgetActive ? <LocationMarker /> : null}
      </MapContainer>
    </>
  );
}