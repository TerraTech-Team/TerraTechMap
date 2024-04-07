import { useState } from "react"
import "./MarkerPointCreationWindow.css"
import dangerImage from './img/danger.svg';
import haltImage from './img/halt.svg';
import noteImage from './img/note.svg';
import sightImage from './img/sight.svg';

export default function MarkerPointCreationWindow({ checkpointsData, typeCheckpoint, setTypeCheckpoint, setCreationWindow, setPosition, position }) {

    const [files, setFiles] = useState([])
    const [dragActive, setDragActive] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          setFiles([...e.target.files]);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        setDragActive(true);
    }

    const handleLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles([...e.dataTransfer.files]);
          }
    }

    const handleReset = () => {
        setFiles([]);
    };
    
    const handleSave = async () => {
        const id = await sendChecpoints(); /*отправляет данные о чекпоинте и возвращает его id*/
        await sendPhoto(id); /*отправляет фотку, переименовывая её в id.png*/
        checkpointsData(); /*запрашивает данные с бд, пересобирая чек-поинты*/
    };
    
    async function sendChecpoints() {
        const [lat, lng] = position;
        let json = {"x": lat, "y": lng, "type": typeCheckpoint};
        if (name.length > 0) {
            json["name"] = name;
        }
        if (description.length > 0) {
            json["description"] = description;
        }
    
        const response = await fetch('https://localhost:7152/api/checkpoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(json)
        });

        const responseData = await response.json();
        return responseData.id;
    };

    async function sendPhoto(id) {
        const data = new FormData();
        if (files.length > 0) 
        {
            files.forEach((file) => {
                data.append("file", file, `${id}.png`);
              });
      
              await fetch("https://localhost:7152/api/Image/UploadFile", { method: "POST", body: data })
                .then((response) => response.json())
                .then(() => setFiles([]))
                .catch(() => setFiles([]));
        }
    };

    const handleDelete = () => {
        setCreationWindow(false);
        setPosition(null);
        setTypeCheckpoint(0);
    };

    return (
        <div className="creationWindow">
            <h1>Создание нового Чек-поинта</h1>
            <form>
                <div className="name">
                    <label htmlFor="name">Введите название:</label>
                    <input type="text" id="name" className="textInput" value={name} onChange={(event) => setName(event.target.value)} ></input>
                </div>

                <div className="description">
                    <label htmlFor='description'>Описание точки:</label>
                    <textarea id='description' className='descriptionInput' value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>

                <div className="type">
                    <label htmlFor='type'>Тип точки:</label>
                    <ul id="type" className="typeSelection">
                        <li className={`typeSelectionItem ${typeCheckpoint === 0 ? "activeType" : ""}`} 
                            style={{"backgroundColor": "#90F79A"}} 
                            onClick={() => setTypeCheckpoint(0)}
                            >
                                <img src={haltImage} alt="haltType" />
                        </li>
                        <li className={`typeSelectionItem ${typeCheckpoint === 1 ? "activeType" : ""}`} 
                            style={{"backgroundColor": "#F37C7C"}} 
                            onClick={() => setTypeCheckpoint(1)}
                            >
                                <img src={dangerImage} alt="dangerType" />
                        </li>
                        <li className={`typeSelectionItem ${typeCheckpoint === 2 ? "activeType" : ""}`} 
                            style={{"backgroundColor": "#76EFEF"}} 
                            onClick={() => setTypeCheckpoint(2)}
                            >
                                <img src={noteImage} alt="noteType" />
                        </li>
                        <li className={`typeSelectionItem ${typeCheckpoint === 3 ? "activeType" : ""}`} 
                            style={{"backgroundColor": "#EDF772"}} 
                            onClick={() => setTypeCheckpoint(3)}
                            >
                                <img src={sightImage} alt="sightType" />
                        </li>
                    </ul>
                </div>
            </form>

            <div className="wrapper">
                <label htmlFor='photoInput'>Загрузить фотографии:</label>
                <form className={`form ${dragActive ? "drag" : ""}`} id="photoInput" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}>
                    <h2>Перетащи файлы сюда</h2>
                    <p>или</p>
                    <label className="label">
                        <span>Загрузите файлы</span>
                        <input type="file" className="input" multiple={false} onChange={handleChange}/>
                    </label>

                    {files.length > 0 && (
                        <>
                            <ul className="file-list">
                                {files.map(({ name }, id) => (
                                    <li key={id}>{name}</li>
                                ))}
                            </ul>
                            <button className="button-reset" type="reset" onClick={handleReset}>Удалить файлы</button>
                        </>
                    )}
                </form>
            </div>

            <div className="buttons">
                <button className="button" style={{"backgroundColor": "#58ed5f"}} onClick={handleSave}>Сохранить</button>
                <button className="button" style={{"backgroundColor": "#ed5858"}} onClick={handleDelete}>Отменить</button>
            </div>
        </div>
    );
}