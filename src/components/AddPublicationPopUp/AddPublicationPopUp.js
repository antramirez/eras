import { useRef, useEffect } from 'react';
import cross from './../../assets/cross.svg';

const AddPublicationPopUp = ({ visible, state, dispatch, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);

    // Destructure state from reducer
    const { title, link, type, isAdding, addError } = state;

    // Display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
        resetState();
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
    
    // Function to reset fields and error of state
    const resetState = () => {
        dispatch({type: 'field', fieldName: 'title', payload: ''});
        dispatch({type: 'field', fieldName: 'type', payload: ''});
        dispatch({type: 'field', fieldName: 'link', payload: ''});
        dispatch({type: 'add_error', payload: ''});
    }
    
    // Reset input fields
    const resetForm = () => {
        resetState();

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

    // Handler for submitting form
    const handleAddClick = async (e) => {
        e.preventDefault();

        // Don't allow empty fields or invalid url
        if (title.trim() === '' || type.trim() === '' || link.trim() === '') {
            dispatch({type: 'add_error', payload: 'Please fill out all fields.'});
        } else if (!RegExp(/^(ftp|http|https):\/\/[^ "]+$/).test(link.trim())) {
            dispatch({type: 'add_error', payload: 'Please enter a valid URL.'});
        } else {
            // Check if add was successful after possible api call
            const success = await handleAdd(title, type, link);
            if (success) {
                resetForm();
                handleClose();
            }
        }
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
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="title" placeholder="Tinea Capitis Associated with Tinea Faceii and Corporis" value={title} onChange={(e) => dispatch({type: 'field', fieldName: 'title', payload: e.target.value})}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="publication-type">Type</label>
                        <select className="w-100 mt1 bn" name="publication-type" value={type} onChange={(e) => dispatch({type: 'field', fieldName: 'type', payload: e.target.value})}>
                            <option value="" selected disabled hidden></option>
                            <option value="Paper">Paper</option>
                            <option value="Abstract">Abstract</option>
                            <option value="Presentation">Presentation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="link">Link</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="link" placeholder="https://amsrj.org/index.php?journal=amsrj&page=article&op=view&path%5B%5D=507" value={link} onChange={(e) => dispatch({type: 'field', fieldName: 'link', payload: e.target.value})} />
                    </div>
                </fieldset>
                <button disabled={isAdding} className=" mt3 mb2   b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick} >{isAdding ? 'Adding...' : 'Add'}</button>
                <p className="f5 b red tc">{addError}</p>
            </form>
        </article>
    )
}

export default AddPublicationPopUp;