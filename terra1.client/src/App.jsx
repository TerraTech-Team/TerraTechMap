import Map from './components/Map/Map.jsx';
import Widget from './components/Widget/Widget.jsx';
import { useEffect, useState } from 'react';
import './App.css'

import checkpointWidgetImage from '/checkpoint_widget.svg';
import handWidgetImage from '/hand_widget.svg';
import magnifierWidgetImage from '/magnifier_widget.svg';
import rulerWidgetImage from '/ruler_widget.svg';
import trackWidgetImage from '/track_widget.svg';

export default function App() {
    const [isWidgetActive, setIsWidgetActive] = useState(false);
    const [checkpoints, setCheckpoints] = useState([]);

    useEffect(() => {
        checkpointsData();
    }, []);

    return (
        <main>
            <div className="toolbar">
                <Widget image={magnifierWidgetImage} isReady={false} />                
                {/* <Widget image={handWidgetImage} isReady={false} /> */}
                <Widget image={trackWidgetImage} isReady={false} />
                <Widget onClick={() => setIsWidgetActive(!isWidgetActive)} isActive={isWidgetActive} image={checkpointWidgetImage} isReady={true} />
                <Widget image={rulerWidgetImage} isReady={false} />
            </div>
            <Map isWidgetActive={ isWidgetActive } checkpoints={ checkpoints } update={checkpointsData}/>
        </main>
    );

    async function checkpointsData() {
        const response = await fetch('https://localhost:7152/api/checkpoints')
        const data = await response.json();
        setCheckpoints(data);
    }
}