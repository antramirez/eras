import './Academics.css';
import AddButton from './../AddButton/AddButton';
import Graph from './../Graph/Graph';


const Courses = () => {
    return (
        <div className="pa4 courses-table-container">
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>
                    <tr className="">
                        <th className="fw6 tl pa3 academics-course-name">Clerkship Grades</th>
                        <th className="fw6 tl pa3 academics-course-f">F</th>
                        <th className="fw6 tl pa3 academics-course-p">P</th>
                        <th className="fw6 tl pa3 academics-course-hp">HP</th>
                        <th className="fw6 tl pa3 academics-course-h">H</th>
                        <th className="fw6 tl pa3 blank-col"></th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    <tr className="stripe-dark">
                        <td className="pa3">Family Medicine</td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        {/* <td className="course-grade-filled"></td>
                        <td className="course-grade-filled"></td>
                        <td className="course-grade-filled"></td> */}
                        <td></td>
                    </tr>
                    <tr className="stripe-dark">
                        <td className="pa3">Pediatrics</td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td className=""></td>
                        <td className=""></td>
                        <td></td>
                    </tr>
                    <tr className="stripe-dark">
                        <td className="pa3">Emergency Medicine</td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td className=""></td>
                        <td></td>
                    </tr>
                    <tr className="stripe-dark">
                        <td className="pa3">OB/GYN</td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td className=""></td>
                        <td></td>
                    </tr>
                    <tr className="stripe-dark">
                        <td className="pa3">Internal Medicine</td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td><div className="course-grade-filled"></div></td>
                        <td></td>
                    </tr>
                </tbody>
                </table>
            </div>
            <AddButton />
        </div>
    )
}

const Scores = ({score1='260', score2='---'}) => {
    return (
        <div className="scores-container flex center justify-center mw8 mb5">
            <div className="score-container  tc br bw1 b--black">
                <h2 className="f2">Step 1</h2>
                <p className="f1 mt1">{score1}</p>
            </div>
            {/* <span className="score-divider"></span> */}
            <div className="score-container  tc">
                <h2 className="f2">Step 2</h2>
                <p className="f1 mt1">{score2}</p>
                
            </div>
        </div>
    )
}

const Percentile = () => {
    return (
        <div className="percentile-container center tc">
            <h2 className="f2">Percentile</h2>
            <div className="percentile-graph">
                <Graph />
            </div>
        </div>
    )
}

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