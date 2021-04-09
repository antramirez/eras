import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const EditCoursePopUp = ({course, grade, visible, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);
    const [courseInputValue, setCourseInputValue] = useState(course);
    const [gradeInputValue, setGradeInputValue] = useState(grade);

    // Display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => {
        setCourseInputValue(course);
        setGradeInputValue(grade);

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
        setCourseInputValue('');
        setGradeInputValue('');

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

    // Handlers for changing inputs
    const handleInputChange = (e) => {
        setCourseInputValue(e.target.value);
    }
    const handleSelectChange = (e) => {
        setGradeInputValue(e.target.value);
    }

    // Handler for submitting form to edit course
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit({title: course, grade: grade}, courseInputValue, gradeInputValue);
        resetForm();
        handleClose();
    }

    // Handler for submitting form to delete course
    const handleDeleteClick = (e) => {
        e.preventDefault();
        handleDelete(course);
        resetForm();
        handleClose();
    }

    return (
        <article className="edit-course-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Edit Course</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-title-to-edit">Course Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="course-title-to-edit"  id="course-title-to-edit" value={courseInputValue} onChange={handleInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-grade
                        -to-edit">Grade</label>
                        <select className="w-100 mt1 bn" name="course-grade-to-edit" id="course-grade-to-edit" value={gradeInputValue} onChange={handleSelectChange}>
                            <option value="" selected disabled hidden></option>
                            <option value="1">Fail</option>
                            <option value="2">Pass</option>
                            <option value="3">High Pass</option>
                            <option value="4">Honors</option>
                        </select>
                    </div>
                </fieldset>
                <div className="buttons tc">
                    <button className=" mt3 mb2 mr2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>Edit</button>
                    <button className=" mt3 mb2 ml2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleDeleteClick}>Delete</button>
                </div>
            </form>
        </article>
    )
}

export default EditCoursePopUp;