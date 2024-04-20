import "../CreationWindow.css"
import "./TrackCreactionWindow.css"
import { useState } from "react";
import car  from './img/car.svg'
import bike  from './img/bike.svg'
import foot  from './img/foot.svg'

export default function TrackCreationWindow({ track, setLengthTrack, setPositionOfIntermediateCheckpoint, setPositionOfEndCheckpoint, setPositionOfStartCheckpoint, setTrack, setCreationTrackWindow, lengthTrack, modeBuilding, handleModeBuildingChange, transport, setTransport, setModeBuilding}) {

    const [season, setSeason] = useState(0)
    const [name, setName] = useState("")
    const [time, setTime] = useState('00:00');

    const handleSeasonChange = (e, n) => {
        e.preventDefault();
        setSeason(n);
    }

    const handleTransportChange = (e, n) => {
        e.preventDefault();
        setTransport(n);
        if (n === 0){
            setModeBuilding(0);
        } else {
            setModeBuilding(1);
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleDelete = () => {
        setCreationTrackWindow(false);
        setTrack([]);
        setPositionOfIntermediateCheckpoint([]);
        setPositionOfEndCheckpoint(null);
        setPositionOfStartCheckpoint(null);
        setTransport(0);
        setModeBuilding(0);
        setLengthTrack(0);
    };

    const handleSave = async () => {
        await sendTrack();
        // trackData();
        handleDelete();
    };

    async function sendTrack() {
        // const [lat, lng] = positionOfNewCheckpoint;
        let json = {"cordinates": track.map(cords => ({"cords": cords})),
                    "season": season,
                    "transport": transport,
                    "length": length,
                    "color": "#2172D4"
                    };
        console.log(json);
        if (name.length > 0) {
            json["name"] = name;
        }
        if (time !== "00:00") {
            json["time"] = time;
        }
    
        await fetch('https://localhost:7152/api/Ways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
           body: JSON.stringify(json)
        });
    };

    return (
        <div className="creationWindow">
            <h1>Создание нового трека</h1>
            <form>
                <div className='mode'>
                    <label htmlFor='mode'>Режим построения:</label>
                    <ul className="buildingMode" id="mode">
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#D9D9D9"}} 
                                    disabled={modeBuilding === 0 ? true : false}
                                    onClick={(e) => handleModeBuildingChange(e, 0)}
                                    >Автоматический</button></li>
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#D9D9D9"}} 
                                    disabled={modeBuilding === 1 ? true : false}
                                    onClick={(e) => handleModeBuildingChange(e, 1)}
                                    >Ручной</button></li>
                    </ul>
                </div>

                <div className="name">
                    <label htmlFor="name">Введите название:</label>
                    <input type="text" id="name" className="textInput" value={name} onChange={handleChangeName}></input>
                </div>

                <div className='season'>
                    <label htmlFor='season'>Время года:</label>
                    <ul className="seasonInput" id="season">
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#7EDAE0"}} 
                                    onClick={(e) => handleSeasonChange(e, 0)}
                                    disabled={season === 0 ? true : false}
                                    >Зима</button></li>
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#EBE34D"}} 
                                    onClick={(e) => handleSeasonChange(e, 1)}
                                    disabled={season === 1 ? true : false}
                                    >Весна</button></li>
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#B7E07E"}} 
                                    onClick={(e) => handleSeasonChange(e, 2)}
                                    disabled={season === 2 ? true : false}
                                    >Лето</button></li>
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#F0C467"}} 
                                    onClick={(e) => handleSeasonChange(e, 3)}
                                    disabled={season === 3 ? true : false}
                                    >Осень</button></li>
                    </ul>
                </div>

                <div className='transport'>
                    <label htmlFor='transport'>Транспорт:</label>
                    <ul className="transportInput" id="transport">
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#D9D9D9"}}  
                                    onClick={(e) => handleTransportChange(e, 0)}
                                    disabled={transport === 0 ? true : false}
                                    ><img src={car}/></button></li>
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#D9D9D9"}} 
                                    onClick={(e) => handleTransportChange(e, 1)}
                                    disabled={transport === 1 ? true : false}
                                    ><img src={bike}/></button></li>
                        <li><button 
                                    className="button" 
                                    style={{"backgroundColor": "#D9D9D9"}} 
                                    onClick={(e) => handleTransportChange(e, 2)}
                                    disabled={transport === 2 ? true : false}
                                    ><img src={foot}/></button></li>
                    </ul>
                </div>

                <div className="time">
                    <label htmlFor="time">Введите время в пути:</label>
                    <input 
                            type="time" 
                            id="time" 
                            className="timeInput" 
                            value={time}
                            onChange={handleTimeChange}
                    />
                </div>
            </form>

            <div className="length">
                <label htmlFor="length">Длина маршрута: {Math.floor(lengthTrack/1000)} км</label>
            </div>

            <div className="buttons">
                    <button className="button" style={{"backgroundColor": "#58ed5f"}} onClick={handleSave}>Сохранить</button>
                    <button className="button" style={{"backgroundColor": "#ed5858"}} onClick={handleDelete}>Отменить</button>
                </div>
        </div>
    );
}