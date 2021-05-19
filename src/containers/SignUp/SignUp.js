import { useContext, useReducer, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { signUpReducer } from '../../reducers/SignUpReducer';
import { UserActionsContext } from '../../context/UserContext';
import { apiRequest } from '../../utils/apiRequests';

const SignUp = () => {

    const { setIsLoggedIn, setUser } = useContext(UserActionsContext);
    const [state, dispatch] = useReducer(signUpReducer, 
        { 
            firstName: '',
            lastName: '',
            graduationYear: '',
            email: '',
            password: '',
            legalUS: '',
            needVisa: '',
            isLoading: false,
            success: false,
            userData: {},
            error: ''
        }
    );
    const { firstName, lastName, graduationYear, email, password, legalUS, needVisa, isLoading, success, userData, error } = state;

    // variables to redirect user back to homepage after signup
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        let isMounted = true;

        // check that component is still mounted and set user if signup is successful
        if (isMounted) {
            if (success) {
                setUser(userData);
                setIsLoggedIn(true);
            }
        }

        return () => {
            isMounted = false; // state will only be updated on mounted components
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    const handleClick = async (e) => {
        e.preventDefault();

        // make sure each field is valid before attempting to make api request
        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || graduationYear === '' || legalUS === '' || needVisa === '') {
            dispatch({ type: 'error', payload: 'Please fill out every field.' });
        }
        else if (!RegExp(/^[A-Za-z0-9.!#$%&*+=?^_‘{}|~-]+@[A-Za-z0-9]+([._-]{0,1}[A-Za-z0-9])+(\.{1}[A-Za-z]{2,})$/).test(email)) {
            dispatch({ type: 'error', payload: 'Please enter a valid email.' });
        }
        else {
            dispatch({ type: 'signup' });

            await apiRequest('signup', 'POST', 
            {
                firstName,
                lastName,
                graduationYear,
                email: email.toLowerCase(),
                password,
                legalUS: legalUS === 'Yes' ? true : false, 
                needVisa: needVisa === 'Yes' ? true : false
            }, (data) => {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                
                dispatch({ type: 'field', fieldName: 'userData', payload: data.user });
                dispatch({ type: 'success' });
    
                // go back to homepage
                history.replace(from);
            }, (e) => dispatch({ type: 'error', payload: e.error }));
        }
    }

    return (
        <article className="pa1 black-80 pl6">
            <h1 className="f1 tc mb2">Sign Up</h1>
            <form acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="firstName">First Name</label>
                        <input 
                            className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" 
                            type="text"
                            name="firstName"
                            value={firstName} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'firstName',
                                    payload: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="lastName">Last Name</label>
                        <input 
                            className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" 
                            type="text"
                            name="lastName"
                            value={lastName} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'lastName',
                                    payload: e.target.value
                                })
                            } 
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="email">Email</label>
                        <input 
                            className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" 
                            type="text"
                            name="email"
                            value={email} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'email',
                                    payload: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100" 
                            type="password" 
                            value={password} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'password',
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
                            value={graduationYear} 
                            onChange={(e) => 
                                dispatch({
                                    type: 'field',
                                    fieldName: 'graduationYear',
                                    payload: e.target.value
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
                    <div className="mt4">
                        <div className="signup-work-status">
                            <div className="signup-work-status-q-1">
                                <p className="f5" >Are you legally allowed to work in the US?</p>
                                <div className="flex ml4">
                                    <div className="pa2">
                                        <input 
                                            type="radio" 
                                            name="legalUS" 
                                            value="Yes" 
                                            onChange={(e) => 
                                                dispatch({
                                                    type: 'field',
                                                    fieldName: 'legalUS',
                                                    payload: e.target.value === 'Yes' ? true : false
                                                })
                                            }
                                        />
                                        <label htmlFor="legalUS">Yes</label>
                                    </div>
                                    <div className="pa2">
                                        <input 
                                            type="radio" 
                                            name="legalUS" 
                                            value="No" 
                                            onChange={(e) => 
                                                dispatch({
                                                    type: 'field',
                                                    fieldName: 'legalUS',
                                                    payload: e.target.value === 'Yes' ? true : false
                                                })
                                            }
                                        />
                                        <label htmlFor="legalUS">No</label>
                                    </div>
                                </div>
                            </div>
                            <div className="signup-work-status-q-2">
                                <p className="f5" >Will you now or in the future need visa sponsorship?</p>
                                <div className="flex ml4">
                                    <div className="pa2">
                                        <input 
                                            type="radio" 
                                            name="needVisa" 
                                            value="Yes" 
                                            onChange={(e) => 
                                                dispatch({
                                                    type: 'field',
                                                    fieldName: 'needVisa',
                                                    payload: e.target.value
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
                                            onChange={(e) => 
                                                dispatch({
                                                    type: 'field',
                                                    fieldName: 'needVisa',
                                                    payload: e.target.value
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
                <div className="mt3 tc"><input disabled={isLoading} className="b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" value={isLoading ? "Signing Up..." : "Sign Up"} onClick={handleClick} /></div>
                <div><p className="f5 b red tc">{error}</p></div>
            </form>
        </article>
    )
}

export default SignUp;






