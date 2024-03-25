import './Widget.css';
import questionImage from './question.png';

export default function Widget() {
    return (
        <div className="widget" >
            <img src={questionImage} alt="Question" />
        </div>
    )
}