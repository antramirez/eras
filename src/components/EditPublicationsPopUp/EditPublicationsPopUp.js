import { useRef, useEffect, useState } from 'react';
import cross from './../../assets/cross.svg';
import arrow from './../../assets/arrow.svg';

const EditPublicationsPopUp = ({publications, visible, handleClose, handleEdit, handleDelete}) => {
    const popUpContainerRef = useRef(null);
    const [currIdx, setCurrIdx] = useState(0); // index of current publication in array

    // Values of form
    const [titleInputValue, setTitleInputValue] = useState('');
    const [typeInputValue, setTypeInputValue] = useState('');
    const [linkInputValue, setLinkInputValue] = useState('');

    // Set form with values and display the popup everytime visible is true, 
    // which happens when edit button is pressed, and set form fields
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

        // set input fields to current publication every time index changes
        setTitleInputValue(publications[currIdx].title);
        setTypeInputValue(publications[currIdx].type);
        setLinkInputValue(publications[currIdx].link);
        
    }, [visible, currIdx])

    const handleCloseClick = (e) => {
        e.preventDefault();
        handleClose();
    }

    // On change handlers for each input field
    const handleTitleInputChange = (e) => {
        setTitleInputValue(e.target.value);
    }

    const handleTypeInputChange = (e) => {
        setTypeInputValue(e.target.value);
    }
    const handleLinkInputChange = (e) => {
        setLinkInputValue(e.target.value);
    }

    // Reset input fields
    const resetForm = () => {
        setTitleInputValue('');
        setTypeInputValue('');
        setLinkInputValue('');

        if (popUpContainerRef.current) {
            popUpContainerRef.current.firstChild.reset();
        }
    }

    // Handlers for clicking previous/next buttons
    const handlePrevClick = (e) => {
        e.preventDefault();
        setCurrIdx( currIdx > 0 ? currIdx-1 : publications.length - 1); // decrease index or make it loop to end of array
    }
    const handleNextClick = (e) => {
        e.preventDefault();
        setCurrIdx( currIdx < publications.length - 1 ? currIdx+1 : 0); // increase index or make it loop to front of array
    }

    // Handler for submitting edited publication
    const handleEditClick = (e) => {
        e.preventDefault();
        handleEdit(currIdx, titleInputValue, typeInputValue, linkInputValue);
        setCurrIdx(0);
        resetForm();
        handleClose();
    }

    // Handler for submitting form to delete experience
    const handleDeleteClick = (e) => {
        e.preventDefault();
        handleDelete(currIdx);
        setCurrIdx(0);
        resetForm();
        handleClose();
    }

    return (
        <article className="edit-publications-popup-container" ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Edit Publication</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="title">Title</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-pub-title" id="edit-pub-title" value={titleInputValue} onChange={handleTitleInputChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-pub-type">Type</label>
                        <select className="w-100 mt1 bn" name="edit-pub-type" id="edit-pub-type" value={typeInputValue} onChange={handleTypeInputChange}>
                            <option value="Paper">Paper</option>
                            <option value="Abstract">Abstract</option>
                            <option value="Presentation">Presentation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="edit-pub-link">Link</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="edit-pub-link" id="edit-pub-link" value={linkInputValue} onChange={handleLinkInputChange}/>
                    </div>
                </fieldset>
                <div className="tc">
                    <button className=" mt3 mb2 mr2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleEditClick}>Edit</button>
                    <button className=" mt3 mb2 ml2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleDeleteClick}>Delete</button>
                </div>
                <div className="next-prev-btns">
                    <button className="absolute pointer edit-pub-back" onClick={handlePrevClick}><img src={arrow} alt="Previous publication"/></button>
                    <button className="absolute pointer edit-pub-next" onClick={handleNextClick}><img src={arrow} alt="Next publication"/></button>
                </div>
            </form>
        </article>
    )
}

export default EditPublicationsPopUp;