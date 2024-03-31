import { useState,useEffect } from 'react';
import './WindowMarker.css';
import loadImage from './load.png';

export default function WindowMarker({onClickDelete, onClickSave, position, checkpointsData}) {
    const [lat, lng] = position;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')

    function sendJSON() {
        let json = {
            "id": lat,
            "x": lat,
            "y": lng,
            "name": name,
            "description": description,
            "type": type,
        };
        checkpointsData.push(json);
        onClickSave();
        saveCheckpoints();
    }


    return (
        <div className="test">
            <h3 className='title'>Добавление нового Чек-поинта</h3>

            <label className='label' htmlFor='name'>Название точки:</label>
            <input type='text' id="name" className="control" value={name} onChange={(event) => setName(event.target.value)} />


            <label className='label' htmlFor='description'>Описание точки:</label>
            <textarea id='description' className='control' value={description} onChange={(event) => setDescription(event.target.value)} />

            <label className='label' htmlFor='type'>Тип точки:</label>
            <select id='type' className="control" value={type} onChange={(event) => setType(event.target.value)} >
                <option value="halt">Привал</option>
                <option value="sight">Достопримечательность</option>
                <option value="danger">Опасность</option>
                <option value="note">Заметка</option>
            </select>

            <label className='label' htmlFor='photo'>Загрузить фотографии:</label>
            <img className="photosUpload" id='photo' src={loadImage} alt='Тест'/>

            <div className='buttons'>
                <button className='button' onClick={sendJSON} style={{backgroundColor: '#11ff00', marginRight: '15px'}}>Сохранить</button>
                <button className='button' onClick={onClickDelete} style={{backgroundColor: '#ff4400', marginLeft: '15px'}}>Удалить</button>
            </div>
        </div>
    )

    async function saveCheckpoints() {
        await fetch('https://localhost:7152/api/checkpoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({ "x": lat, "y": lng })
          });
    }
}