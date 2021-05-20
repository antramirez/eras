import { useContext } from 'react';
import { Element } from 'react-scroll';
import Welcome from '../../containers/Welcome/Welcome';
import GoalsAndTasks from '../GoalsAndTasks/GoalsAndTasks';
import Academics from '../Academics/Academics';
import Experiences from '../Experiences/Experiences';
import Publications from '../Publications/Publications';
import Uploads from '../Uploads/Uploads';
import {UserContext} from '../../context/UserContext';

const Home = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    const { graduationYear } = user;
    
    return (
        <>
            {isLoggedIn && 
                <Welcome />
            }
            <Element name="goalsAndTasks">
                <GoalsAndTasks />
            </Element>
            {!isLoggedIn | graduationYear < 2024 ? <Element name="academics"><Academics /></Element> : ''}
            <Element name="experiences">
                <Experiences />
            </Element>
            <Element name="publications">
                <Publications />
            </Element>
            <Element name="uploads">
                <Uploads />
            </Element>
        </>
    )    
}

export default Home;