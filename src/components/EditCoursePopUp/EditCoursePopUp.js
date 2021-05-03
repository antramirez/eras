import { useRef, useEffect } from 'react';
import cross from './../../assets/cross.svg';

const EditCoursePopUp = ({course, state, dispatch, visible, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);

    // Destructure state from reducer
    const { name, grade, isEditing, isDeleting, editError, deleteError } = state;

    // Display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => {
        dispatch({type: 'field', fieldName: 'name', payload: course.name});
        dispatch({type: 'field', fieldName: 'grade', payload: course.grade});

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
        dispatch({type: 'field', fieldName: 'name', payload: ''});
        dispatch({type: 'field', fieldName: 'grade', payload: ''});
        dispatch({type: 'edit_error', payload: ''});

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

    // Handler for submitting form to edit course
    const handleEditClick = async (e) => {
        e.preventDefault();
        
        // Don't allow empty fields
        if (name.trim() === '' || grade === '') {
            dispatch({type: 'edit_error', payload: 'Please fill out all fields.'});
        } else {
            // Check if edit was successful after possible api call
            const success = await handleEdit(course._id, name, grade);
            if (success) {
                resetForm();
                handleClose();
            }
        }
    }

    // Handler for submitting form to delete course
    const handleDeleteClick = async (e) => {
        e.preventDefault();

        // Check if delete was successful after possible api call
        const success = await handleDelete(course._id);
        if (success) {
            resetForm();
            handleClose();
        }
    }

    return (
        <article className="edit-course-popup-container" ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Edit Course</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-name">Course Name</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="course-name" placeholder="Internal Medicine" value={name} onChange={(e) => dispatch({type: 'field', fieldName: 'name', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-grade">Grade</label>
                        <select className="w-100 mt1 bn" name="course-grade" value={grade} onChange={(e) => dispatch({type: 'field', fieldName: 'grade', payload: e.target.value})}>
                            <option value="" selected disabled hidden></option>
                            <option value="1">Fail</option>
                            <option value="2">Pass</option>
                            <option value="3">High Pass</option>
                            <option value="4">Honors</option>
                        </select>
                    </div>
                </fieldset>
                <div className="buttons tc">
                    <button disabled={isEditing || isDeleting} className="mt3 mb2 mr2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>{isEditing ? 'Editing...' : 'Edit'}</button>
                    <button disabled={isDeleting || isEditing} className="mt3 mb2 ml2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleDeleteClick}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                </div>
                <p className="f5 red b tc">{deleteError ? deleteError : ''}{editError ? editError : ''}</p>
            </form>
        </article>
    )
}

export default EditCoursePopUp;