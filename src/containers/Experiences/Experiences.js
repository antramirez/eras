import { useState } from 'react';
import Experience from './../../components/Experience/Experience';
import AddExperiencePopUp from './../../components/AddExperiencePopUp/AddExperiencePopUp';
import EditExperiencePopUp from './../../components/EditExperiencePopUp/EditExperiencePopUp';
import AddButton from './../../components/AddButton/AddButton';
import './Experiences.css';
import volunteeringPNG from './../../assets/experience_volunteering.png';
import tutoringPNG from './../../assets/experiences_work.png';

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
            <div className="experiences-container center">
                <div className="flex flex-wrap justify-center mw8 center">
                    {experiences.map(exp => <Experience organization={exp.organization} image={exp.image} position={exp.position} startDate={exp.startDate} endDate={exp.endDate} description={exp.description} handleEdit={() => handleEditClick(exp.organization, exp.image, exp.position, exp.startDate, exp.endDate, exp.description)}/>)}
                </div>
                <AddButton onClick={handleAddClick}/>
            </div>
            <AddExperiencePopUp visible={showAddPopUp} handleClose={handleAddClose} handleAdd={handleAddExperience}/>
            <EditExperiencePopUp org={orgToEdit} imgType={imgToSave} position={posToEdit} start={startToEdit} end={endToEdit} description={descToEdit} visible={showEditPopUp} handleClose={handleEditClose} handleEdit={handleEditExperience} handleDelete={handleDeleteExperience} />
        </section>
    )
}

export default Experiences;