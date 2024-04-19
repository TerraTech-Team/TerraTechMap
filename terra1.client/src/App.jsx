import './App.css'
import Map from './Map/Map'
import CheckpointCreationWindow from './CreationWindows/CheckpointCreationWindow/CheckpointCreationWindow';
import Toolbar from './Toolbar/Toolbar'
import { useState, useEffect } from 'react';
import TrackCreationWindow from './CreationWindows/TrackCreationWindow/TrackCreationWindow';

export default function App() {
    const widgetsActive = {
      "MagnifierActive": false,
      "TrackActive": false,
      "CheckpointActive": false,
      "RulerActive": false
    }

    const [checkpoints, setCheckpoints] = useState(null);
    const [isWidgetsActive, setIsWidgetsActive] = useState(widgetsActive);
    const [creationCheckpointWindow, setCreationCheckpointWindow] = useState(false);
    const [creationTrackWindow, setCreationTrackWindow] = useState(false);
    const [typeCheckpoint, setTypeCheckpoint] = useState(0);
    const [positionOfNewCheckpoint, setPositionOfNewCheckpoint] = useState(null);
    const [positionOfStartCheckpoint, setPositionOfStartCheckpoint] = useState(null);
    const [positionOfEndCheckpoint, setPositionOfEndCheckpoint] = useState(null);
    const [positionOfIntermediateCheckpoint, setPositionOfIntermediateCheckpoint] = useState([]);
    const [imagesForCheckpoints, setImagesForCheckpoints] = useState([]);
    const [track, setTrack] = useState([]);
    const [modeBuilding, setModeBuilding] = useState(0)

    useEffect(() => {
        checkpointsData();
    }, []);

    const handleModeBuildingChange = (e, n) => {
        e.preventDefault();
        setModeBuilding(n);
    }

    return (
      <main>
          <Toolbar 
              onToggleWidget={(newState) => {setIsWidgetsActive(newState);}}
              isWidgetsActive={isWidgetsActive}
              setTypeCheckpoint={(newState) => {setTypeCheckpoint(newState)}}
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
                                modeBuilding={modeBuilding}
                                handleModeBuildingChange={handleModeBuildingChange}/> : null }
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
}