import './Map.css'
import { MapContainer, TileLayer, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RulerWidget from './RulerWidget/RulerWidget.jsx'
import { useWidgetsStatusContext } from '../../CustomHooks/WidgetsStatusContext.jsx';
import { useMapRefContextContext } from '../../CustomHooks/MapRefContext.jsx';
import { useEffect } from 'react';

export default function Map() {

    const { widgetStatus } = useWidgetsStatusContext();
    const { mapRef } = useMapRefContextContext();

    function GetCoordsOfClick({ onClick }) {
        useMapEvents({
            click(e) {
                onClick(e.latlng);
            }
        });
        return null;
    }

    return (
        <MapContainer 
                    ref={mapRef}
                    zoomControl={false} 
                    attributionControl={false} 
                    className='map'
                    center={[56.837405, 60.656652]} 
                    zoom={13} 
                    doubleClickZoom={false}>
            <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} subdomains={['a', 'b', 'c']}/>

            {widgetStatus.rulerWidget == true ? <RulerWidget GetCoords={GetCoordsOfClick}/> : null}

        </MapContainer>
    )
}