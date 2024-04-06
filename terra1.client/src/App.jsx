import './App.css'
import Map from './Map/Map'
import MarkerPointCreationWindow from './MarkerPointCreationWindow/MarkerPointCreationWindow';
import Toolbar from './Toolbar/Toolbar'
import { useState, useEffect } from 'react';

export default function App() {
  const isbuttonsActive = {
    "MagnifierActive": false,
    "TrackActive": false,
    "CheckpointActive": false,
    "RulerActive": false
  }

  const [checkpoints, setCheckpoints] = useState(null);
  const [isWidgetsActive, setIsWidgetsActive] = useState(isbuttonsActive);
  const [creationWindow, setCreationWindow] = useState(false)

  useEffect(() => {
    checkpointsData();
  }, []);

  return (
    <main>
      <Toolbar 
          onToggleWidget={(newState) => {setIsWidgetsActive(newState);}}
          isWidgetsActive={isWidgetsActive}
      />

      <Map 
          checkpoints={checkpoints} 
          isWidgetActive={isWidgetsActive.CheckpointActive}
          setCreationWindow={(newState) => {setCreationWindow(newState)}}
      />

      { creationWindow ? <MarkerPointCreationWindow /> : null }
    </main>
  )

  async function checkpointsData() {
    const response = await fetch('https://localhost:7152/api/checkpoints')
    const data = await response.json();
    setCheckpoints(data);
  }
}
