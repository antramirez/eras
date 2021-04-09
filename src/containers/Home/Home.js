import { Element } from 'react-scroll';
import Welcome from '../../components/Welcome/Welcome';
import GoalsAndTasks from '../GoalsAndTasks/GoalsAndTasks';
import Academics from '../Academics/Academics';
import Experiences from '../Experiences/Experiences';
import Publications from '../Publications/Publications';
import Uploads from '../Uploads/Uploads';

const Home = ({signedIn}) => {
    return (
        <>
            {signedIn && 
                <Welcome />
            }
            <Element name="goalsAndTasks">
                <GoalsAndTasks />
            </Element>
            <Element name="academics">
                <Academics />
            </Element>
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