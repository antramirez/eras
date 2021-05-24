
import { useEffect } from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import './LoginSignup.css';

const LoginSignUp = () => {
    useEffect(() => {
        document.title = 'ERAS - Sign In / Sign Up';
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <section className="login-signup-container flex justify-center mt6 mb6">
            <Login  />
            <SignUp  />
        </section>
    )
}

export default LoginSignUp;