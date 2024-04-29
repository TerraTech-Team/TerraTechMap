import { useState } from 'react';
import './FinderCreationWindow.css'
import magnifier from './img/magnifier.svg'

export default function FinderCretionWindow()
{
    const [nameOfFind, setNameOfFind] = useState(null)

    const handleChangeName = (e) => {
        setNameOfFind(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className="finderCretionWindow">
            <input className='findWindow' value={nameOfFind} onChange={handleChangeName}>
            </input>

            <button className='findButton'>
                <img src={magnifier}/>
            </button>
        </div>
    );
}