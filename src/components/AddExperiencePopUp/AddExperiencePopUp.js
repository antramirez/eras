import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';

const AddExperiencePopUp = ({visible, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const [experienceOrg, setExperienceOrg] = useState('');
    const [experiencePos, setExperiencePos] = useState('');
    const [experienceStart, setExperienceStart] = useState('');
    const [experienceEnd, setExperienceEnd] = useState('');
    const [experienceDesc, setExperienceDesc] = useState('');

    // Display the popup everytime visible is true, which happens when add button is pressed
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
        setExperienceOrg('');
        setExperiencePos('');
        setExperienceStart('');
        setExperienceEnd('');
        setExperienceDesc('');

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Handlers for each input field change
    const handleOrgInputChange = (e) => {
        setExperienceOrg(e.target.value);
    }
    const handlePosInputChange = (e) => {
        setExperiencePos(e.target.value);
    }
    const handleStartInputChange = (e) => {
        setExperienceStart(e.target.value);
    }
    const handleEndInputChange = (e) => {
        setExperienceEnd(e.target.value);
    }
    const handleDescInputChange = (e) => {
        setExperienceDesc(e.target.value);
    }

    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(experienceOrg, experiencePos, experienceStart, experienceEnd, experienceDesc);
        resetForm();
        handleClose();
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
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="organization" id="organization" onChange={handleOrgInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="position">Position</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="position" id="position" onChange={handlePosInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="start-date">Start Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="start-date" id="start-date" onChange={handleStartInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="end-date">End Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="end-date" id="end-date" onChange={handleEndInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="description">Description</label>
                        <textarea className="experience-description pa2 input-reset bn w-100 measure" type="text" name="description" id="description" onChange={handleDescInputChange}/>
                    </div>
                </fieldset>
                <button className=" mt3 mb2   b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick} >Add</button>
            </form>
        </article>
    )
}

export default AddExperiencePopUp;