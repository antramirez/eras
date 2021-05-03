import { useContext } from 'react'
import Scores from '../../components/Scores/Scores';
import Percentile from '../../components/Percentile/Percentile';
import Courses from '../../components/Courses/Courses';
import { UserContext } from '../../context/UserContext';
import './Academics.css';

const Academics = () => {
    const { user } = useContext(UserContext);
    const { graduationYear } = user;
    return (
        <section id="academics" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Academics</h1>
            <Scores />
            <Percentile />
            {(graduationYear < 2024) && <Courses />}
        </section>
    )
}

export default Academics;