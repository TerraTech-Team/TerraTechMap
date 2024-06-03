import { useEffect, useRef, useState } from "react";
import { Polyline } from 'react-leaflet';
import CustomMarker from "../CustomMarker/CustomMarker";
import { useMapRefContextContext } from "../../../CustomHooks/MapRefContext";

export default function RulerWidget({GetCoords}) {
    const [controlPointsOfRuler, setControlPointsOfRuler] = useState([]);
    const [rulerLength, setRulerLength] = useState(0);
    const popRef = useRef(null);

    const handleMapClick = (latlng) => {
        setControlPointsOfRuler((prevPoints) => [...prevPoints, [latlng.lat, latlng.lng]]);
        if (controlPointsOfRuler.length > 0) 
        {
            let length = distance(controlPointsOfRuler[controlPointsOfRuler.length - 1][0], controlPointsOfRuler[controlPointsOfRuler.length - 1][1], latlng.lat, latlng.lng)
            setRulerLength(prev => prev + length)
        }
    };

    function deg2rad(num) {
        return num * Math.PI / 180;
      }

    function distance(lat_1, lon_1, lat_2, lon_2) {
        const radius_earth = 6371e3;
        const lat1_rad = deg2rad(lat_1);
        const lon1_rad = deg2rad(lon_1);
        const lat2_rad = deg2rad(lat_2);
        const lon2_rad = deg2rad(lon_2);
        const delta_lat = lat2_rad - lat1_rad;
        const delta_lon = lon2_rad - lon1_rad;
    
        const a = Math.sin(delta_lat / 2) * Math.sin(delta_lat / 2) +
                  Math.cos(lat1_rad) * Math.cos(lat2_rad) *
                  Math.sin(delta_lon / 2) * Math.sin(delta_lon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = radius_earth * c;
        return distance;
      }

      useEffect(() => {
        if (popRef.current !== null)
        {
            popRef.current.openPopup();
        }
      }, [popRef.current])

    return (
        <>
            <GetCoords onClick={handleMapClick} />
            {controlPointsOfRuler.slice(0, controlPointsOfRuler.length - 1).map(point => <CustomMarker key={point} position={point} type={"ruler"} popupSize={[16, 16]} iconAnchor={[8, 8]} popupAnchor={[0,0]} isPopup={false}/>)}
            {controlPointsOfRuler.length > 0 ? <CustomMarker key={controlPointsOfRuler[controlPointsOfRuler.length - 1]} popRef={popRef} length={rulerLength} position={controlPointsOfRuler[controlPointsOfRuler.length - 1]} type={"ruler"} popupSize={[16, 16]} iconAnchor={[8, 8]} popupAnchor={[0,0]}/> : null}
            <Polyline positions={controlPointsOfRuler} pathOptions={{color: "#707070", weight: 5}}/>
        </>
    )
}