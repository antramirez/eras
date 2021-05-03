import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const EditScorePopUp = ({step, state, dispatch, visible, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);

    // Destructure state from reducer
    const { step1, step2, step1Field, step2Field, isEditing, isDeleting, editError, deleteError } = state;
    const scoreField = step === 1 ? step1Field : step2Field; // form field for score
    const score = step === 1 ? step1 : step2; // score in db 
    const scoreFieldName = step === 1 ? 'step1Field' : 'step2Field';

    // Display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => {
        dispatch({ type: 'field', fieldName: scoreFieldName, payload: score > 0 ? score : '' });
        
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
        dispatch({ type: 'field', fieldName: scoreFieldName, payload: '' });
        dispatch({ type: 'edit_error',  payload: '' });

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
    const handleEditClick = async (e) => {
        e.preventDefault();

        // Make sure score is valid
        if (scoreField.trim() === '' || isNaN(scoreField.trim()) || (!isNaN(scoreField.trim()) && parseInt(scoreField.trim()) < 1 || parseInt(scoreField.trim()) > 300)) {
            dispatch({type: 'edit_error', payload: 'Please enter a valid score 1-300.'});
        } else {
            // Check if edit was successful after possible api call
            const success = await handleEdit(parseInt(scoreField.trim()));
            if (success) {
                resetForm();
                handleClose();
            }
        }   
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        // Check if "delete" was successful after possible api call
        const success = handleDelete();
        if (success) {
            resetForm();
            handleClose();
        }   
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
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" placeholder="1-300" name={`step-${step}-score`}  id={`step-${step}-score`} value={scoreField} 
                        onChange={ (e) => dispatch({type: 'field', fieldName: scoreFieldName, payload: e.target.value}) } />
                    </div>
                </fieldset>
                <button disabled={isEditing || isDeleting} className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>{isEditing ? 'Editing...' : 'Edit'}</button>
                <button disabled={isDeleting || isEditing} className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6 ml2" type="submit" onClick={handleDeleteClick}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                <p className="f5 red b tc">{deleteError ? deleteError : ''}{editError ? editError : ''}</p>
            </form>
        </article>
    )
}

export default EditScorePopUp;