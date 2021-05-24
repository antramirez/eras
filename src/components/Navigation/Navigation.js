import { useState, useContext, useEffect } from 'react';
import { UserContext } from './../../context/UserContext';
import { Link as NavLink, useLocation } from "react-router-dom";
import { Link } from 'react-scroll';
import './Navigation.css';
import userPNG from './../../assets/user.png';
import cross from './../../assets/cross.svg';

const Navigation = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    const { graduationYear } = user;
    const [isHomepage, setIsHomepage] = useState(false);

    const [showNavPopUp, setShowNavPopUp] = useState(true);

    let location = useLocation();

    useEffect(() => {
        setIsHomepage(location.pathname === '/' ? true : false);
        
        let navPopUpTimeout = null;

        // show sign in pop up for 12 seconds if user is not logged in
        if (!isLoggedIn) {
            if (showNavPopUp) {
                navPopUpTimeout = setTimeout(() => {
                    setShowNavPopUp(false);
                }, 15000);
            }
        }
        return () => {
            clearTimeout(navPopUpTimeout);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, isLoggedIn])

    return (
        <header className="fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l top-0">
            <nav className="f6 fw6 tracked flex justify-end">
                {isHomepage && 
                    <>
                        <Link activeClass="active" className="link dim white dib mr3 pointer" to='goalsAndTasks' spy={true} smooth={true} offset={-80} duration={500} >Goals &amp; Tasks</Link>
                        {graduationYear <= 2023 | !isLoggedIn && <Link activeClass="active" className="link dim white dib mr3 pointer" to='academics' spy={true} smooth={true} offset={-80} duration={500} >Academics</Link>}
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
                        <NavLink className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 signin-icon" to="/signin" title="Sign In">Sign In</NavLink>
                        <span style={{display: showNavPopUp ? 'block' : 'none'}} className="nav-popup br3 shadow-5 pl3 pr3 pt3 pb1">
                            <div className="nav-arrow"></div>
                            <div>
                                <button className="bg-transparent bn b absolute pointer" onClick={() => setShowNavPopUp(false)}><img className="h-100" src={cross} alt="Close navigation popup"/></button>
                                <p>Without an account, any change you make will be deleted after leaving the page.</p>
                                <p>New user?<NavLink className="link dim di " to="/signup" title="Sign Up"> Start here.</NavLink></p>
                            </div>
                        </span>
                    </>
                }
                
                {isLoggedIn && !isHomepage &&
                    <NavLink activeClass="active" className="link dim white dib mr3" to="/" title="Home">Home</NavLink>
                }

                {!isLoggedIn && !isHomepage && 
                    <NavLink activeClass="active" className="link dim white dib mr3" to="/" title="Home">Home</NavLink>
                }
            </nav>
        </header>
    )
}

export default Navigation;