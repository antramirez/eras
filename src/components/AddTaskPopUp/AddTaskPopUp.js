import { useRef, useEffect } from 'react';

const AddTaskPopUp = ({visible, state, dispatch, handleClose, handleAdd, cross }) => {
    const popUpContainerRef = useRef(null);

    // Destructure state from reducer
    const { description, isAdding, addError} = state;

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

    // Reset input field and error state
    const resetForm = () => {
        dispatch({type: 'field', fieldName: 'description', payload: ''});
        dispatch({type: 'add_error', payload: ''});

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
    const handleAddClick = async (e) => {
        e.preventDefault();

        // Don't allow empty string
        if (description.trim() === '') {
            dispatch({type: 'add_error', payload: 'Please add a valid task.'});
        } else {
            // Check if add was successful after possible api call
            const success = await handleAdd(description);
            if (success) {
                resetForm();
                handleClose();
            }
        }
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
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="task-title" placeholder="Finish application" value={description} onChange={(e) => dispatch({type: 'field', fieldName: 'description', payload: e.target.value})}/>
                    </div>
                </fieldset>
                <button disabled={isAdding} className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>{isAdding ? 'Adding...' : 'Add'}</button>
                <p className="f5 b red tc">{addError}</p>
            </form>
        </article>
    )
}

export default AddTaskPopUp;