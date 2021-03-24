import './AddButton.css';
import add from './../../assets/add.svg';

const AddButton = ({onClick}) => {
    return (
        <button className="add-button absolute bottom-0 right-0" onClick={onClick}>
            <img src={add} alt="Add button"/>
        </button>
    )
}

export default AddButton;