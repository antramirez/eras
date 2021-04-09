import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const EditScorePopUp = ({step, value, visible, handleClose, handleEdit}) => {
    const popUpContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState(value > -1 ? value : '');

    // Display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => {
        setInputValue((value > -1 ? value : ''))
        if (visible) {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.remove('dn');
                popUpContainerRef.current.classList.add('flex', 'content-center', 'justify-center', 'items-center');
            }
        } else {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.add('dn');
                popUpContainerRef.current.classList.remove('flex', 'content-center', 'justify-center', 'items-center');
            }
        }
        
    }, [visible])

    // Reset input fields
    const resetForm = () => {
        setInputValue('');

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }
    
    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Handler for score input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Handler for submitting form
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit(inputValue);
        resetForm();
        handleClose();
    }

    return (
        <article className="edit-score-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">{`Edit Step ${step}`}</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor={`step-${step}-score`}>Score</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name={`step-${step}-score`}  id={`step-${step}-score`} value={inputValue} onChange={handleInputChange} />
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>Edit</button>
            </form>
        </article>
    )
}

export default EditScorePopUp;