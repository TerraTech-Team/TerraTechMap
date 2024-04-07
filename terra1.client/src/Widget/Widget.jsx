import './Widget.css'

export default function Widget({image, isActive, isReady, onClick}) {

    return (
        <div className={isActive ? "widget active_widget" : "widget"} style={isReady ? null : {"backgroundColor": "rgb(250, 172, 172)", "cursor": "not-allowed"}} onClick={onClick}>
            <img src={image} alt="Widgets" />
        </div>
    )
}