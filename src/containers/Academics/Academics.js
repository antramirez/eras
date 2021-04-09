import { useRef, useEffect, useState } from 'react';
import Scores from '../../components/Scores/Scores';
import Percentile from '../../components/Percentile/Percentile';
import Courses from '../../components/Courses/Courses';
import './Academics.css';

const Academics = ({gradYear}) => {
    const [score1, setScore1] = useState(260);
    const [score2, setScore2] = useState(-1);

    return (
        <section id="academics" className="ph4 pv4 pv5-ns ph4-m ph5-l">
            <h1 className="pl3 f1">Academics</h1>
            <Scores score1={score1} score2={score2}/>
            <Percentile />
            <Courses />
        </section>
    )
}

export default Academics;