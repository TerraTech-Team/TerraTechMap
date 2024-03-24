import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint.jsx';
import { useState } from 'react'

export default function BasicMap() {
    const [selectedPosition, setSelectedPosition] = useState([0, 0]);

    const Markers = () => {
        useMapEvents({
            click(e) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
                console.log({ selectedPosition })
            },      
        })
        return (
            selectedPosition ?
                <MarkerPoint position={selectedPosition} key={selectedPosition[0]} />
                : null
        )   
    }

  return (
    <MapContainer className='map' center={[56.837405, 60.656652]} zoom={13}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

      <MarkerPoint position={[56.837415, 60.656639]} />

      <Markers />

    </MapContainer>
  );
}