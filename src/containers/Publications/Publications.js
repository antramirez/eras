import { useEffect, useState, useContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import Publication from './../../components/Publication/Publication';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import { publicationReducer } from '../../reducers/PublicationReducer';
import AddPublicationPopUp from './../../components/AddPublicationPopUp/AddPublicationPopUp';
import EditPublicationsPopup from './../../components/EditPublicationsPopUp/EditPublicationsPopUp';
import './Publications.css';
import AddButton from './../../components/AddButton/AddButton';
import editPNG from './../../assets/edit.png';
import publicationPaperPNG from './../../assets/publication_paper.png';
import presentationPNG from './../../assets/presentations.png';
import geometricPNG from './../../assets/geometric.png';
import paperclipPNG from './../../assets/paperclip.png';


const Publications = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(publicationReducer, {_id: 0, title: '', link: '', type: '', isAdding: false, isEditing: false, isDeleting: false, addSuccess: false, editSuccess: false, deleteSuccess: false, addError: '', editError: '', deleteError: ''})

    // Boolean for whether to display pop up
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [fakeIdCounter, setFakeIdCounter] = useState(7);

    const [publications, setPublications] = useState([]);

    // fetch publications from database and add them to memory
    useEffect(() => {
        if (isLoggedIn) {
            apiRequest('publications', 'GET', {}, setPublications, console.log);
        } else {
            const fakePublications = [
                {
                    _id: 1,
                    title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
                    link: '#',
                    type: 'Paper'
                },
                {
                    _id: 2,
                    title: 'Abstract',
                    link: '#',
                    type: 'Abstract'
                },
                {
                    _id: 3,
                    title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
                    link: '#',
                    type: 'Paper'
                },
                {
                    _id: 4,
                    title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin Other',
                    link: '#',
                    type: 'Other'
                },
                {
                    _id: 5,
                    title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
                    link: '#',
                    type: 'Paper'
                },
                {
                    _id: 6,
                    title: 'Presentation',
                    link: '#',
                    type: 'Presentation'
                },
            ];
            setPublications(fakePublications);
        }
    }, [isLoggedIn])

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
                setPublications([... publications, newPub]);
                dispatch({ type: 'add_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'add_error', payload: e.error });
                success = false;
            });
        } else {
            setPublications([... publications, {_id: fakeIdCounter, title, type, link}]);
            setFakeIdCounter(fakeIdCounter + 1);
            success = true;
        }

        return success;
    }

    // Handler for editing publication and updating publications
    const handleEditPublication = async (idx, title, type, link) => {
        let success = false; // temporary variable to get around reducer's async functionality
        
        if (isLoggedIn) {
            await idApiRequest('publications', publications[idx]._id, 'PATCH', {title, type, link}, (exp) => {
                publications[idx] = {...exp};
                setPublications([...publications]);

                dispatch({ type: 'edit_success' });
                success = true;
            }, (e) => {
                dispatch({ type:'edit_error', payload: e.error });
                success = false;
            });
        } else {
            publications[idx] = {... publications[idx], title, type, link};
            setPublications([...publications]);

            dispatch({ type: 'edit_success' });
            success = true;
        }

        return success;
    }

    // Handler for deleting publication and updating publications
    const handleDeletePublication = async (currIdx) => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        const toDelete = publications[currIdx];
        if (isLoggedIn) {
            await idApiRequest('publications',  toDelete._id, 'DELETE', {}, (pub) => {
                setPublications(publications.filter(p => p._id !== pub._id));
                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            setPublications(publications.filter(p => p._id !== toDelete._id));
            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
    }

    return (
        <section id="publications" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Publications <span style={{display: publications.length > 0 ? 'inline-block' : 'none'}}><button className="edit-pubs-btn bg-transparent bn b grow" onClick={() => setShowEditPopUp(true)}><img src={editPNG} alt="Edit icon"/></button></span></h1>
            <div className="publications-container mw8 center relative">
                <div className="flex flex-wrap mw8 center justify-center">
                    {publications.map(pub => <Publication key={pub._id} title={pub.title} image={imgType(pub.type)} link={'#'} type={pub.type} />)}
                </div>
                <AddButton onClick={() => setShowAddPopUp(true)}/>
            </div>
            <AddPublicationPopUp visible={showAddPopUp} state={state} dispatch={dispatch} handleClose={() => setShowAddPopUp(false)} handleAdd={handleAddPublication}/>
            <EditPublicationsPopup publications={publications} visible={showEditPopUp} state={state} dispatch={dispatch} handleClose={() => setShowEditPopUp(false)} handleEdit={handleEditPublication} handleDelete={handleDeletePublication} />
        </section>
    )
}

export default Publications;