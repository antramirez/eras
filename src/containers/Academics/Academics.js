import Scores from '../../components/Scores/Scores';
import Percentile from '../../components/Percentile/Percentile';
import Courses from '../../components/Courses/Courses';
import './Academics.css';

const Academics = ({gradYear}) => {
    return (
    <section id="academics" className="ph4 pv4 pv5-ns ph4-m ph5-l">
        <h1 className="pl3 f1">Academics</h1>
        <Scores />
        <Percentile />
        <Courses />
    </section>
    )
}

export default Academics;