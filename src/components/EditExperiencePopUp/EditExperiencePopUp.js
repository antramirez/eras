import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const EditExperiencePopUp = ({experience, state, dispatch, visible, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);

    // Destructure state from reducer
    const { organization, position, type, startDate, endDate, description, isEditing, isDeleting, editError, deleteError } = state;

    // Set form with values and display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => { 
        dispatch({type: 'field', fieldName: 'organization', payload: experience.organization});
        dispatch({type: 'field', fieldName: 'position', payload: experience.position});
        dispatch({type: 'field', fieldName: 'type', payload: experience.type});
        dispatch({type: 'field', fieldName: 'startDate', payload: experience.startDate});
        dispatch({type: 'field', fieldName: 'endDate', payload: experience.endDate});
        dispatch({type: 'field', fieldName: 'description', payload: experience.description});

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

    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Reset input fields
    const resetForm = () => {
        dispatch({type: 'field', fieldName: 'organization', payload: ''});
        dispatch({type: 'field', fieldName: 'position', payload: ''});
        dispatch({type: 'field', fieldName: 'type', payload: ''});
        dispatch({type: 'field', fieldName: 'startDate', payload: ''});
        dispatch({type: 'field', fieldName: 'endDate', payload: ''});
        dispatch({type: 'field', fieldName: 'description', payload: ''});
        dispatch({type: 'edit_error', payload: ''});

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    // Handler for submitting edited publication
    const handleEditClick = async (e) => {
        e.preventDefault();

        // Don't allow empty fields
        if (organization.trim() === '' || position.trim() === '' || type.trim() === '' || startDate.trim() === '' || endDate.trim() === '' || description.trim() === '') {
            dispatch({type: 'edit_error', payload: 'Please fill out all fields.'});
        } else if (description.trim().length > 500) { // TODO: check real max length
            dispatch({type: 'edit_error', payload: 'Description exceeds 500 characters'});
        } else {
            // Check if edit was successful after possible api call
            const success = await handleEdit(experience._id, organization, position, type, startDate, endDate, description);
            if (success) {
                resetForm();
                handleClose();
            }
        }
    }

    // Handler for submitting form to delete experience
    const handleDeleteClick = async (e) => {
        e.preventDefault();

        // Check if delete was successful after possible api call
        const success = await handleDelete(experience._id);
        if (success) {
            resetForm();
            handleClose();
        }
    }

    return (
        <article className="edit-experience-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Edit Experience</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="organization">Organization</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="organization" placeholder="National Institutes of Health" value={organization} onChange={(e) => dispatch({type: 'field', fieldName: 'organization', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-position">Position</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-position" placeholder="Research Assistant" value={position} onChange={(e) => dispatch({type: 'field', fieldName: 'position', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-experience-type">Type</label>
                        <select className="w-100 mt1 bn" name="edit-experience-type" value={type} onChange={(e) => dispatch({type: 'field', fieldName: 'type', payload: e.target.value})}>
                            <option value="" selected disabled hidden></option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-start-date">Start Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-start-date" placeholder="May 21, 2019" value={startDate} onChange={(e) => dispatch({type: 'field', fieldName: 'startDate', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-end-date">End Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-end-date" placeholder="January 15, 2020" value={endDate} onChange={(e) => dispatch({type: 'field', fieldName: 'endDate', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-description">Description</label>
                        <textarea className="experience-description pa2 input-reset bn w-100 measure" type="text" maxlength="500" name="edit-description" placeholder="Max 500 character limit" value={description} onChange={(e) => dispatch({type: 'field', fieldName: 'description', payload: e.target.value})}/>
                    </div>
                </fieldset>
                <div className="tc">
                    <button disabled={isEditing || isDeleting} className=" mt3 mb2 mr2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>{isEditing ? 'Editing...' : 'Edit'}</button>
                    <button disabled={isDeleting || isEditing} className=" mt3 mb2 ml2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleDeleteClick}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                </div>
                <p className="f5 red b tc">{deleteError ? deleteError : ''}{editError ? editError : ''}</p>
            </form>
        </article>
    )
}

export default EditExperiencePopUp;