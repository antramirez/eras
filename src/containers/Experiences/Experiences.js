import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Experience from './../../components/Experience/Experience';
import AddExperiencePopUp from './../../components/AddExperiencePopUp/AddExperiencePopUp';
import EditExperiencePopUp from './../../components/EditExperiencePopUp/EditExperiencePopUp';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import AddButton from './../../components/AddButton/AddButton';
import './Experiences.css';
import volunteeringPNG from './../../assets/experience_volunteering.png';
import workPNG from './../../assets/experiences_work.png';

const Experiences = () => {
    const { isLoggedIn } = useContext(UserContext);

    // Booleans for whether to display pop ups
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    // Values to be passed to edit form
    const [orgToEdit, setOrgToEdit] = useState('');
    const [imgToSave, setImgToSave] = useState('');
    const [posToEdit, setPosToEdit] = useState('');
    const [typeToEdit, setTypeToEdit] = useState('');
    const [startToEdit, setStartToEdit] = useState('');
    const [endToEdit, setEndToEdit] = useState('');
    const [descToEdit, setDescToEdit] = useState('');

    const [fakeIdCounter, setFakeIdCounter] = useState(6);
    const [experienceIdToEdit, setExperienceIdToEdit] = useState(0); // reference to current course

    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            apiRequest('experiences', 'GET', {}, setExperiences, console.log);
        } else {
            const fakeExperiences = [
                {
                    _id: 1,
                    organization: 'Tutoring1',
                    type: 'Work',
                    position: 'Tutor',
                    startDate: 'May 2019',
                    endDate: 'August 2019',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
                },
                {
                    _id: 2,
                    organization: 'Volunteering',
                    type: 'Volunteering',
                    position: 'Tutor',
                    startDate: 'May 2019',
                    endDate: 'August 2019',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
                },
                {
                    _id: 3,
                    organization: 'Tutoring2',
                    type: 'Work',
                    position: 'Tutor',
                    startDate: 'May 2019',
                    endDate: 'August 2019',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
                },
                {
                    _id: 4,
                    organization: 'Tutoring3',
                    type: 'Work',
                    position: 'Tutor',
                    startDate: 'May 2019',
                    endDate: 'August 2019',
                    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
                }
            ];
            setExperiences(fakeExperiences);
        }
    }, [isLoggedIn])

    const handleEditClick = (id, org, pos, type, start, end, desc) => {
        setExperienceIdToEdit(id);
        setOrgToEdit(org);
        setImgToSave(imgType(type));
        setPosToEdit(pos);
        setTypeToEdit(type)
        setStartToEdit(start);
        setEndToEdit(end);
        setDescToEdit(desc);
        setShowEditPopUp(true);
    }

    const handleAddExperience = (org, pos, type, start, end, desc) => {
        // temporary image
        const possibleImgs = [volunteeringPNG, workPNG]
        const imageType =possibleImgs[Math.floor(Math.random() * 2)]

        if (isLoggedIn) {
            apiRequest('experiences', 'POST',
            {   organization: org,
                position: pos,
                type:type,
                startDate: start,
                endDate: end,
                description: desc
            },
            (newExperience) => {
                setExperiences([...experiences, newExperience])
            }, console.log);
        } else {
            setExperiences([... experiences, {_id: fakeIdCounter, organization: org, image: imageType, position: pos, type: type, startDate: start, endDate: end, description: desc}]);
            setFakeIdCounter(fakeIdCounter + 1);
        }
    }

    const handleEditExperience = (expId, org, pos, type, start, end, desc) => {
        // temporary image
        const possibleImgs = [volunteeringPNG, workPNG]
        const imageType =possibleImgs[Math.floor(Math.random() * 2)]

        const expToUpdate = experiences.find(exp => exp._id === expId);

        if (isLoggedIn) {
            idApiRequest('experiences', expId, 'PATCH',
            {
                organization: org,
                position: pos,
                type:type,
                startDate: start,
                endDate: end,
                description: desc
            },
            (exp) => {
                expToUpdate.organization = exp.organization;
                expToUpdate.position = exp.position;
                expToUpdate.type = exp.type;
                expToUpdate.startDate = exp.startDate;
                expToUpdate.endDate = exp.endDate;
                expToUpdate.description = exp.description;
                setExperiences([...experiences]);
            }, console.log);
        } else {
            expToUpdate.organization = org;
            expToUpdate.position = pos;
            expToUpdate.type = type;
            expToUpdate.startDate = start;
            expToUpdate.endDate = end;
            expToUpdate.description = desc;
            setExperiences([...experiences]);
        }        
    }

    // Handler for deleting experience and updating experiences
    const handleDeleteExperience = (id) => {
        if (isLoggedIn) {
            idApiRequest('experiences', id, 'DELETE', {}, () => {
                setExperiences(experiences.filter(exp => exp._id !== id));
            }, console.log);
        } else {
            setExperiences(experiences.filter(exp => exp._id !== id));
        }        
    }

    // Function to set image type 
    const imgType = type => {
        switch (type) {
            case 'Volunteering':
                return volunteeringPNG;
            case'Work':
                return workPNG;
            case 'Other':
                return workPNG; // TODO: find new image
            default: 
                return workPNG;
        }
    }

    return (
        <section id="experiences" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Experiences</h1>
            <div className="experiences-container center">
                <div className="flex flex-wrap justify-center mw8 center">
                    {experiences.map(exp => <Experience key={exp._id} organization={exp.organization} type={exp.type} image={imgType(exp.type)} position={exp.position} startDate={exp.startDate} endDate={exp.endDate} description={exp.description} handleEdit={() => handleEditClick(exp._id, exp.organization, exp.position, exp.type, exp.startDate, exp.endDate, exp.description)}/>)}
                </div>
                <AddButton onClick={() => setShowAddPopUp(true)}/>
            </div>
            <AddExperiencePopUp visible={showAddPopUp} handleClose={() => setShowAddPopUp(false)} handleAdd={handleAddExperience}/>
            <EditExperiencePopUp id={experienceIdToEdit} org={orgToEdit} imgType={imgToSave} position={posToEdit} type={typeToEdit} start={startToEdit} end={endToEdit} description={descToEdit} visible={showEditPopUp} handleClose={() => setShowEditPopUp(false)} handleEdit={handleEditExperience} handleDelete={handleDeleteExperience} />
        </section>
    )
}

export default Experiences;