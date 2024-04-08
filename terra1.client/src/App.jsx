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

  const [checkpoints, setCheckpoints] = useState(null); /*Список для хранения всех чекпоинтов из бд*/
  const [isWidgetsActive, setIsWidgetsActive] = useState(isbuttonsActive); /*Переменная отвечающая за хранение состояния виджета установки Чек-поинта*/
  const [creationWindow, setCreationWindow] = useState(false); /*Переменная отвечающая за хранение состояния окна установке Чек-поинта*/
  const [typeCheckpoint, setTypeCheckpoint] = useState(0); /*Переменная отвечающая за хранения состояния типа чекпоинта при установке Чек-поинта*/
  const [position, setPosition] = useState(null); /*Переменная отвечающая за хранение координат при установке Чек-поинта*/
  const [imagesForCheckpoints, setImagesForCheckpoints] = useState([]);

  useEffect(() => {
      checkpointsData();
  }, []);

  return (
      <main>
          <Toolbar 
              onToggleWidget={(newState) => {setIsWidgetsActive(newState);}}
              isWidgetsActive={isWidgetsActive}
              setTypeCheckpoint={(newState) => {setTypeCheckpoint(newState)}}
          />

          <Map 
              checkpoints={checkpoints} 
              isWidgetActive={isWidgetsActive.CheckpointActive}
              setCreationWindow={(newState) => {setCreationWindow(newState)}}
              typeCheckpoint={typeCheckpoint}
              position={position}
              setPosition={(newState) => {setPosition(newState)}}
              imagesForCheckpoints={imagesForCheckpoints}
          />

          { creationWindow ? <MarkerPointCreationWindow 
                                  typeCheckpoint={typeCheckpoint} 
                                  setTypeCheckpoint={(newState) => {setTypeCheckpoint(newState)}} 
                                  setCreationWindow={(newState) => {setCreationWindow(newState)}}
                                  setPosition={(newState) => {setPosition(newState)}}
                                  position={position}
                                  checkpointsData={() => checkpointsData()}
                              /> : null }
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