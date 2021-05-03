import { useRef, useEffect } from 'react';
import cross from './../../assets/cross.svg';

const AddCoursePopUp = ({visible, state, dispatch, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const selectOptionRef = useRef(null);

    // Destructure state from reducer
    const {name, grade, isAdding, addError} = state;

    // display the popup everytime visible is true, which happens when add button is pressed
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
        dispatch({type: 'field', fieldName: 'name', payload: ''});
        dispatch({type: 'field', fieldName: 'grade', payload: ''});
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

    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Handler for submitting form
    const handleAddClick = async (e) => {
        e.preventDefault();
        
        // Don't allow empty fields
        if (name.trim() === '' || grade.trim() === '') {
            dispatch({type: 'add_error', payload: 'Please fill out all fields.'})
        } else {
            // Check if add was successful after possible api call
            const success = await handleAdd(name, grade);
            if (success) {
                dispatch({ type: 'add_success' });
                resetForm();
                handleClose();
            }
        }
    }

    return (
        <article className="add-course-popup-container" ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Course</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-name">Course Name</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="course-name" placeholder="Internal Medicine" value={name} onChange={(e) => dispatch({type: 'field', fieldName: 'name', payload: e.target.value})} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-grade">Grade</label>
                        <select className="w-100 mt1 bn" name="course-grade" id="course-grade" value={grade} onChange={(e) => dispatch({type: 'field', fieldName: 'grade', payload: e.target.value})}>
                            <option ref={selectOptionRef} value="" selected disabled hidden></option>
                            <option value="1">Fail</option>
                            <option value="2">Pass</option>
                            <option value="3">High Pass</option>
                            <option value="4">Honors</option>
                        </select>
                    </div>
                </fieldset>
                <button disabled={isAdding} className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>{isAdding ? 'Adding...' : 'Add'}</button>
                <p className="f5 b red tc">{addError}</p>
            </form>
        </article>
    )
}

export default AddCoursePopUp;