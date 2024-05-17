import Widget from '../Widget/Widget'
import './Toolbar.css'
import checkpointWidgetImage from './img/checkpoint_widget.svg';
import magnifierWidgetImage from './img/magnifier_widget.svg';
import rulerWidgetImage from './img/ruler_widget.svg';
import trackWidgetImage from './img/track_widget.svg';


export default function Toolbar({ setFindWindow, onToggleWidget, isWidgetsActive, setTypeCheckpoint}) {

    const toggleWidget = (widgetName) => {
        onToggleWidget(prevState => ({
            ['CheckpointActive']: false,
            ['MagnifierActive']: false,
            ['TrackActive']: false,
            ['RulerActive']: false,
            [widgetName]: !prevState[widgetName]
        }));
    };

    return(
        <div className="toolbar">
            <Widget 
                image={trackWidgetImage}
                onClick={() => {toggleWidget('TrackActive')} }
                isActive={isWidgetsActive.TrackActive}
                isReady={true}/>

            <Widget 
                image={rulerWidgetImage}
                onClick={() => toggleWidget('RulerActive')} 
                isActive={isWidgetsActive.RulerActive}
                isReady={true}/>

            <Widget 
                image={magnifierWidgetImage}
                onClick={() => {toggleWidget('MagnifierActive'), setFindWindow(prev => !prev)}} 
                isActive={isWidgetsActive.MagnifierActive}
                isReady={true}/>
        </div>
    )
}