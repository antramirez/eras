import { Link } from 'react-router-dom';
import './Navigation.css';
import userPNG from './../../assets/user.png';

const Navigation = ({signedIn}) => {
    return (
        <header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l top-0">
            <nav className="f6 fw6 tracked flex justify-end">
                {/* <Link className="link dim white dib mr3" to='/academics'>Academics</Link>
                <Link className="link dim white dib mr3" to='/experiences'>Experiences</Link>
                <Link className="link dim white dib mr3" to='/publications'>Publications</Link>
                <Link className="link dim white dib mr3" to='/uploads'>Uploads</Link> */}

                <a className="link dim white dib mr3" href="/#academics" title="Academics">Academics</a>
                <a className="link dim white dib mr3" href="/#experiences" title="Experiences">Experiences</a>
                <a className="link dim white dib mr3" href="/#publications" title="Publications">Publications</a>
                <a className="link dim white dib mr3" href="/#uploads" title="Uploads">Uploads</a>

                {signedIn &&
                    // <Link className="link dim white dib mr3 account-icon" to='/account'><img src={userPNG} alt="User icon"/></Link>
                    <a className="link dim white dib mr3 account-icon" href="/account" title="Account"><img src={userPNG} alt="User icon"/></a>
                }

                {!signedIn && 
                    <>
                        <a className="link dim white dib mr3" href="/signin" title="Sign In">Sign In</a>
                        <a className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 signup-icon" href="/signup" title="Sign Up">Sign Up</a>

                        {/* <Link className="link dim white dib mr3" to='/signin'>Sign In</Link>
                        <Link className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 signup-icon" to='/signup'>Sign Up</Link> */}
                    </>
                }
            </nav>
        </header>
    )
}

export default Navigation;