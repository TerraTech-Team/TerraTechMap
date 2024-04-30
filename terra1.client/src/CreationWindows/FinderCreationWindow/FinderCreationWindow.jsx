import { useState } from 'react';
import './FinderCreationWindow.css'
import magnifier from './img/magnifier.svg'

export default function FinderCretionWindow({ setMid, mapRef }) {
    const [nameOfFind, setNameOfFind] = useState("");

    const handleChangeName = (e) => {
        setNameOfFind(e.target.value);
    };

    async function FindWindow(id) {
        const map = mapRef.current;
        if (!map) return;

        const response = await fetch(`https://localhost:7152/api/Ways/${id}/midpoint`);
        if (response.status == 200) 
        {
            const data = await response.json();
            setMid(data);
            map.flyTo([data[1], data[0]], map.getZoom())
        }
    }

    return (
        <div className="finderCretionWindow">
            <input className='findWindow' value={nameOfFind} onChange={handleChangeName} />
            <button className='findButton' onClick={() => FindWindow(nameOfFind)}>
                <img src={magnifier} alt="magnifier" />
            </button>
        </div>
    );
}