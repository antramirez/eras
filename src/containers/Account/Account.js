import { useContext, useReducer, useEffect } from 'react';
import { UserContext, UserActionsContext } from '../../context/UserContext';
import { accountReducer } from '../../reducers/AccountReducer';
import { apiRequest } from '../../utils/apiRequests';
import { useHistory, useLocation } from 'react-router-dom';
import './Account.css';

const Account = () => {
    const { user } = useContext(UserContext);
    const { setUser, setIsLoggedIn } = useContext(UserActionsContext);
    const { firstName, lastName, graduationYear, legalUS, needVisa } = user; 

    const [state, dispatch] = useReducer(accountReducer, 
        {
            accountFirstName: firstName,
            accountLastName: lastName,
            accountGraduationYear: graduationYear,
            accountLegalUS: legalUS,
            accountNeedVisa: needVisa,
            isLoading: false,
            success: false,
            error: ''
        }
    )
    const {accountFirstName, accountLastName, accountGraduationYear, accountLegalUS, accountNeedVisa, isLoading, success, error} = state;

    // variables to redirect user back to homepage after logout
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        document.title = 'ERAS - Account';
        window.scrollTo(0, 0);
    }, [])
    
    // Handler for updating account
    const handleSaveClick = (e) => {
        e.preventDefault();

        if (accountFirstName === '' || accountLastName === '') {
            dispatch({ type: 'error', payload: 'Please fill out all fields' });
        } else {
            dispatch({ type: 'save' });
            apiRequest('account', 'PATCH', 
            {
                firstName: accountFirstName,
                lastName: accountLastName,
                graduationYear: accountGraduationYear,
                legalUS: accountLegalUS,
                needVisa: accountNeedVisa,
            }, (data) => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                setUser(data);
                dispatch({ type: 'success' });
            }, (e) => dispatch({ type: 'error', payload: 'Couldn\'t update account, please try again.' }));
        }
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
        localStorage.clear();
        history.replace(from);
    }

    return (
        <section id="account" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <article className="pa1 black-80 mb6 center mw6 account-container">
                <h1 className="f1 mb2">Account</h1>
                <form acceptCharset="utf-8">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Account</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f5" htmlFor="firstName">First Name</label>
                            <input 
                                className="pa2 input-reset bn w-100 measure" 
                                type="text" 
                                name="firstName"  
                                value={accountFirstName} 
                                onChange={(e) => 
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'accountFirstName',
                                        payload: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f5" htmlFor="lastName">Last Name</label>
                            <input className="pa2 input-reset bn w-100 measure" 
                                type="text" 
                                name="lastName" 
                                value={accountLastName} 
                                onChange={(e) => 
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'accountLastName',
                                        payload: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f5" htmlFor="graduationYear">Graduation Year</label>
                            <select 
                                className="w-100 mt1 bn" 
                                name="graduationYear" 
                                value={accountGraduationYear} 
                                onChange={(e) => 
                                    dispatch({
                                        type: 'field',
                                        fieldName: 'accountGraduationYear',
                                        payload: parseInt(e.target.value)
                                    })
                                }
                            >
                                <option value="" selected disabled hidden></option>
                                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                <option value={new Date().getFullYear() + 2}>{new Date().getFullYear() + 2}</option>
                                <option value={new Date().getFullYear() + 3}>{new Date().getFullYear() + 3}</option>
                            </select>
                        </div>
                        <div className="mt3">
                            <label className="db f5 fw4 lh-copy" htmlFor="workStatus">Work Authorization Status</label>
                            <div className="work-status pl4">
                                <div className="work-status-q-1">
                                    <p className="f6" >Are you legally allowed to work in the US?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input 
                                                type="radio" 
                                                id="legal" 
                                                name="legalUS" 
                                                value="Yes" 
                                                checked={accountLegalUS ? true: false}
                                                onChange={(e) => 
                                                    dispatch({
                                                        type: 'field',
                                                        fieldName: 'accountLegalUS',
                                                        payload: e.target.value === 'Yes' ? true : false
                                                    })
                                                }
                                            />
                                            <label htmlFor="legalUS">Yes</label>
                                        </div>

                                        <div className="pa2">
                                            <input 
                                                type="radio" 
                                                id="not_legal" 
                                                name="legalUS" 
                                                value="No"
                                                checked={!accountLegalUS ? true: false}
                                                onChange={(e) => 
                                                    dispatch({
                                                        type: 'field',
                                                        fieldName: 'accountLegalUS',
                                                        payload: e.target.value === 'Yes' ? true : false
                                                    })
                                                }
                                            />
                                            <label htmlFor="legalUS">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-status-q-2">
                                    <p className="f6" >Will you now or in the future need visa sponsorship?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input 
                                                type="radio" 
                                                name="needVisa" 
                                                value="Yes"
                                                checked={accountNeedVisa}
                                                onChange={(e) => 
                                                    dispatch({
                                                        type: 'field',
                                                        fieldName: 'accountNeedVisa',
                                                        payload: e.target.value === 'Yes' ? true : false
                                                    })
                                                }
                                            />
                                            <label htmlFor="needVisa">Yes</label>
                                        </div>
                                        <div className="pa2">
                                            <input 
                                                type="radio"
                                                name="needVisa" 
                                                value="No" 
                                                checked={!accountNeedVisa}
                                                onChange={(e) => 
                                                    dispatch({
                                                        type: 'field',
                                                        fieldName: 'accountNeedVisa',
                                                        payload: e.target.value === 'Yes' ? true : false
                                                    })
                                                }
                                            />
                                            <label htmlFor="needVisa">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <button disabled={isLoading} className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleSaveClick}>{isLoading ? 'Saving...' : 'Save'}</button>
                </form>
                <p className="f5 b red">{error}</p>
                <p className="f5 b green">{success ? 'Account updated.' : ''}</p>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleLogout}>{isLoading ? 'Logging out...' : 'Logout'}</button>

            </article>
        </section>
    )
}

export default Account;