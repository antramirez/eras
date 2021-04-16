import { useState } from 'react';
import { apiRequest } from './../../utils/apiRequests';
import './LoginSignup.css';

const Login = ({signedIn, handleLogin}) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        // handleLogin();
        apiRequest('login', 'POST', {username: usernameInput, password: passwordInput}, (data) => {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('token', JSON.stringify(data.token));
        }, console.log);
    }

    return (
        <article className="pa1 black-80 pr6 br bw1 b--black">
            <h1 className="f1 tc mb2">Login</h1>
            <form acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Login</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="login-username">Username</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="login-username"  id="login-username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent" type="password" name="login-password"  id="login-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
                    </div>
                </fieldset>
                <div className="mt3 tc"><input className="b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" value="Login" onClick={handleClick}/></div>
            </form>
        </article>
    )
}

const SignUp = ({signedIn, handleLogin}) => {
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [gradYearInput, setGradYearInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [legalUsInput, setLegalUsInput] = useState('');
    const [needVisaInput, setNeedVisaInput] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        // handleLogin();
        apiRequest('signup', 'POST', 
        {
            firstName: firstNameInput,
            lastName: lastNameInput,
            graduationYear: Number.parseInt(gradYearInput),
            username: usernameInput, 
            email: emailInput, 
            password: passwordInput, 
            legalUS: legalUsInput === 'Yes' ? true : false, 
            needVisa: needVisaInput === 'Yes' ? true : false
        }, (data) => {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('token', JSON.stringify(data.token));
        }, console.log);
    }

    return (
        <article className="pa1 black-80 pl6">
            <h1 className="f1 tc mb2">Sign Up</h1>
            <form acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-firstname">First Name</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-firstname"  id="signup-firstname" value={firstNameInput} onChange={(e) => setFirstNameInput(e.target.value)} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-lastname">Last Name</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-lastname"  id="signup-lastname" value={lastNameInput} onChange={(e) => setLastNameInput(e.target.value)} />
                    </div>
                    
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-username">Username</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-username"  id="signup-username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-usernemailame">Email</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-email"  id="signup-email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100" type="password" name="signup-password"  id="signup-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-grad-year">Graduation Year</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-grad-year"  id="signup-grad-year" value={gradYearInput} onChange={(e) => setGradYearInput(e.target.value)} />
                    </div>
                    <div className="mt4">
                            <div className="signup-work-status">
                                <div className="signup-work-status-q-1">
                                    <p className="f5" >Are you legally allowed to work in the US?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input type="radio" id="signup-legal" name="signup-legal" value="Yes" onChange={(e) => setLegalUsInput(e.target.value)}/>
                                            <label htmlFor="signup-legal">Yes</label>
                                        </div>
                                        <div className="pa2">
                                            <input type="radio" id="signup-not_legal" name="signup-legal" value="No" onChange={(e) => setLegalUsInput(e.target.value)} />
                                            <label htmlFor="signup-legal">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="signup-work-status-q-2">
                                    <p className="f5" >Will you now or in the future need visa sponsorship?</p>
                                    <div className="flex ml4">
                                        <div className="pa2">
                                            <input type="radio" id="signup-need_visa" name="signup-need_visa" value="Yes" onChange={(e) => setNeedVisaInput(e.target.value)} />
                                            <label htmlFor="signup-yes_visa">Yes</label>
                                        </div>
                                        <div className="pa2">
                                            <input type="radio" id="signup-no_visa" name="signup-need_visa" value="No" onChange={(e) => setNeedVisaInput(e.target.value)} />
                                            <label htmlFor="signup-need_visa">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                </fieldset>
                <div className="mt3 tc"><input className="b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" value="Sign Up" onClick={handleClick} /></div>
            </form>
        </article>
    )
}

const LoginSignup = ({signedIn, handleLogin}) => {
    return (
        <section className="login-signup-container flex justify-center mt6 mb6">
            <Login signedIn={signedIn} handleLogin={handleLogin} />
            <SignUp signedIn={signedIn} handleLogin={handleLogin} />
        </section>
    )
}

export default LoginSignup;