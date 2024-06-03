import { useState } from 'react';
import './Toolbar.css'
import Widget from './Widget/Widget'
import magnifierWidgetImage from './img/magnifier_widget.svg';
import rulerWidgetImage from './img/ruler_widget.svg';
import trackWidgetImage from './img/track_widget.svg';
import { useWidgetsStatusContext } from '../../CustomHooks/WidgetsStatusContext.jsx';
import { useMapRefContextContext } from '../../CustomHooks/MapRefContext.jsx';

export default function Toolbar() {

    const { widgetStatus, setWidgetStatus } = useWidgetsStatusContext();
    //const { mapRef } = useMapRefContextContext();

    function UpdateState(key) {
        setWidgetStatus(prevState => ({
            ["trackWidget"]: false,
            ["rulerWidget"]: false,
            ["magnifierWidget"]: false,
            ["checkpointWidget"]: false,
            [key]: !prevState[key]
        }));
    }
    return (
        <div className="toolbar">
            <Widget isActive={widgetStatus.trackWidget} image={trackWidgetImage} onClick={() => UpdateState("trackWidget")}></Widget>
            <Widget isActive={widgetStatus.rulerWidget} image={rulerWidgetImage} onClick={() => UpdateState("rulerWidget")}></Widget>
            <Widget isActive={widgetStatus.magnifierWidget} image={magnifierWidgetImage} onClick={() => UpdateState("magnifierWidget")}></Widget>
        </div>
    )
}