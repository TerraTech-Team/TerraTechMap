import './Widget.css';

export default function Widget({ onClick, isActive, image, isReady }) {
    return (
        <div className={isActive ? "widget active_widget" : "widget"} style={isReady ? null : {"backgroundColor": "rgb(250, 172, 172)", "cursor": "not-allowed"}} onClick={onClick}>
            <img src={image} alt="Question" />
        </div>
    )
}