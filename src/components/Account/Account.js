import { useRef, useEffect, useState } from 'react';
import './Account.css';
import editPNG from './../../assets/edit.png';

const Account = ({firstName="Selam", lastName="Moges", gradYear=2024, legal, needVisa}) => {
    // references for each input value
    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const gradYearInputRef = useRef(null);
    const legalInputRef = useRef(null);
    const needVisaInputRef = useRef(null);
    
    // booleans for whether input should be edited
    const [editFirstName, setEditFirstName] = useState(false)
    const [editLastName, setEditLastName] = useState(false)
    const [editGradYear, setEditGradYear] = useState(false)
    const [editLegal, setEditLegal] = useState(false)
    const [editNeedVisa, setEditNeedVisa] = useState(false)

    const [firstNameInputValue, setFirstNameInputValue] = useState(firstName);
    const [lastNameInputValue, setLastNameInputValue] = useState(lastName);
    const [gradYearInputValue, setGradYearInputValue] = useState(gradYear);

    // Handlers for changing readonly attribute on inputs
    const handleFirstNameEditField = () => {
        setEditFirstName(true)
        if (firstNameInputRef.current) {
            firstNameInputRef.current.focus();
        }
    }
    const handleLastNameEditField = () => {
        setEditLastName(true)
        if (lastNameInputRef.current) {
            lastNameInputRef.current.focus();
        }
    }
    const handleGradYearEditField = () => {
        setEditGradYear(true)
        if (gradYearInputRef.current) {
            gradYearInputRef.current.focus();
        }
    }

    // Handlers for input changes
    const handleFirstNameChange = (e) => {
        setFirstNameInputValue(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastNameInputValue(e.target.value);
    }
    const handleGradYearChange = (e) => {
        setGradYearInputValue(e.target.value);
    }

    // Handler for updating account
    const handleSaveClick = (e) => {
        e.preventDefault();
        // TODO: update 
    }

    return (
        <section id="account" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <article className="pa1 black-80 mb6 center mw6 account-container">
                <h1 className="f1 mb2">Account</h1>
                <form acceptCharset="utf-8">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Account</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f5" htmlFor="account-firstname">First Name</label>
                            <input className="pa2 input-reset bn w-100 measure" type="text" name="account-firstname"  id="account-firstname" value={firstNameInputValue} readOnly={!editFirstName} ref={firstNameInputRef} onChange={handleFirstNameChange} />
                            <span className="edit-btn-container ml2 relative"><img src={editPNG} alt="Edit button" onClick={handleFirstNameEditField}/></span>

                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f5" htmlFor="account-lastname">Last Name</label>
                            <input className="pa2 input-reset bn w-100 measure" type="text" name="account-lastname"  id="account-lastname" value={lastNameInputValue} readOnly={!editLastName} ref={lastNameInputRef} onChange={handleLastNameChange} />
                            <span className="edit-btn-container ml2 relative"><img src={editPNG} alt="Edit button" onClick={handleLastNameEditField}/></span>
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f5" htmlFor="account-grad-year">Graduation Year</label>
                            <input className="pa2 input-reset bn w-100 measure" type="text" name="account-grad-year"  id="account-grad-year" value={gradYearInputValue} readOnly={!editGradYear} ref={gradYearInputRef} onChange={handleGradYearChange} />
                            <span className="edit-btn-container ml2 relative"><img src={editPNG} alt="Edit button" onClick={handleGradYearEditField}/></span>
                        </div>
                        <div className="mt3">
                            <label className="db f5 fw4 lh-copy" htmlFor="account-workstatus">Work Authorization Status</label>
                            <div className="work-status pl4">
                                <div className="work-status-q-1">
                                    <p className="f6" >Are you legally allowed to work in the US?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input type="radio" id="legal" name="legal" value="Yes" checked />
                                            <label htmlFor="legal">Yes</label>
                                        </div>

                                        <div className="pa2">
                                            <input type="radio" id="not_legal" name="not_legal" value="No" />
                                            <label htmlFor="not_legal">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-status-q-2">
                                    <p className="f6" >Will you now or in the future need visa sponsorship?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input type="radio" id="need_visa" name="need_visa" value="Yes"  />
                                            <label htmlFor="legal">Yes</label>
                                        </div>

                                        <div className="pa2">
                                            <input type="radio" id="no_visa" name="no_visa" value="No" checked/>
                                            <label htmlFor="no_visa">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </fieldset>
                    <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleSaveClick}>Save</button>
                </form>
            </article>
        </section>
    )
}

export default Account;