import './LoginSignup.css';

const Login = ({signedIn, handleLogin}) => {
    const handleClick = (e) => {
        e.preventDefault();
        console.log(handleLogin);
        handleLogin();
    }

    return (
        <article className="pa1 black-80 pr6 br bw1 b--black">
            <h1 className="f1 tc mb2">Login</h1>
            <form acceptCharset="utf-8">
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Login</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="login-username">Username</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="login-username"  id="login-username" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent" type="password" name="login-password"  id="login-password" />
                    </div>
                </fieldset>
                <div className="mt3 tc"><input className="b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" value="Login" onClick={handleClick}/></div>
            </form>
        </article>
    )
}

const SignUp = ({signedIn, handleLogin}) => {
    const handleClick = (e) => {
        e.preventDefault();
        console.log(handleLogin);
        handleLogin();
    }

    return (
        <article className="pa1 black-80 pl6">
            <h1 className="f1 tc mb2">Sign Up</h1>
            <form acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-firstname">First Name</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-firstname"  id="signup-firstname" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-lastname">Last Name</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-lastname"  id="signup-lastname" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-grad-year">Graduation Year</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-grad-year"  id="signup-grad-year" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="signup-username">Username</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="signup-username"  id="signup-username" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent" type="password" name="signup-password"  id="signup-password" />
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