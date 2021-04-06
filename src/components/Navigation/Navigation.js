import {  useState } from 'react';
import { Link as NavLink } from "react-router-dom";
import { Link } from 'react-scroll';
import './Navigation.css';
import userPNG from './../../assets/user.png';

const Navigation = ({signedIn}) => {
    const [showFullNavBar, setShowFullNavBar] = useState(true); // will be set to false when on login/signup page

    return (
        <header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l top-0">
            <nav className="f6 fw6 tracked flex justify-end">
                {showFullNavBar && 
                    <>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='goalsAndTasks' spy={true} smooth={true} duration={500} >Goals &amp; Tasks</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='academics' spy={true} smooth={true} duration={500} >Academics</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='experiences' spy={true} smooth={true} duration={500} >Experiences</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='publications' spy={true} smooth={true} duration={500} >Publications</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='uploads' spy={true} smooth={true} duration={500} >Uploads</Link>
                    </>
                }

                {signedIn && showFullNavBar && 
                    <NavLink className="link dim white dib mr3 account-icon pointer" to='/account' spy={true} smooth={true} duration={500} ><img src={userPNG} alt="User icon"/></NavLink>
                }

                {!signedIn && showFullNavBar &&
                    <>
                        <NavLink className="link dim white dib mr3" to="/signin" title="Sign In">Sign In</NavLink>
                        <NavLink className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 signup-icon" to="/signup" title="Sign Up">Sign Up</NavLink>
                    </>
                }
            </nav>
        </header>
    )
}

export default Navigation;