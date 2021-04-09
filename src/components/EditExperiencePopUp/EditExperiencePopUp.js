import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const EditExperiencePopUp = ({org, imgType, position, start, end, description, visible, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);
    // Values of form
    const [orgInputValue, setOrgInputValue] = useState(org);
    const [posInputValue, setPosInputValue] = useState(position);
    const [startInputValue, setStartInputValue] = useState(start);
    const [endInputValue, setEndInputValue] = useState(end);
    const [descInputValue, setDescInputValue] = useState(description);

    // Set form with values and display the popup everytime visible is true, which happens when edit button is pressed
    useEffect(() => { 
        setOrgInputValue(org);
        setPosInputValue(position);
        setStartInputValue(start);
        setEndInputValue(end);
        setDescInputValue(description);

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
        handleClose();
    }

    // On change handlers for each input field
    const handleOrgInputChange = (e) => {
        setOrgInputValue(e.target.value);
    }

    const handlePosInputChange = (e) => {
        setPosInputValue(e.target.value);
    }
    const handleStartInputChange = (e) => {
        setStartInputValue(e.target.value);
    }
    const handleEndInputChange = (e) => {
        setEndInputValue(e.target.value);
    }
    const handleDescInputChange = (e) => {
        setDescInputValue(e.target.value);
    }

    // Reset input fields
    const resetForm = () => {
        setOrgInputValue('');
        setPosInputValue('');
        setStartInputValue('');
        setEndInputValue('');
        setDescInputValue('');

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    // Handler for submitting edited publication
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit({organization: org, image: imgType, position: position, startDate: start, endDate: end, description: description}, orgInputValue, imgType, posInputValue, startInputValue, endInputValue, descInputValue);
        resetForm();
        handleClose();
    }

    // Handler for submitting form to delete experience
    const handleDeleteClick = (e) => {
        e.preventDefault();
        handleDelete(org);
        resetForm();
        handleClose();
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
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="organization" id="organization" value={orgInputValue} onChange={handleOrgInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-position">Position</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-position" id="edit-position" value={posInputValue} onChange={handlePosInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-start-date">Start Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-start-date" id="edit-start-date" value={startInputValue} onChange={handleStartInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-end-date">End Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-end-date" id="edit-end-date" value={endInputValue} onChange={handleEndInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-description">Description</label>
                        <textarea className="experience-description pa2 input-reset bn w-100 measure" type="text" name="edit-description" id="edit-description" value={descInputValue} onChange={handleDescInputChange}/>
                    </div>
                </fieldset>
                <div className="tc">
                    <button className=" mt3 mb2 mr2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>Edit</button>
                    <button className=" mt3 mb2 ml2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleDeleteClick}>Delete</button>
                </div>
            </form>
        </article>
    )
}

export default EditExperiencePopUp;