import { useRef, useEffect, useState } from 'react';
import './Publications.css';
import AddButton from './../AddButton/AddButton';
import publicationPaperPNG from './../../assets/publication_paper.png';
import presentationPNG from './../../assets/presentations.png';
import geometricPNG from './../../assets/geometric.png';
import cross from './../../assets/cross.svg';

const Publication = ({title, image, link, colorClassName}) => {
    return (
        <article className={`publication tc grow br3 pa3 ma3 dib bw2 shadow-5 mb4 ${colorClassName}`}>
            <a className="w-100 h-100 db no-underline black" href={link}>
                <h3 className="f4 mv0 pa3 tl">{title}</h3>
                <img className="absolute" src={image} alt={`${colorClassName} icon`}/>
            </a>
        </article>
    )
}


const AddPublicationPopUp = ({ visible, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const [titleInputValue, setTitleInputValue] = useState('')
    const [typeSelectValue, setTypeSelectValue] = useState('')
    const [linkInputValue, setLinkInputValue] = useState('')

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
        setTitleInputValue('');
        setTypeSelectValue('');
        setLinkInputValue('');

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        resetForm();
        handleClose();
    }

    // Handlers for changing inputs
    const handleTitleInputChange = (e) => {
        setTitleInputValue(e.target.value);
    }
    const handleSelectChange = (e) => {
        setTypeSelectValue(e.target.value);
    }
    const handleLinkInputChange = (e) => {
        setLinkInputValue(e.target.value);
    }

    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(titleInputValue, typeSelectValue, linkInputValue);
        resetForm();
        handleClose();
    }

    return (
        <article className="add-publication-popup-container dn " ref={popUpContainerRef}>
            
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Publication</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="title">Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="title"  id="title" value={titleInputValue} onChange={handleTitleInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="publication-type">Type</label>
                        <select className="w-100 mt1 bn" name="publication-type" id="publication-type" value={typeSelectValue} onChange={handleSelectChange}>
                            <option value="" selected disabled hidden></option>
                            <option value="Paper">Paper</option>
                            <option value="Abstract">Abstract</option>
                            <option value="Presentation">Presentation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="link">Link</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="link"  id="link" value={linkInputValue} onChange={handleLinkInputChange} />
                    </div>
                </fieldset>
                <button className=" mt3 mb2   b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick} >Add</button>
            </form>
        </article>
    )
}


const Publications = () => {
    // Boolean for whether to display pop up
    const [showPopUp, setShowPopUp] = useState(false);

    const [publications, setPublications] = useState([
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
            image: publicationPaperPNG,
            link: '#',
            type: 'paper'
        },
        {
            title: 'Abstract',
            image: geometricPNG,
            link: '#',
            type: 'abstract'
        },
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
            image: publicationPaperPNG,
            link: '#',
            type: 'paper'
        },
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin Other',
            image: publicationPaperPNG,
            link: '#',
            type: 'other'
        },
        {
            title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
            image: publicationPaperPNG,
            link: '#',
            type: 'paper'
        },
        {
            title: 'Presentation',
            image: presentationPNG,
            link: '#',
            type: 'presentation'
        },
    ])

    // Handler for clicking add and buttons
    const handleClick = (e) => {
        setShowPopUp(true);
    }
    const handleClose = () => {
        setShowPopUp(false);
    }

    // Handler for adding publication and updating publications
    const handleAddPublication = (title, type, link) => {
        let imgType = null;
        switch (type) {
            case 'Paper':
                imgType = publicationPaperPNG;
                break;
            case'Abstract':
                imgType = geometricPNG;
                break;
            case 'Presentation':
                imgType = presentationPNG;
                break;
            case 'Other':
                imgType = publicationPaperPNG;
                break;
            default: 
                imgType = publicationPaperPNG;
        }

        publications.push({title, image: publicationPaperPNG, type, link});
        setPublications(publications);
    }

    return (
        <section id="publications" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Publications</h1>
            <div className="publications-container mw8 center">
                <div className="flex flex-wrap mw8 center justify-center">
                    {publications.map(course => <Publication title={course.title} image={course.image} link={'#'} colorClassName={`${course.type.toLowerCase()}-pub`} />)}
                </div>
                <AddButton onClick={handleClick}/>
            </div>
            <AddPublicationPopUp visible={showPopUp} handleClose={handleClose} handleAdd={handleAddPublication}/>
        </section>
    )
}

export default Publications;