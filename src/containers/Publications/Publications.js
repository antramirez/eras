import { useEffect, useState, useContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import Publication from './../../components/Publication/Publication';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import { publicationReducer } from '../../reducers/PublicationReducer';
import { fakePublications } from '../../data/fakeData';
import AddPublicationPopUp from './../../components/AddPublicationPopUp/AddPublicationPopUp';
import EditPublicationsPopup from './../../components/EditPublicationsPopUp/EditPublicationsPopUp';
import './Publications.css';
import AddButton from './../../components/AddButton/AddButton';
import publicationPaperPNG from './../../assets/publication_paper.png';
import presentationPNG from './../../assets/presentations.png';
import geometricPNG from './../../assets/geometric.png';
import paperclipPNG from './../../assets/paperclip.png';


const Publications = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(publicationReducer, {_id: 0, title: '', link: '', type: '', isFetching: false, isAdding: false, isEditing: false, isDeleting: false, fetchSuccess: false, addSuccess: false, editSuccess: false, deleteSuccess: false, fetchError: '', addError: '', editError: '', deleteError: ''})
    const { isFetching, fetchError } = state;

    // Boolean for whether to display pop up
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [fakeIdCounter, setFakeIdCounter] = useState(7);

    const [publications, setPublications] = useState([]);
    const [publicationToEdit, setPublicationToEdit] = useState({_id: 0, title: '', link:'', type:''});

    // fetch publications from database and add them to memory
    useEffect(() => {
        if (isLoggedIn) {
            dispatch({ type: 'fetch' });
            apiRequest('publications', 'GET', {}, (data) => {
                setPublications(data);
                dispatch({ type: 'fetch_success' });
            }, () => {
                dispatch({ type: 'fetch_error', payload: "Could not load your publications, please try again later." });
            });

            // Set error message if api can't be accessed
            if (!state.fetchSuccess) {
                dispatch({ type: 'fetch_error', payload: 'Could not load your publications, please try again later.' });
            }
        } else {
            setPublications(fakePublications);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    // Prevent link from opening when clicking on edit button
    const handleEditClick = (e, id, title, link, type) => {
        e.preventDefault();
        e.stopPropagation();
        setPublicationToEdit({ _id: id, title, link, type });
        setShowEditPopUp(true);
    }

    // Function to set image type 
    const imgType = type => {
        switch (type) {
            case 'Paper':
                return publicationPaperPNG;
            case'Abstract':
                return geometricPNG;
            case 'Presentation':
                return presentationPNG;
            case 'Other':
                return paperclipPNG;
            default: 
                return publicationPaperPNG;
        }
    }

    // Handler for adding publication and updating publications
    const handleAddPublication = async (title, type, link) => {
        dispatch({ type: 'add', payload: {title, link, type} });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('publications', 'POST', {title, type, link}, (newPub) => {
                setPublications([...publications, newPub]);
                dispatch({ type: 'add_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'add_error', payload: e.error });
                success = false;
            });
        } else {
            setPublications([...publications, {_id: fakeIdCounter, title, type, link}]);
            setFakeIdCounter(fakeIdCounter + 1);
            success = true;
        }

        return success;
    }

    // Handler for editing publication and updating publications
    const handleEditPublication = async (pubId, title, type, link) => {
        let success = false; // temporary variable to get around reducer's async functionality
        
        const pubToUpdate = publications.find(pub => pub._id === pubId);

        if (isLoggedIn) {
            await idApiRequest('publications',pubToUpdate._id, 'PATCH', {title, type, link}, (pub) => {
                pubToUpdate.title = pub.title;
                pubToUpdate.type = pub.type;
                pubToUpdate.link = pub.link;
                setPublications([...publications]);

                dispatch({ type: 'edit_success' });
                success = true;
            }, (e) => {
                dispatch({ type:'edit_error', payload: e.error });
                success = false;
            });
        } else {
            pubToUpdate.title = title;
            pubToUpdate.type = type;
            pubToUpdate.link = link;
            setPublications([...publications]);

            dispatch({ type: 'edit_success' });
            success = true;
        }

        return success;
    }

    // Handler for deleting publication and updating publications
    const handleDeletePublication = async (id) => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        // const toDelete = publications[currIdx];
        if (isLoggedIn) {
            await idApiRequest('publications', id, 'DELETE', {}, (pub) => {
                setPublications(publications.filter(p => p._id !== pub._id));
                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            setPublications(publications.filter(p => p._id !== id));
            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
    }

    return (
        <section id="publications" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Publications</h1>
            {isFetching ? 'Loading publications...' : 
            fetchError ? <p className="f4 red b tc">{fetchError}</p> :
            <>
            <div className="publications-container mw8 center relative">
                <div className="flex flex-wrap mw8 center justify-center">
                    {publications.map(pub => <Publication key={pub._id} title={pub.title} image={imgType(pub.type)} link={pub.link} type={pub.type} handleEdit ={(e) => handleEditClick(e, pub._id, pub.title, pub.link, pub.type)} />)}
                </div>
                <AddButton onClick={() => setShowAddPopUp(true)}/>
            </div>
            <AddPublicationPopUp visible={showAddPopUp} state={state} dispatch={dispatch} handleClose={() => setShowAddPopUp(false)} handleAdd={handleAddPublication}/>
            <EditPublicationsPopup publication={publicationToEdit} visible={showEditPopUp} state={state} dispatch={dispatch} handleClose={() => setShowEditPopUp(false)} handleEdit={handleEditPublication} handleDelete={handleDeletePublication} />
            </>}
        </section>
    )
}

export default Publications;