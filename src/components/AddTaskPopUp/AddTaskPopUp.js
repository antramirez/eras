import { useRef, useEffect, useState } from 'react';

const AddTaskPopUp = ({visible, handleClose, handleAdd, cross }) => {
    const popUpContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    // Display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
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

    // Reset input field
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
    
    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(inputValue);
        resetForm();
        handleClose();
    }

    // Handler for input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <article className="add-task-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Task</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="task-title">Task</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="task-title"  id="task-title" onChange={handleInputChange}/>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>Add</button>
            </form>
        </article>
    )
}

export default AddTaskPopUp;