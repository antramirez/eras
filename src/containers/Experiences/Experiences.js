import { useState, useEffect, useContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import Experience from './../../components/Experience/Experience';
import { experienceReducer } from '../../reducers/ExperienceReducer';
import { fakeExperiences } from '../../data/fakeData';
import AddExperiencePopUp from './../../components/AddExperiencePopUp/AddExperiencePopUp';
import EditExperiencePopUp from './../../components/EditExperiencePopUp/EditExperiencePopUp';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import AddButton from './../../components/AddButton/AddButton';
import './Experiences.css';
import volunteeringPNG from './../../assets/experience_volunteering.png';
import workPNG from './../../assets/experiences_work.png';

const Experiences = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(experienceReducer, { _id: 0, organization: '', type: '', position: '', startDate: '', endDate: '', description: '', isFetching: false, isAdding: false, isEditing: false, isDeleting: false, fetchSuccess: false, addSuccess: false, editSuccess: false, deleteSuccess: false, fetchError: '', addError: '', editError: '', deleteError: '' });
    const { isFetching, fetchError } = state;

    // Booleans for whether to display pop ups
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);

    const [fakeIdCounter, setFakeIdCounter] = useState(6);

    // Experience object to pass into edit form
    const [experienceToEdit, setExperienceToEdit] = useState(
        {
            _id: 0,
            organization: '',
            type: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    )
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch({ type: 'fetch' });
            apiRequest('experiences', 'GET', {}, (data) => {
                setExperiences(data);
                dispatch({ type: 'fetch_success' });
            }, () => {
                dispatch({ type: 'fetch_error', payload: "Could not load your experiences, please try again later." });
            });

            // Set error message if api can't be accessed
            if (!state.fetchSuccess) {
                dispatch({ type: 'fetch_error', payload: 'Could not load your experiences, please try again later.' });
            }
        } else {
            setExperiences(fakeExperiences);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    const handleEditClick = (id, org, pos, type, start, end, desc) => {
        setExperienceToEdit({
            _id: id,
            organization: org,
            position: pos,
            type,
            startDate: start,
            endDate: end,
            description: desc
        })
        setShowEditPopUp(true);
    }

    const handleAddExperience = async (org, pos, type, start, end, desc) => {
        dispatch({ type: 'add', payload: {organization: org, position: pos, type: type, startDate: start, endDate: end, description: desc} });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('experiences', 'POST',
            {   organization: org,
                position: pos,
                type:type,
                startDate: start,
                endDate: end,
                description: desc
            },
            (newExperience) => {
                setExperiences([...experiences, newExperience]);
                dispatch({ type: 'add_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'add_error', payload: e.error });
                success = false;
            });
        } else {
            setExperiences([...experiences, {_id: fakeIdCounter, organization: org, position: pos, type: type, startDate: start, endDate: end, description: desc}]);
            setFakeIdCounter(fakeIdCounter + 1);

            dispatch({ type: 'add_success' });
            success = true;
        }

        return success;
    }

    const handleEditExperience = async (expId, org, pos, type, start, end, desc) => {
        dispatch({ type: 'edit' });
        let success = false; // temporary variable to get around reducer's async functionality

        const expToUpdate = experiences.find(exp => exp._id === expId);

        if (isLoggedIn) {
            await idApiRequest('experiences', expId, 'PATCH',
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

                dispatch({ type: 'edit_success' });
                success = true;
            }, (e) => {
                dispatch({ type:'edit_error', payload: e.error });
                success = false;
            });
        } else {
            expToUpdate.organization = org;
            expToUpdate.position = pos;
            expToUpdate.type = type;
            expToUpdate.startDate = start;
            expToUpdate.endDate = end;
            expToUpdate.description = desc;
            setExperiences([...experiences]);
            
            dispatch({ type: 'edit_success' });
            success = true;
        }

        return success;
    }

    // Handler for deleting experience and updating experiences
    const handleDeleteExperience = async (id) => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await idApiRequest('experiences', id, 'DELETE', {}, () => {
                setExperiences(experiences.filter(exp => exp._id !== id));
                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            setExperiences(experiences.filter(exp => exp._id !== id));
            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
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
            {isFetching ? 'Loading experiences...' : 
            fetchError ? <p className="f4 red b tc">{fetchError}</p> : 
            <>
            <div className="experiences-container center">
                <div className="flex flex-wrap justify-center mw8 center">
                    {experiences.map(exp => <Experience key={exp._id} organization={exp.organization} type={exp.type} image={imgType(exp.type)} position={exp.position} startDate={exp.startDate} endDate={exp.endDate} description={exp.description} handleEdit={() => handleEditClick(exp._id, exp.organization, exp.position, exp.type, exp.startDate, exp.endDate, exp.description)}/>)}
                </div>
                <AddButton onClick={() => setShowAddPopUp(true)}/>
            </div>
            <AddExperiencePopUp visible={showAddPopUp} state={state} dispatch={dispatch} handleClose={() => setShowAddPopUp(false)} handleAdd={handleAddExperience}/>
            <EditExperiencePopUp experience={experienceToEdit} state={state} dispatch={dispatch} visible={showEditPopUp} handleClose={() => setShowEditPopUp(false)} handleEdit={handleEditExperience} handleDelete={handleDeleteExperience} />
            </>
            }
        </section>
    )
}

export default Experiences;