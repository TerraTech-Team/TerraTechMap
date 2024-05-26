import "./TrackCreactionWindow.css"
import { useState, useEffect } from "react";
import car  from './img/car.svg'
import bike  from './img/bike.svg'
import foot  from './img/foot.svg'
import plus  from './img/plus.svg'

export default function TrackCreationWindow({ tempCP, setTempCP, setIsWidgetsActive, setCreationCheckpointWindow, season, setSeason, color_type, tracksData, track, setLengthTrack, setPositionOfIntermediateCheckpoint, setPositionOfEndCheckpoint, setPositionOfStartCheckpoint, setTrack, setCreationTrackWindow, lengthTrack, modeBuilding, handleModeBuildingChange, transport, setTransport, setModeBuilding}) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [time, setTime] = useState('00:00');
    const [isCombined, setIsCombined] = useState(false);
    const [nameError, setNameError] = useState(true);
    const [addCP, setAddCP] = useState(false);

    const handleSeasonChange = (e, n) => {
        e.preventDefault();
        setSeason(n);
    }

    const handleTransportChange = (e, n) => {
        e.preventDefault();
        setTransport(n);
    }

    useEffect(() => {
        if (track.length !== 0 && isCombined != true) 
        {
            setIsCombined(true);
        }
    }, [transport])

    const handleChangeName = (e) => {
        let newName = e.target.value;
        setName(newName);
        if (newName.length > 0 && newName.length < 21)
        {
            setNameError(false);
        } else {
            setNameError(true);
        }
    }

    const handleChangeAuthor = (e) => {
        setAuthor(e.target.value);
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
        setTempCP([])
    };

    const handleSave = async () => {
        await sendTrack();
        tracksData();
        handleDelete();
    };

    async function sendTrack() {

        let time2 = time.split(":")
        let timeNumbers = time2.map(numStr => parseInt(numStr))

        let json = {"cordinates": track.map(cords => ({"cords": cords})),
                    "checkpoints": tempCP.map(cords => cords),
                    "season": season,
                    "transport": isCombined ? 3 : transport,
                    "length": lengthTrack,
                    "color": color_type[season]
                    };
        if (name.length > 0) {
            json["name"] = name;
        }
        if (author.length > 0) {
            json["author"] = author;
        }
        if (timeNumbers[0]*60 + timeNumbers[1] !== 0) {
            json["time"] = timeNumbers[0]*60 + timeNumbers[1];
        }

        console.log(json)
    
        await fetch('https://localhost:7263/api/Ways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
           body: JSON.stringify(json)
        });
    };

    function handleAddCP(e) {
        e.preventDefault();
        setCreationCheckpointWindow(true);
        setIsWidgetsActive(prev => ({
            ...prev,
            CheckpointActive: true
          }));
    }

    return (
        <div className="trackCreationWindow">
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

                <button 
                        className="CPcreation button" 
                        style={{"backgroundColor": "#D9D9D9"}} 
                        disabled={addCP}
                        onClick={(e) => handleAddCP(e)}
                        ><p style={{"display":"block"}}>Добавить чек-поинт</p> <img src={plus}/></button>

                <div className="name">
                    <label htmlFor="name">Введите название:</label>
                    <input type="text" id="name" className="textInput" value={name} onChange={handleChangeName} style={nameError ? {"border": "1.5px solid rgba(227, 27, 0, 0.3)"} : null}></input>
                </div>

                <div className='season'>
                    <label htmlFor='season'>Время года:</label>
                    <ul className="seasonInput" id="season">
                        <li><button 
                                    className="button" 
                                    onClick={(e) => handleSeasonChange(e, 0)}
                                    disabled={season === 0 ? true : false}
                                    >Зима</button></li>
                        <li><button 
                                    className="button" 
                                    onClick={(e) => handleSeasonChange(e, 1)}
                                    disabled={season === 1 ? true : false}
                                    >Весна</button></li>
                        <li><button 
                                    className="button" 
                                    onClick={(e) => handleSeasonChange(e, 2)}
                                    disabled={season === 2 ? true : false}
                                    >Лето</button></li>
                        <li><button 
                                    className="button" 
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

                <div className="author">
                    <label htmlFor="author">Введите авторство:</label>
                    <input type="text" id="author" className="authorInput" value={author} onChange={handleChangeAuthor}></input>
                </div>
            </form>

            <div className="length">
                <label htmlFor="length" className="lengthInput">Длина маршрута: {Math.floor(lengthTrack/1000)} км</label>
            </div>

            <div className="buttons">
                    <button className="button" onClick={handleSave} disabled={nameError || track.length === 0}>Сохранить</button>
                    <button className="button" onClick={handleDelete}>Отменить</button>
                </div>
        </div>
    );
}