import { useRef, useEffect } from 'react';
import cross from './../../assets/cross.svg';

const AddCalendarEventPopUp = ({ visible, state, dispatch, handleClose, handleAdd }) => {
    const popUpContainerRef = useRef(null);
    
    // Destructure state from reducer
    const { title, date, dateStr, dateObj, isAdding, addError } = state;

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

    // Reset input fields
    const resetForm = () => {
        dispatch({ type: 'field', fieldName: 'dateStr', payload: '' });
        dispatch({ type: 'field', fieldName: 'title', payload: '' });
        dispatch({ type: 'add_error', payload: '' });

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

        // Make sure field isn't empty
        if (title.trim() === '') {
            dispatch({type: 'add_error', payload: 'Please enter a goal/milestone.'});
        } else {
            // Check if add was successful after possible api call
            const success = await handleAdd(title, date, dateObj, dateStr);
            if (success) {
                resetForm();
                handleClose();
            }
        }
    }

    return (
        <article className="add-calendar-event-popup-container dn" ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Goal or Milestone</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="calendar-event-date">Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="calendar-event-date" readOnly value={dateStr}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="calendar-event-title">Goal/Milestone</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="calendar-event-title" placeholder="Application deadline" value={title} onChange={(e) => dispatch({type: 'field', fieldName: 'title', payload: e.target.value})}/>
                    </div>
                </fieldset>
                <button disabled={isAdding} className={`mt3 mb2 b ph3 pv2 input-reset f6 ba b--black ${isAdding ? '' : 'grow pointer'}`} type="submit" onClick={handleAddClick}>{isAdding ? 'Adding...' : 'Add'}</button>
                <p className="f5 b red tc">{addError}</p>
            </form>
        </article>
    )
}

export default AddCalendarEventPopUp;