import './Widget.css';
import questionImage from './checkpoint_widget.svg';

export default function Widget({ onClick, isActive }) {
    return (
        <div className={isActive ? "widget active_widget" : "widget"} onClick={onClick}>
            <img src={questionImage} alt="Question" />
        </div>
    )
}