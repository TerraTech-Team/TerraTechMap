import { useState } from "react"
import Widget from "../Widget/Widget"
import layerImage from "./img/layerImage.svg"
import osmImage from "./img/osm.svg"
import satelliteImage from "./img/satellite.svg"

import "./Layer.css"

export default function Layer({ isWindowOpen, layerActive, setLayerActive }) {
    const [layerWidgetActive, setLayerWidgetActive] = useState(false);

    function toggleLayer(bool) {
        setLayerActive(bool);
    }

    return (
        <div className="layer" style={isWindowOpen ?  {"right": "410px"} : {"right": "0"}}>
            <Widget           
                image={layerImage} 
                onClick={() => {setLayerWidgetActive(prev => !prev)}} 
                isActive={layerWidgetActive}
                isReady={true}/>
            {layerWidgetActive ? 
            <div className="layerSelection">
                <img src={osmImage} className="iconLayer" style={{"top": "75px"}}/>
                <img src={satelliteImage} className="iconLayer" style={{"top": "120px"}}/>

                <div className={layerActive ? "layerbutton hidden" : "layerbutton"} onClick={() => toggleLayer(false)}>
                </div>
                <div className={!layerActive ? "layerbutton hidden" : "layerbutton"} onClick={() => toggleLayer(true)}>
                </div>
            </div> : null }
        </div>
    )
}