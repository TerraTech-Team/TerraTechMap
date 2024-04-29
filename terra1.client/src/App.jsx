import './App.css'
import Map from './Map/Map'
import CheckpointCreationWindow from './CreationWindows/CheckpointCreationWindow/CheckpointCreationWindow';
import Toolbar from './Toolbar/Toolbar'
import { useState, useEffect } from 'react';
import TrackCreationWindow from './CreationWindows/TrackCreationWindow/TrackCreationWindow';
import InfoTrackWindow from './InfoWindows/InfoTrackWindow/InfoTrackWindow';
import Layer from './Layer/Layer';
import FinderCretionWindow from './CreationWindows/FinderCreationWindow/FinderCreationWindow';

export default function App() {
    const widgetsActive = {
      "MagnifierActive": false,
      "TrackActive": false,
      "CheckpointActive": false,
      "RulerActive": false
    }

    const [checkpoints, setCheckpoints] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [isWidgetsActive, setIsWidgetsActive] = useState(widgetsActive);
    const [creationCheckpointWindow, setCreationCheckpointWindow] = useState(false);
    const [creationTrackWindow, setCreationTrackWindow] = useState(false);
    const [findWindow, setFindWindow] = useState(false);
    const [typeCheckpoint, setTypeCheckpoint] = useState(0);
    const [positionOfNewCheckpoint, setPositionOfNewCheckpoint] = useState(null);
    const [positionOfStartCheckpoint, setPositionOfStartCheckpoint] = useState(null);
    const [positionOfEndCheckpoint, setPositionOfEndCheckpoint] = useState(null);
    const [positionOfIntermediateCheckpoint, setPositionOfIntermediateCheckpoint] = useState([]);
    const [imagesForCheckpoints, setImagesForCheckpoints] = useState([]);
    const [track, setTrack] = useState([]);
    const [modeBuilding, setModeBuilding] = useState(0)
    const [lengthTrack, setLengthTrack] = useState(0);    
    const [transport, setTransport] = useState(0)
    const [isInfoWindowActive, setIsInfoWindowActive] = useState([false, 0]);
    const [season, setSeason] = useState(0);
    const [layerActive, setLayerActive] = useState(false);

    const color_type = {
        0: "#2172D4",
        1: "#ffe100",
        2: "#47ba00",
        3: "#fca800"
      }

    useEffect(() => {
        checkpointsData();
        tracksData();
    }, []);

    const handleModeBuildingChange = (e, n) => {
        e.preventDefault();
        setModeBuilding(n);
        setTransport(n);
    }

    return (
      <main>
            <Layer layerActive={layerActive} setLayerActive={setLayerActive} isWindowOpen={creationCheckpointWindow || creationTrackWindow}/>
            
            <Toolbar 
                onToggleWidget={(newState) => {setIsWidgetsActive(newState);}}
                isWidgetsActive={isWidgetsActive}
                setTypeCheckpoint={(newState) => {setTypeCheckpoint(newState)}}
                setFindWindow={setFindWindow}
            />

            <Map 
                checkpoints={checkpoints} 
                isWidgetsActive={isWidgetsActive}
                setCreationCheckpointWindow={(newState) => {setCreationCheckpointWindow(newState)}}
                setCreationTrackWindow={(newState) => {setCreationTrackWindow(newState)}}
                typeCheckpoint={typeCheckpoint}
                positionOfNewCheckpoint={positionOfNewCheckpoint}
                setPositionOfNewCheckpoint={(newState) => {setPositionOfNewCheckpoint(newState)}}
                startCheckpoint={positionOfStartCheckpoint}
                setPositionOfStartCheckpoint={(newState) => {setPositionOfStartCheckpoint(newState)}}
                endCheckpoint={positionOfEndCheckpoint}
                setPositionOfEndCheckpoint={(newState) => {setPositionOfEndCheckpoint(newState)}}
                intermediateCheckpoint={positionOfIntermediateCheckpoint}
                setPositionOfIntermediateCheckpoint={(newState) => {setPositionOfIntermediateCheckpoint(newState)}}
                imagesForCheckpoints={imagesForCheckpoints}
                track={track}
                setTrack={(newState) => {setTrack(newState)}}
                modeBuilding={modeBuilding}
                setLengthTrack={setLengthTrack}
                tracks={tracks}
                setTracks={setTracks}
                setIsInfoWindowActive={setIsInfoWindowActive}
                color_type={color_type}
                season={season}
                layerActive={layerActive}
                setFindWindow={setFindWindow}
            />

            { creationCheckpointWindow ? <CheckpointCreationWindow 
                                  typeCheckpoint={typeCheckpoint} 
                                  setTypeCheckpoint={(newState) => {setTypeCheckpoint(newState)}} 
                                  setCreationCheckpointWindow={(newState) => {setCreationCheckpointWindow(newState)}}
                                  setPositionOfNewCheckpoint={(newState) => {setPositionOfNewCheckpoint(newState)}}
                                  positionOfNewCheckpoint={positionOfNewCheckpoint}
                                  checkpointsData={() => checkpointsData()}
                              /> : null }

            { creationTrackWindow ? <TrackCreationWindow 
                                lengthTrack={lengthTrack}
                                modeBuilding={modeBuilding}
                                handleModeBuildingChange={handleModeBuildingChange}
                                transport={transport}
                                setTransport={setTransport}
                                setModeBuilding={setModeBuilding}
                                setCreationTrackWindow={setCreationTrackWindow}
                                setTrack={setTrack}
                                setPositionOfStartCheckpoint={(newState) => {setPositionOfStartCheckpoint(newState)}}
                                setPositionOfEndCheckpoint={(newState) => {setPositionOfEndCheckpoint(newState)}}
                                setPositionOfIntermediateCheckpoint={(newState) => {setPositionOfIntermediateCheckpoint(newState)}}
                                setLengthTrack={setLengthTrack}
                                track={track}
                                tracksData={tracksData}
                                color_type={color_type}
                                season={season}
                                setSeason={setSeason}
                                /> : null }

            {findWindow ? <FinderCretionWindow /> : null}

            { isInfoWindowActive[0] ? <InfoTrackWindow ID={isInfoWindowActive[1]} tracks={tracks} /> : null}
      </main>
  )
    /*Загрузка актуальных Чек-поинтов из БД*/
    async function checkpointsData() {
        const response = await fetch('https://localhost:7152/api/checkpoints')
        const data = await response.json();
        setCheckpoints(data);

        const response1 = await fetch('https://localhost:7152/api/Image')
        const data1 = await response1.json();
        setImagesForCheckpoints(data1);
    }

    async function tracksData() {
        const response = await fetch('https://localhost:7152/api/Ways')
        const data = await response.json();
        let ways = data.map(item => {
            return {
                ...item,
                active: false
            };
        });
        setTracks(ways);
    }
}