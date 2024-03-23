import React from 'react';
import { Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MarkerPoint({ position }) {
    return (
        <Marker position={position}>
            <Popup>
                321 комната: <br /> - Шестопалов Андрей <br /> - Тимохов Алексей
            </Popup>
        </Marker>
    )
}