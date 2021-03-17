import Calendar from './../Calendar/Calendar';
import './GoalsAndTasks.css';
import taskIcon from './../../assets/completed-task.png';
import AddButton from '../AddButton/AddButton';

const events = [
    { title: 'Milestone 1', date: '2021-03-01' },
    { title: 'Milestone 2', date: '2021-03-20' },
    { title: 'Milestone 3', date: '2021-03-22' }
]

const CalendarSection = () => {
    return (
        <div className="calendar-container">
            <div className="calendar pa2 white">
                <Calendar events={events}/>
            </div>
            <div className="calendar-events">
                {events.map(e=> 
                    <div className="calendar-event-container pa3 bb b--white flex">
                        <div className="calendar-event-icon-container relative ml3 mr3 br4 pa1 flex justify-center items-center ">
                            <img src={taskIcon} alt=""/>

                        </div>
                        <p>{e.title}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const TaskTable = () => {
    return (
        <div className="tasks-container ml4">
            <div className="overflow-auto">
                <table id="task-table" className="f3 w-100 mw9 center" cellSpacing="0">
                <thead>
                    <tr>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 pl3 tc">
                            <h2 className="f1 mb2 mt2">Tasks</h2>
                            <div className="num_tasks flex justify-center items-center">
                                <img className="ma1" src={taskIcon} alt=""/>
                                <h3 className="f2 ma1">0</h3>
                            </div>
                            <p className="f3 mb1 mt2">tasks due</p>
                        </th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    <tr>
                        <td className="pv3 bb task-border ">
                            <p className="f4 pl3 mt1 mb1">Email Professor Erling about letter of rec</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="pv3 pr3 bb task-border"></td>
                    </tr>
                    <tr>
                        <td className="pv3 pr3 bb  task-border"></td>
                    </tr>
                    <tr>
                        <td className="pv3 pr3 bb task-border"></td>
                    </tr>
                    <tr>
                        <td className="pv3 pr3 "></td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
    )
}

const GoalsAndTasks = () => {
    return (
        <section id="goals_tasks" className="ph4 pv4 pv5-ns ph4-m ph5-l center ">
            <h1 className="pl3 f1">Goals & Tasks</h1>
            <div className="goals-tasks-container flex justify-between wrap center pa3">
                <CalendarSection />
                <TaskTable />
                <AddButton />
            </div>
        </section>
    )
}

export default GoalsAndTasks;