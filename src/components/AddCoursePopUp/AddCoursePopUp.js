import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const AddCoursePopUp = ({visible, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const selectOptionRef = useRef(null);
    const [titleInputValue, setTitleInputValue] = useState('');
    const [gradeInputValue, setGradeInputValue] = useState('');

    // display the popup everytime visible is true, which happens when add button is pressed
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
        setTitleInputValue('');
        setGradeInputValue('');

        selectOptionRef.current.selected = true;
        
        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset()
        }
    }

    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Handlers for input changes
    const handleInputChange = (e) => {
        setTitleInputValue(e.target.value);
    }
    const handleSelectChange = (e) => {
        setGradeInputValue(e.target.value);
    }

    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(titleInputValue, gradeInputValue);
        resetForm();
        handleClose();
    }

    return (
        <article className="add-course-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Course</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-title">Course Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="title"  id="title" onChange={handleInputChange} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="course-grade">Grade</label>
                        <select className="w-100 mt1 bn" name="course-grade" id="course-grade" value={gradeInputValue} onChange={handleSelectChange}>
                            <option ref={selectOptionRef} value="" selected disabled hidden></option>
                            <option value="1">Fail</option>
                            <option value="2">Pass</option>
                            <option value="3">High Pass</option>
                            <option value="4">Honors</option>
                        </select>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>Add</button>
            </form>
        </article>
    )
}

export default AddCoursePopUp;