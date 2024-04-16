import { MapContainer, TileLayer, useMapEvents, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint';
import { useEffect, useState } from 'react';


export default function Map({ checkpoints, isWidgetsActive, setCreationWindow, typeCheckpoint, position, setPosition, imagesForCheckpoints, track }) {
  const [colour, setColour] = useState(true);
  const [weight, setWeight] = useState(5);

  function CheckpointMarker() {
    useMapEvents({
      click(e) {
        setCreationWindow(true);
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    })
  
    return position === null ? null : <MarkerPoint position={position} imageIcon={typeCheckpoint} isPopup={false}/>
  }

  function TrackMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    })
  
    return position === null ? null : <MarkerPoint position={position} imageIcon={typeCheckpoint} isPopup={false}/>
  }

  useEffect(() => {
    if (!isWidgetsActive.CheckpointActive) {
        setCreationWindow(false);
        setPosition(null);
    }
  }, [isWidgetsActive.CheckpointActive]);

  const points = track.map(point => [point[1], point[0]]);

  function changeColorAndWeight() {
    setColour(prevColour => !prevColour);
    setWeight(prevWeight => prevWeight === 5 ? 8 : 5);
  }


  return (
      <>
        <MapContainer 
                    zoomControl={false} 
                    attributionControl={false} 
                    className='map'center={[56.837405, 60.656652]} 
                    zoom={13} 
                    doubleClickZoom={false}>

          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

              {checkpoints && checkpoints.map((points) => <MarkerPoint 
                                                              idPoint={points.id} 
                                                              key={points.id} 
                                                              position={[points.x, points.y]} 
                                                              name={points.name} 
                                                              description={points.description} 
                                                              imageIcon={points.type}
                                                              isPopup={true}
                                                              image={imagesForCheckpoints.find(file => file.fileDownloadName === `${points.id}.jpg`) || null}
                                                          />) }
        
          {isWidgetsActive.CheckpointActive ? <CheckpointMarker /> : null}
          
          {isWidgetsActive.TrackActive ? <TrackMarker /> : null}


          {/* {isWidgetsActive.TrackActive ? <Polyline positions={points} 
                    pathOptions={{color: colour ? "#2172D4" : "#1F5393", weight:weight}} 
                    eventHandlers={{click: changeColorAndWeight}} /> : null} */}

        </MapContainer>
      </>
  )
}