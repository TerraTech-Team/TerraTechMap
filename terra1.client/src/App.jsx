import Map from './components/Map/Map.jsx';
import Widget from './components/Widget/Widget.jsx';
import React, { useState } from 'react';

export default function App() {

  const [isWidgetActive, setIsWidgetActive] = useState(false);

  return (
    <main>
        <Widget onClick={() => setIsWidgetActive(!isWidgetActive)} isActive={isWidgetActive} />
        <Map isWidgetActive={isWidgetActive}/>
    </main>
  ) 
}