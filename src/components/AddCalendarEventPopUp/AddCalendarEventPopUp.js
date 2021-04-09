import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const AddCalendarEventPopUp = ({date, visible, handleDateSelect, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const [dateInputValue, setDateInputValue] = useState(date);
    const [eventInputValue, setEventInputValue] = useState('');

    // Display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
        setDateInputValue(date);

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
        setDateInputValue('');
        setEventInputValue('');

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

    // Handler for event input change
    const handleInputChange = (e) => {
        setEventInputValue(e.target.value);
        // handleDateSelect(inputValue)
    }

    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(eventInputValue, dateInputValue);
        resetForm();
        handleClose();
    }

    return (
        <article className="add-calendar-event-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Goal or Milestone</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="calendar-event-date">Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="calendar-event-date"  id="calendar-event-date" readOnly value={dateInputValue}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="calendar-event-title">Goal/Milestone</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="calendar-event-title"  id="calendar-event-title" onChange={handleInputChange}/>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>Add</button>
            </form>
        </article>
    )
}

export default AddCalendarEventPopUp;