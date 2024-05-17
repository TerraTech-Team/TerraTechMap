import { useState } from 'react';
import './FinderCreationWindow.css'
import magnifier from './img/magnifier.svg'

export default function FinderCretionWindow({ tracks, setMid, mapRef }) {
    const [nameOfFind, setNameOfFind] = useState("");
    const [idOfFind, setIdOfFind] = useState(null);
    const [activeFind, setActiveFind] = useState(false);
    const [listName, setListName] = useState(tracks.map(track => track.name))

    const handleChangeName = (e) => {
        setNameOfFind(e.target.value);
    };

    async function FindWindow(id) {

        const x = 5;
        const obj = {x};
        console.log(obj);

        const map = mapRef.current;
        if (!map) return;

        const response = await fetch(`https://localhost:7263/api/Ways/${id}/midpoint`);
        if (response.status == 200) 
        {
            const data = await response.json();
            let point = data['midpoint']
            setMid(point);
            map.flyTo([point[1], point[0]], data['zoom'])
        }
    }

    function SemanticSearch() {
        let similarityOrder = {};

        listName.forEach(element => {
            let similarity = CosineSimilarity(nameOfFind.toLowerCase(), element.toLowerCase());
            similarityOrder[element] = similarity;
        });

        const sortedEntries = Object.entries(similarityOrder).sort((a, b) => b[1] - a[1]);

        setListName(sortedEntries.map(item => item[0]));
    }

    function CosineSimilarity(firstWord, secondWord)
    {
        let set1 = new Set(firstWord.split(''));
        let set2 = new Set(secondWord.split(''));
        let intersection = new Set([...set1].filter(char => set2.has(char))).size;

        var magnitudeA = Math.sqrt(firstWord.length);
        var magnitudeB = Math.sqrt(secondWord.length);

        if (magnitudeA === 0 || magnitudeB === 0)
        {
                return 0;
        }

        return intersection / (magnitudeA * magnitudeB);
    }


    return (
        <div className='find'>
            <div className="finderCretionWindow">
                <input  type="search" className='findWindow' onBlur={() => setTimeout(() => setActiveFind(false), 125)} onFocus={() => setActiveFind(true)} value={nameOfFind} onChange={(e) => {handleChangeName(e); SemanticSearch()}} />

                <button className='findButton' onClick={() => FindWindow(idOfFind)}>
                    <img src={magnifier} alt="magnifier" />
                </button>
            </div>

            {activeFind ? <div className='Dataset'>
                            <ul className='optionList'>
                                {listName.map(name => <li key={name} className='optionItem' onClick={() => {setNameOfFind(name); setIdOfFind(tracks.find(track => track.name === name).id)}}>{name}</li>)}
                            </ul>
                        </div> : null}
        </div>
    );
}