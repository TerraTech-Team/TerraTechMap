import "../CreationWindow.css"
import "./TrackCreactionWindow.css"
import { useState } from "react";

export default function TrackCreationWindow({ modeBuilding, handleModeBuildingChange}) {
    const [lengthTrack, setLengthTrack] = useState(0);
    const [season, setSeason] = useState(0)
    const [name, setName] = useState("")
    const [time, setTime] = useState('00:00');

    const handleSeasonChange = (e, n) => {
        e.preventDefault();
        setSeason(n);
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value);
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

                <div className="length">
                    <label htmlFor="length">Введите длину:</label>
                    <input type="range" id="length" min="0" max="250" className="lengthInput" value={lengthTrack} onChange={(e) => setLengthTrack(e.target.value)}></input>
                    <p>{lengthTrack} км</p>
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

            <div className="buttons">
                    <button className="button" style={{"backgroundColor": "#58ed5f"}} >Сохранить</button>
                    <button className="button" style={{"backgroundColor": "#ed5858"}} >Отменить</button>
                </div>
        </div>
    );
}