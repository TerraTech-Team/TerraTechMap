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
        const map = mapRef.current;
        if (!map) return;

        const response = await fetch(`https://localhost:7152/api/Ways/${id}/midpoint`);
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
            let similarity = LevenshteinDistance(nameOfFind.toLowerCase(), element.toLowerCase());
            similarityOrder[element] = similarity;
        });

        const sortedEntries = Object.entries(similarityOrder).sort((a, b) => a[1] - b[1]);
        const sortedSimilarityOrder = Object.fromEntries(sortedEntries);

        setListName(Object.keys(sortedSimilarityOrder));
    }

    function LevenshteinDistance(firstWord, secondWord) {
        let n = firstWord.length + 1;
        let m = secondWord.length + 1;
        const matrixD = [];
        for (let i = 0; i < n; i++) 
        {
            const line = []
            for (let j = 0; j < m ; j++)
            {
                if (j === 0) {
                    line.push(i);
                } else if (i === 0) {
                    line.push(j);
                } else {
                    line.push(0);
                }
            }
            matrixD.push(line)
        }

        const deletionCost = 1;
        const insertionCost = 1;

        for (let i = 1; i < n; i++) 
        {
            for (let j = 1; j < m ; j++)
            {
                var substitutionCost = firstWord[i - 1] == secondWord[j - 1] ? 0 : 1;
                matrixD[i][j] = Math.min(matrixD[i - 1][j] + deletionCost,
                        Math.min(matrixD[i][j - 1] + insertionCost,
                        matrixD[i - 1][j - 1] + substitutionCost));
            }
        }

        return matrixD[n-1][m-1] 
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