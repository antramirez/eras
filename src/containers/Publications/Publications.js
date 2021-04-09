import { useRef, useEffect, useState } from 'react';
import Publication from './../../components/Publication/Publication';
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
    // Boolean for whether to display pop up
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);

    const [publications, setPublications] = useState([
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
            image: publicationPaperPNG,
            link: '#',
            type: 'Paper'
        },
        {
            title: 'Abstract',
            image: geometricPNG,
            link: '#',
            type: 'Abstract'
        },
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
            image: publicationPaperPNG,
            link: '#',
            type: 'Paper'
        },
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin Other',
            image: paperclipPNG,
            link: '#',
            type: 'Other'
        },
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
            image: publicationPaperPNG,
            link: '#',
            type: 'Paper'
        },
        {
            title: 'Presentation',
            image: presentationPNG,
            link: '#',
            type: 'Presentation'
        },
    ])

    // Handler for clicking add/edit and buttons
    const handleAddClick = (e) => {
        setShowAddPopUp(true);
    }
    const handleEditClick = (e) => {
        setShowEditPopUp(true)
    }
    const handleAddClose = () => {
        setShowAddPopUp(false);
    }
    const handleEditClose = () => {
        setShowEditPopUp(false);
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
    const handleAddPublication = (title, type, link) => {
        publications.push({title, image: imgType(type), type, link});
        setPublications(publications);
    }

    // Handler for editing publication and updating publications
    const handleEditPublication = (idx, title, type, link) => {
        publications[idx] = {title, image: imgType(type), type, link};
        setPublications(publications);
    }

    // Handler for deleting publication and updating publications
    const handleDeletePublication = (currIdx) => {
        publications.splice(currIdx, 1);
        setPublications(publications);
    }

    return (
        <section id="publications" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Publications <span><button className="edit-pubs-btn bg-transparent bn b grow" onClick={handleEditClick}><img src={editPNG} alt="Edit icon"/></button></span></h1>
            <div className="publications-container mw8 center relative">
                <div className="flex flex-wrap mw8 center justify-center">
                    {publications.map(course => <Publication title={course.title} image={course.image} link={'#'} colorClassName={`${course.type.toLowerCase()}-pub`} />)}
                </div>
                <AddButton onClick={handleAddClick}/>
            </div>
            <AddPublicationPopUp visible={showAddPopUp} handleClose={handleAddClose} handleAdd={handleAddPublication}/>
            <EditPublicationsPopup publications={publications} visible={showEditPopUp} handleClose={handleEditClose} handleEdit={handleEditPublication} handleDelete={handleDeletePublication} />
        </section>
    )
}

export default Publications;