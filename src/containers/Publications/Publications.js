import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Publication from './../../components/Publication/Publication';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
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
    const handleAddPublication = (title, type, link) => {
        if (isLoggedIn) {
            apiRequest('publications', 'POST', {title, type, link}, (newPub) => {
                setPublications([... publications, newPub]);
            }, console.log);
        } else {
            setPublications([... publications, {_id: fakeIdCounter, title, type, link}]);
            setFakeIdCounter(fakeIdCounter + 1);
        }
    }

    // Handler for editing publication and updating publications
    const handleEditPublication = (idx, title, type, link) => {
        if (isLoggedIn) {
            idApiRequest('publications', publications[idx]._id, 'PATCH', {title, type, link}, (exp) => {
                publications[idx] = {...exp};
                setPublications([...publications]);
            }, console.log);
        } else {
            publications[idx] = {... publications[idx], title, type, link};
            setPublications([...publications]);
        }
    }

    // Handler for deleting publication and updating publications
    const handleDeletePublication = (currIdx) => {
        const toDelete = publications[currIdx];
        if (isLoggedIn) {
            idApiRequest('publications',  toDelete._id, 'DELETE', {}, (pub) => {
                setPublications(publications.filter(p => p._id !== pub._id));
            }, console.log);
        } else {
            setPublications(publications.filter(p => p._id !== toDelete._id));
        }
    }

    return (
        <section id="publications" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Publications <span><button className="edit-pubs-btn bg-transparent bn b grow" onClick={() => setShowEditPopUp(true)}><img src={editPNG} alt="Edit icon"/></button></span></h1>
            <div className="publications-container mw8 center relative">
                <div className="flex flex-wrap mw8 center justify-center">
                    {publications.map(pub => <Publication key={pub._id} title={pub.title} image={imgType(pub.type)} link={'#'} type={pub.type} />)}
                </div>
                <AddButton onClick={() => setShowAddPopUp(true)}/>
            </div>
            <AddPublicationPopUp visible={showAddPopUp} handleClose={() => setShowAddPopUp(false)} handleAdd={handleAddPublication}/>
            <EditPublicationsPopup publications={publications} visible={showEditPopUp} handleClose={() => setShowEditPopUp(false)} handleEdit={handleEditPublication} handleDelete={handleDeletePublication} />
        </section>
    )
}

export default Publications;