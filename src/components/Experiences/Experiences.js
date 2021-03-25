import { useRef, useEffect, useState } from 'react';
import './Experiences.css';
import AddButton from './../AddButton/AddButton';
import volunteeringPNG from './../../assets/experience_volunteering.png';
import tutoringPNG from './../../assets/experiences_work.png';
import editPNG from './../../assets/edit.png';
import cross from './../../assets/cross.svg';


const Experience = ({organization, image, position, startDate, endDate, description, handleEdit}) => {
    const handleClick = (organization, position, startDate, endDate, description) => {
        handleEdit(organization, position, startDate, endDate, description)
    }
    return (
        <article className="experience relative mw5 mw6-ns hidden mv4 pa3 ma2 dib">
            <h3 className="f4 mv0 pv2 bb">{organization} <span><img src={editPNG} alt="Edit button"  onClick={handleClick} /></span></h3>
            <img className="absolute" src={image} alt="Experience Type"/>
            <h4 className="mt2 mb1 i-ns">{`${position} (${startDate} - ${endDate})`}</h4>
            <div className="pa2">
                <p className="f6 f5-ns lh-copy measure mv0">{description}</p>
            </div>
        </article>
    )
}

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

    const handleCloseClick = (e) => {
        e.preventDefault();
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
        handleClose();
        // TODO: clear form
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

    // Handler for submitting edited publication
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit({organization: org, image: imgType, position: position, startDate: start, endDate: end, description: description}, orgInputValue, imgType, posInputValue, startInputValue, endInputValue, descInputValue);
        handleClose();
    }

    // Handler for submitting form to delete experience
    const handleDeleteClick = (e) => {
        e.preventDefault();
        handleDelete(org);
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

const Experiences = () => {
    // Booleans for whether to display pop ups
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    // Values to be passed to edit form
    const [orgToEdit, setOrgToEdit] = useState('');
    const [imgToSave, setImgToSave] = useState('');
    const [posToEdit, setPosToEdit] = useState('');
    const [startToEdit, setStartToEdit] = useState('');
    const [endToEdit, setEndToEdit] = useState('');
    const [descToEdit, setDescToEdit] = useState('');

    const [experiences, setExperiences] = useState([
        {
            organization: 'Tutoring1',
            image: tutoringPNG,
            position: 'Tutor',
            startDate: 'May 2019',
            endDate: 'August 2019',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
        },
        {
            organization: 'Volunteering',
            image: volunteeringPNG,
            position: 'Tutor',
            startDate: 'May 2019',
            endDate: 'August 2019',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
        },
        {
            organization: 'Tutoring2',
            image: tutoringPNG,
            position: 'Tutor',
            startDate: 'May 2019',
            endDate: 'August 2019',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
        },
        {
            organization: 'Tutoring3',
            image: tutoringPNG,
            position: 'Tutor',
            startDate: 'May 2019',
            endDate: 'August 2019',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
        }
    ])

    // Handlers for add/edit button and displaying pop ups
    const handleAddClick = (e) => {
        setShowAddPopUp(true);
    }
    const handleEditClick = (org, img, pos, start, end, desc) => {
        setOrgToEdit(org);
        setImgToSave(img);
        setPosToEdit(pos);
        setStartToEdit(start);
        setEndToEdit(end);
        setDescToEdit(desc);
        console.log(desc);
        setShowEditPopUp(true);
    }

    // Handlers for closing pop ups
    const handleAddClose = () => {
        setShowAddPopUp(false);
    }
    const handleEditClose = () => {
        setShowEditPopUp(false);
    }

    const handleAddExperience = (org, pos, start, end, desc) => {
        // temporary image
        const possibleImgs = [volunteeringPNG, tutoringPNG]
        const imageType =possibleImgs[Math.floor(Math.random() * 2)]

        // update experience array
        experiences.push({organization: org, image: imageType, position: pos, startDate: start, endDate: end, description: desc});
        setExperiences(experiences);
    }

    const handleEditExperience = (originalExp, org, imgType, pos, start, end, desc) => {
        // temporary image
        const possibleImgs = [volunteeringPNG, tutoringPNG]
        const imageType =possibleImgs[Math.floor(Math.random() * 2)]

        // update experience array with updated experience
        const expToUpdate = experiences.find(exp => exp.organization === originalExp.organization)
        expToUpdate.organization = org;
        expToUpdate.position = pos;
        expToUpdate.startDate = start;
        expToUpdate.endDate = end;
        expToUpdate.description = desc;
        setExperiences(experiences)
    }

    // Handler for deleting experience and updating experiences
    const handleDeleteExperience = (org) => {
        const expToDelete = experiences.find(exp => exp.organization === org)
        experiences.splice(experiences.indexOf(expToDelete), 1);
        setExperiences(experiences);
    }

    return (
        <section id="experiences" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Experiences</h1>
            <AddButton onClick={handleAddClick}/>
            <div className="experiences-container flex flex-wrap justify-between mw8 center">
                {experiences.map(exp => <Experience organization={exp.organization} image={exp.image} position={exp.position} startDate={exp.startDate} endDate={exp.endDate} description={exp.description} handleEdit={() => handleEditClick(exp.organization, exp.image, exp.position, exp.startDate, exp.endDate, exp.description)}/>)}
            </div>
            <AddExperiencePopUp visible={showAddPopUp} handleClose={handleAddClose} handleAdd={handleAddExperience}/>
            <EditExperiencePopUp org={orgToEdit} imgType={imgToSave} position={posToEdit} start={startToEdit} end={endToEdit} description={descToEdit} visible={showEditPopUp} handleClose={handleEditClose} handleEdit={handleEditExperience} handleDelete={handleDeleteExperience} />
        </section>
    )
}

export default Experiences;