import { useState } from "react"
import "./MarkerPointCreationWindow.css"
import dangerImage from './img/danger.svg';
import haltImage from './img/halt.svg';
import noteImage from './img/note.svg';
import sightImage from './img/sight.svg';

export default function MarkerPointCreationWindow({typeCheckpoint, setTypeCheckpoint}) {

    const [files, setFiles] = useState([])
    const [dragActive, setDragActive] = useState(false)

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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        files.forEach((file) => {
          data.append("file", file, "test.png");
        });

        console.log(data.get("file"))

        fetch("https://localhost:7152/api/Image/UploadFile", { method: "POST", body: data })
          .then((response) => response.json())
          .then(() => setFiles([]))
          .catch(() => setFiles([]));
      };

    return (
        <div className="creationWindow">
            <h1>Создание нового Чек-поинта</h1>
            <form>
                <div className="name">
                    <label htmlFor="name">Введите название:</label>
                    <input type="text" id="name" className="textInput"></input>
                </div>

                <div className="description">
                    <label htmlFor='description'>Описание точки:</label>
                    <textarea id='description' className='descriptionInput'/>
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
                            <button className="button-reset" type="reset" onClick={handleReset}>Отменить</button>
                            <button className="button-submit" type="submit" onClick={handleSubmit}>Отправить</button>
                        </>
                    )}
                </form>
            </div>

            <div className="buttons">
                <button className="button" style={{"backgroundColor": "#a7ffa1"}}>Сохранить</button>
                <button className="button" style={{"backgroundColor": "#ffa1a1"}}>Отменить</button>
            </div>
        </div>
    );
}