import Map from './components/Map/Map.jsx';
import Widget from './components/Widget/Widget.jsx';
import { useEffect, useState } from 'react';

export default function App() {
<<<<<<< HEAD
  return (
    <main>
        <Widget />
        <Map />
    </main>
    ) 
=======
    const [isWidgetActive, setIsWidgetActive] = useState(false);
    const [checkpoints, setCheckpoints] = useState([]);

    useEffect(() => {
        checkpointsData();
    }, []);

    return (
        <main>
            <Widget onClick={() => setIsWidgetActive(!isWidgetActive)} isActive={isWidgetActive}/>
            <Map isWidgetActive={ isWidgetActive } checkpoints={ checkpoints } update={checkpointsData}/>
        </main>
    );

    async function checkpointsData() {
        const response = await fetch('https://localhost:7152/api/checkpoints')
        const data = await response.json();
        setCheckpoints(data);
    }
>>>>>>> origin/Virtical
}