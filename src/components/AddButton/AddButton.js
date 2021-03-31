import './AddButton.css';
import add from './../../assets/add.svg';

const AddButton = ({onClick}) => {
    return (
        <button className="add-button mt3 center bg-transparent bn b grow pointer" onClick={onClick}>
            <img src={add} alt="Add button"/>
        </button>
    )
}

export default AddButton;