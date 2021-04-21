import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Welcome = () => {
    const {user}  = useContext(UserContext);
    const {firstName} = user;

    return (
        <div className="welcome mt6 center tc f2 mb6">
            <h1>{`Welcome, ${firstName}!`}</h1>
        </div>
    )
}

export default Welcome;