import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';
import arrow from './../../assets/arrow.svg';

const EditPublicationsPopUp = ({publications, visible, state, dispatch, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);

    // Destructure state from reducer
    const { title, link, type, isEditing, isDeleting, editError, deleteError } = state;
    const [currIdx, setCurrIdx] = useState(0); // index of current publication in array

    // Set form with values and display the popup everytime visible is true, 
    // which happens when edit button is pressed, and set form fields
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

        // set input fields to current publication every time index changes
        if (publications.length > 0) {
            dispatch({type: 'field', fieldName: 'title', payload: publications[currIdx].title});
            dispatch({type: 'field', fieldName: 'type', payload: publications[currIdx].type});
            dispatch({type: 'field', fieldName: 'link', payload: publications[currIdx].link});

        }        
    }, [visible, currIdx])

    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Reset input fields
    const resetForm = () => {
        dispatch({type: 'field', fieldName: 'title', payload: ''});
        dispatch({type: 'field', fieldName: 'type', payload: ''});
        dispatch({type: 'field', fieldName: 'link', payload: ''});
        dispatch({type: 'edit_error', payload: ''});

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    // Handlers for clicking previous/next buttons
    const handlePrevClick = (e) => {
        e.preventDefault();
        setCurrIdx( currIdx > 0 ? currIdx-1 : publications.length - 1); // decrease index or make it loop to end of array
    }
    const handleNextClick = (e) => {
        e.preventDefault();
        setCurrIdx( currIdx < publications.length - 1 ? currIdx+1 : 0); // increase index or make it loop to front of array
    }

    // Handler for submitting edited publication
    const handleEditClick = async (e) => {
        e.preventDefault();
        
        // Don't allow empty fields or invalid url
        if (title.trim() === '' || type.trim() === '' || link.trim() === '') {
            dispatch({type: 'edit_error', payload: 'Please fill out all fields.'});
        } else if (!RegExp(/^(ftp|http|https):\/\/[^ "]+$/).test(link.trim())) {
            dispatch({type: 'edit_error', payload: 'Please enter a valid URL.'});
        } else {
            // Check if edit was successful after possible api call
            const success = await handleEdit(currIdx, title, type, link);
            if (success) {
                setCurrIdx(0);
                resetForm();
                handleClose();
            }
        }
    }

    // Handler for submitting form to delete experience
    const handleDeleteClick = async (e) => {
        e.preventDefault();

        // Check if delete was successful after possible api call
        const success = await handleDelete(currIdx);
        if (success) {
            setCurrIdx(0);
            resetForm();
            handleClose();
        }   
    }

    return (
        <article className="edit-publications-popup-container" ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Edit Publication</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="title">Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-pub-title" placeholder="Tinea Capitis Associated with Tinea Faceii and Corporis" value={title} onChange={(e) => dispatch({type: 'field', fieldName: 'title', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-pub-type">Type</label>
                        <select className="w-100 mt1 bn" name="edit-pub-type" value={type} onChange={(e) => dispatch({type: 'field', fieldName: 'type', payload: e.target.value})}>
                            <option value="Paper">Paper</option>
                            <option value="Abstract">Abstract</option>
                            <option value="Presentation">Presentation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-pub-link">Link</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-pub-link" placeholder="https://amsrj.org/index.php?journal=amsrj&page=article&op=view&path%5B%5D=507" value={link} onChange={(e) => dispatch({type: 'field', fieldName: 'link', payload: e.target.value})}/>
                    </div>
                </fieldset>
                <div className="tc">
                    <button disabled={isEditing || isDeleting} className=" mt3 mb2 mr2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>{isEditing ? 'Editing...' : 'Edit'}</button>
                    <button disabled={isDeleting || isEditing} className=" mt3 mb2 ml2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleDeleteClick}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                </div>
                <p className="f5 red b tc">{deleteError ? deleteError : ''}{editError ? editError : ''}</p>
                <div className="next-prev-btns">
                    <button className="absolute pointer edit-pub-back" onClick={handlePrevClick}><img src={arrow} alt="Previous publication"/></button>
                    <button className="absolute pointer edit-pub-next" onClick={handleNextClick}><img src={arrow} alt="Next publication"/></button>
                </div>
            </form>
        </article>
    )
}

export default EditPublicationsPopUp;