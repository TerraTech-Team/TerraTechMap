import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint.jsx';

export default function BasicMap() {
  return (
    <MapContainer className='map' center={[56.837405, 60.656652]} zoom={13}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

      <MarkerPoint position={[56.837415, 60.656639]} />
      <MarkerPoint position={[56.844033, 60.654077]} />
      <MarkerPoint position={[56.841056, 60.650461]} />

    </MapContainer>
  );
}