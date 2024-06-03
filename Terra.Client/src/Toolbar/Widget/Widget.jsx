import clases from'./Widget.module.css'

export default function Widget({image, isActive, onClick}) {
    return (
        <div className={isActive ? `${clases.widget} ${clases.active_widget}` : `${clases.widget}`} onClick={onClick}>          
            <img src={image} alt="Widgets" />
        </div>
    )
}