import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Fade } from 'react-reveal';

const Welcome = () => {
    const {user}  = useContext(UserContext);
    const {firstName} = user;

    return (
        <div className="welcome mt6 center tc f2 mb6">
            <Fade top>
                <h1>{`Welcome, ${firstName}!`}</h1>
            </Fade>
        </div>
    )
}

export default Welcome;