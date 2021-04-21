import { useState, useContext, useEffect } from 'react';
import { UserContext } from './../../context/UserContext';
import { Link as NavLink, useLocation } from "react-router-dom";
import { Link } from 'react-scroll';
import './Navigation.css';
import userPNG from './../../assets/user.png';

const Navigation = () => {
    const {isLoggedIn} = useContext(UserContext);
    const [isHomepage, setIsHomepage] = useState(false);

    let location = useLocation();

    useEffect(() => {
        setIsHomepage(location.pathname === '/' ? true : false)
    }, [location.pathname, isLoggedIn])

    return (
        <header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l top-0">
            <nav className="f6 fw6 tracked flex justify-end">
                {isHomepage && 
                    <>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='goalsAndTasks' spy={true} smooth={true} offset={-80} duration={500} >Goals &amp; Tasks</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='academics' spy={true} smooth={true} offset={-80} duration={500} >Academics</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='experiences' spy={true} smooth={true} offset={-80} duration={500} >Experiences</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='publications' spy={true} smooth={true} offset={-80} duration={500} >Publications</Link>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='uploads' spy={true} smooth={true} offset={-80} duration={500} >Uploads</Link>
                    </>
                }

                {isLoggedIn && isHomepage && 
                    <NavLink className="link dim white dib mr3 account-icon pointer" to='/account'><img src={userPNG} alt="User icon"/></NavLink>
                }

                {!isLoggedIn && isHomepage &&
                    <>
                        <NavLink className="link dim white dib mr3" to="/signin" title="Sign In">Sign In</NavLink>
                        <NavLink className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 signup-icon" to="/signup" title="Sign Up">Sign Up</NavLink>
                    </>
                }
                
                {(!isLoggedIn && !isHomepage) || (isLoggedIn && !isHomepage) &&
                    <NavLink activeClass="active" className="link dim white dib mr3" to="/" title="Home">Home</NavLink>
                }
            </nav>
        </header>
    )
}

export default Navigation;