
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import './LoginSignup.css';

const LoginSignUp = () => {
    return (
        <section className="login-signup-container flex justify-center mt6 mb6">
            <Login  />
            <SignUp  />
        </section>
    )
}

export default LoginSignUp;