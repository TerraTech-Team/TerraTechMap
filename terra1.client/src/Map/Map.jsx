import { MapContainer, TileLayer, useMapEvents, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint';
import { useEffect, useState } from 'react';


export default function Map({ setFindWindow, layerActive, color_type, season, setIsInfoWindowActive, setTracks, tracks, setLengthTrack, intermediateCheckpoint, setPositionOfIntermediateCheckpoint, modeBuilding, checkpoints, isWidgetsActive, setTrack, setCreationCheckpointWindow, setCreationTrackWindow, typeCheckpoint, positionOfNewCheckpoint, setPositionOfNewCheckpoint, startCheckpoint, setPositionOfStartCheckpoint, endCheckpoint, setPositionOfEndCheckpoint, imagesForCheckpoints, track }) {

  const [rulerCheckpoint, setRulerCheckpoint] = useState([])
  const [rulerLenght, setRulerLength] = useState(0)

  function CheckpointMarker() {
    useMapEvents({
      click(e) {
        setCreationCheckpointWindow(true);
        setPositionOfNewCheckpoint([e.latlng.lat, e.latlng.lng]);
      }
    })
  
    return positionOfNewCheckpoint === null ? null : <MarkerPoint position={positionOfNewCheckpoint} imageIcon={typeCheckpoint} isPopup={false}/>
  }

  function TrackMarker() {
    useMapEvents({
      click(e) {
        if (startCheckpoint === null)
        {
          setPositionOfStartCheckpoint([e.latlng.lat, e.latlng.lng]);
          setCreationTrackWindow(true);
        }
        else if (startCheckpoint !== null && endCheckpoint === null)
        {
          setPositionOfEndCheckpoint([e.latlng.lat, e.latlng.lng]);
        }
        else if (startCheckpoint !== null && endCheckpoint !== null)
        {
            setPositionOfIntermediateCheckpoint(prev => [...prev, endCheckpoint])
            setPositionOfEndCheckpoint([e.latlng.lat, e.latlng.lng]);
        }
      }
    })
  
    return  <>
              {startCheckpoint === null ? null : <MarkerPoint position={startCheckpoint} imageIcon={4} isPopup={false}/>}
              {endCheckpoint === null ? null :  <MarkerPoint position={endCheckpoint} imageIcon={5} isPopup={false}/>}
              {intermediateCheckpoint.map(point => <MarkerPoint position={point} key={point[1]} imageIcon={6} isPopup={false}/>)}
            </>
  }

  useEffect(() => {
    if (!isWidgetsActive.CheckpointActive) {
        setCreationCheckpointWindow(false);
        setPositionOfNewCheckpoint(null);
    } else {
      setIsInfoWindowActive([false, 0])
      setTracks(tracks.map(t => {return {...t, active: false}}))
    }
  }, [isWidgetsActive.CheckpointActive]);

  useEffect(() => {
    if (!isWidgetsActive.TrackActive) {
        setCreationTrackWindow(false);
        setPositionOfStartCheckpoint(null);
        setPositionOfEndCheckpoint(null);
        setTrack([]);
    } else {
      setIsInfoWindowActive([false, 0])
      setTracks(tracks.map(t => {return {...t, active: false}}))
    }
  }, [isWidgetsActive.TrackActive]);


  useEffect(() => {
    if (startCheckpoint !== null && endCheckpoint !== null) {
      if (intermediateCheckpoint.length === 0)
      {
        if (modeBuilding === 0)
        {
            getRequest(startCheckpoint, endCheckpoint);
        }
        else
        {
            let lengthTrack = distance(startCheckpoint[0], startCheckpoint[1], endCheckpoint[0], endCheckpoint[1])
            setTrack(prev => [...prev, [startCheckpoint[1], startCheckpoint[0]], [endCheckpoint[1], endCheckpoint[0]]]);
            setLengthTrack(prev => prev += lengthTrack)
        }
      }
      else
      {
        if (modeBuilding === 0)
        {
            getRequest(intermediateCheckpoint[intermediateCheckpoint.length - 1], endCheckpoint);
        }
        else
        {
            let lengthTrack = distance(startCheckpoint[0], startCheckpoint[1], endCheckpoint[0], endCheckpoint[1])
            setTrack(prev => [...prev, [intermediateCheckpoint[intermediateCheckpoint.length - 1][1],intermediateCheckpoint[intermediateCheckpoint.length - 1][0]], [endCheckpoint[1], endCheckpoint[0]]]);
            setLengthTrack(prev => prev += lengthTrack)
        }
      }
    }
  }, [endCheckpoint]);

  function distance(lat_1, lon_1, lat_2, lon_2) {

      let radius_earth = 6371;
      let lat_1_new = deg2rad(lat_1);
      let lon_1_new = deg2rad(lon_1);
      let lat_2_new = deg2rad(lat_2);
      let lon_2_new = deg2rad(lon_2);
      let d = 2 * radius_earth * Math.asin(Math.sqrt(Math.sin((lat_2_new - lat_1_new) / 2) ** 2 + Math.cos(lat_1_new) * Math.cos(lat_2_new) * Math.sin((lon_2_new - lon_1_new) / 2) ** 2));
    return d.toFixed(3)*1000;
  }

  function deg2rad(num) {
    return num * Math.PI / 180;
  }

  function changeHighlightingID(id) {
    setTracks(tracks.map(t => t.id == id ? {...t, active: !t.active} : {...t, active: false}))
    setIsInfoWindowActive([!tracks.find(t => t.id == id).active, id])
  }

  const colorSet = {
    "#2172D4": "#1F5393",
    "#dec400": "#cca700",
    "#47ba00": "#358a00",
    "#fca800": "#c28100"
  }

  function Ruler() {
    useMapEvents({
      click(e) {
        setRulerCheckpoint(prev => [...prev, [e.latlng.lat, e.latlng.lng]])
        if (rulerCheckpoint.length > 0) 
        {
          let length = distance(rulerCheckpoint[rulerCheckpoint.length - 1][0], rulerCheckpoint[rulerCheckpoint.length - 1][1], e.latlng.lat, e.latlng.lng)
          setRulerLength(prev => prev + length)
          console.log(rulerLenght);
        }
      }
    })
  }

  useEffect(( )=> {
    if (!isWidgetsActive.RulerActive)
    {
      setRulerCheckpoint([]);
      setRulerLength(0);
    }
  }, [isWidgetsActive.RulerActive])

  useEffect(() => {
    if (!isWidgetsActive.MagnifierActive)
    {
      setFindWindow(false);
    }
  })

  return (
      <>
        <MapContainer 
                    zoomControl={false} 
                    attributionControl={false} 
                    className='map'
                    center={[56.837405, 60.656652]} 
                    zoom={13} 
                    doubleClickZoom={false}>

            {layerActive ? (
                    <TileLayer 
                      key="google"
                      url={'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'}
                      subdomains={['mt1','mt2','mt3']}
                    />
                  ) : (
                    <TileLayer 
                      key="osm"
                      url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                      subdomains={['a', 'b', 'c']}
                    />
                  )}



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

          {isWidgetsActive.RulerActive ? <Ruler/> : null}
          
          <Polyline positions={rulerCheckpoint} 
                    pathOptions={{color: "#919191", weight: 5}}/>

          {rulerCheckpoint.map(point => <MarkerPoint key={point} position={point} imageIcon={7} isPopup={false} size={[16, 16]} anchor={[8, 8]}/>)}

          <Polyline positions={track.map(point => [point[1], point[0]])} 
                    pathOptions={{color: color_type[season], weight: 5}}/>

          {tracks.map(track => <Polyline positions={track.cordinates.map(point => [point.cords[1], point.cords[0]])} 
                                        key={track.id}
                                        pathOptions={{color: track.active ? colorSet[track.color]: track.color, weight: track.active ? 7 : 5}} 
                                        eventHandlers={{click: () => {if (!Object.values(isWidgetsActive).some(value => value == true)) changeHighlightingID(track.id)}}} 
                                        />)}
        </MapContainer>
      </>
  )

  async function getRequest(start, end) {
    let response = await fetch(`https://router.project-osrm.org/route/v1/foot-walking/${start[1]},${start[0]};${end[1]},${end[0]}?alternatives=false&geometries=geojson`)
    let data = await response.json()
    setLengthTrack(prev => prev += data.routes[0].distance)
    let routes = data.routes[0].geometry.coordinates;
    setTrack(prev => [...prev, ...routes]);
  }
}