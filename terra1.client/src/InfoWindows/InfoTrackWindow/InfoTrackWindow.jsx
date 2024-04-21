import '../InfoWindow.css'
import './InfoTrackWindow.css'
import lengthImg from './img/length.svg'
import timeImg from './img/time.svg'
import transportImg from './img/transport.svg'
import seasonImg from './img/season.svg'


export default function InfoTrackWindow({ ID, tracks }){
    const track = tracks.find(track => track.id == ID)
    const name = track.name
    const author = track.author
    const time = track.time
    const length = track.length
    const transport = track.transport
    const season = track.season

    const str_transport = {
        0: "Автомобиль",
        1: "Велосипед",
        2: "Пешком",
        3: "Комбинированный"
    }

    const str_season = {
        0: "Зима",
        1: "Весна",
        2: "Лето",
        3: "Осень"
    }

    return (
        <div className="infoWindow">
            <h1>{name == null ? `Без названия ${ID}` : name}</h1>
            <ul className='information'>
                <li>
                    <div>
                        <img src={lengthImg}></img>
                        <p>Длина пути:</p>
                    </div>
                    <p>{Math.floor(length/1000)} км</p>
                </li>
                <li>
                    <div>
                        <img src={timeImg}></img>
                        <p>Время пути:</p>
                    </div>
                    <p>{time !== null ? `${Math.floor(time/60)} ч  ${time - Math.floor(time/60) * 60} мин` : "Неизвестно"}</p>
                </li>
                <li>
                    <div>
                        <img src={transportImg}></img>
                        <p>Вид транспорта:</p>
                    </div>
                    <p>{str_transport[transport]}</p>
                </li>
                <li>
                    <div>
                        <img src={seasonImg}></img>
                        <p>Сезон:</p>
                    </div>
                    <p>{str_season[season]}</p>
                </li>
            </ul>
            <p className='createdBy'>{`Создано: ${author == null ? "Неизвестный" : author}`}</p>
        </div>
    )
}