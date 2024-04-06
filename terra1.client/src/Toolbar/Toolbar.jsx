import Widget from '../Widget/Widget'
import './Toolbar.css'
import checkpointWidgetImage from './img/checkpoint_widget.svg';
import magnifierWidgetImage from './img/magnifier_widget.svg';
import rulerWidgetImage from './img/ruler_widget.svg';
import trackWidgetImage from './img/track_widget.svg';


export default function Toolbar({ onToggleWidget, isWidgetsActive }) {

    const toggleWidget = (widgetName) => {
        onToggleWidget(prevState => ({
            ...prevState,
            [widgetName]: !prevState[widgetName]
        }));
    };

    return(
        <div className="toolbar">
            <Widget 
                image={checkpointWidgetImage} 
                onClick={() => toggleWidget('CheckpointActive')} 
                isActive={isWidgetsActive.CheckpointActive}
                isReady={true}/>

            <Widget 
                image={magnifierWidgetImage}
                onClick={() => toggleWidget('MagnifierActive')} 
                isActive={isWidgetsActive.MagnifierActive}
                isReady={false}/>

            <Widget 
                image={rulerWidgetImage}
                onClick={() => toggleWidget('RulerActive')} 
                isActive={isWidgetsActive.RulerActive}
                isReady={false}/>

            <Widget 
                image={trackWidgetImage}
                onClick={() => toggleWidget('TrackActive')} 
                isActive={isWidgetsActive.TrackActive}
                isReady={false}/>
        </div>
    )
}