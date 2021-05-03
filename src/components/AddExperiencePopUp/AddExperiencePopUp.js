import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const AddExperiencePopUp = ({visible, state, dispatch, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const selectOptionRef = useRef(null);

    // Destructure state from reducer
    const { organization, position, type, startDate, endDate, description, isAdding, addError } = state;

    // Display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
        resetState();

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

    // Function to reset fields and error of state
    const resetState = () => {
        dispatch({type: 'field', fieldName: 'organization', payload: ''});
        dispatch({type: 'field', fieldName: 'position', payload: ''});
        dispatch({type: 'field', fieldName: 'type', payload: ''});
        dispatch({type: 'field', fieldName: 'startDate', payload: ''});
        dispatch({type: 'field', fieldName: 'endDate', payload: ''});
        dispatch({type: 'field', fieldName: 'description', payload: ''});
        dispatch({type: 'add_error', payload: ''});
    }

    // Reset input fields
    const resetForm = () => {
        resetState();

        selectOptionRef.current.selected = true;

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Handler for submitting form
    const handleAddClick = async (e) => {
        e.preventDefault();
        
        // Don't allow empty fields
        if (organization.trim() === '' || position.trim() === '' || type.trim() === '' || startDate.trim() === '' || endDate.trim() === '' || description.trim() === '') {
            dispatch({type: 'add_error', payload: 'Please fill out all fields.'});
        } else if (description.trim().length > 500) { // TODO: check max length
            dispatch({type: 'add_error', payload: 'Description exceeds 500 characters'});
        } else {
            // Check if add was successful after possible api call
            const success = await handleAdd(organization, position, type, startDate, endDate, description);
            if (success) {
                resetForm();
                handleClose();
            }
        }
    }

    return (
        <article className="add-experience-popup-container dn " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                        <img src={cross} alt=""/>
                    </button>
                    <h3 className="f3">Add Experience</h3>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="organization">Organization</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="organization" placeholder="National Institutes of Health" value={organization} onChange={(e) => dispatch({type: 'field', fieldName: 'organization', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="position">Position</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="position" placeholder="Research Assistant" value={position} onChange={(e) => dispatch({type: 'field', fieldName: 'position', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="experience-type">Type</label>
                        <select className="w-100 mt1 bn" name="experience-type" value={type} onChange={(e) => dispatch({type: 'field', fieldName: 'type', payload: e.target.value})}>
                            <option ref={selectOptionRef} value="" selected disabled hidden></option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="start-date">Start Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="start-date" placeholder="May 21, 2019" value={startDate} onChange={(e) => dispatch({type: 'field', fieldName: 'startDate', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="end-date">End Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="end-date" placeholder="January 15, 2020" value={endDate} onChange={(e) => dispatch({type: 'field', fieldName: 'endDate', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="description">Description</label>
                        <textarea className="experience-description pa2 input-reset bn w-100 measure" type="text" maxlength="500" name="description" placeholder="Max 500 character limit" value={description} onChange={(e) => dispatch({type: 'field', fieldName: 'description', payload: e.target.value})}/>
                    </div>
                </fieldset>
                <button disabled={isAdding} className=" mt3 mb2   b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick} >{isAdding ? 'Adding...' : 'Add'}</button>
                <p className="f5 b red tc">{addError}</p>
            </form>
        </article>
    )
}

export default AddExperiencePopUp;