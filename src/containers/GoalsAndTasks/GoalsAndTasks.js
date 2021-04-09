import { useEffect, useState } from 'react';
import CalendarSection from '../../components/CalendarSection/CalendarSection';
import TaskTable from '../../components/TaskTable/TaskTable';
import './GoalsAndTasks.css';
import taskIcon from './../../assets/completed-task.png';
import cross from './../../assets/cross.svg';
import check from './../../assets/check-mark.svg';

const GoalsAndTasks = () => {
    const [tasks, setTasks] = useState([
        'Email Professor Erling about letter of rec',
        'Finish chapter 3 of textbook'
    ])
    const [numTasks, setNumTasks] = useState(tasks.length)

    useEffect(() => {
        console.log(tasks);
    }, [tasks, numTasks])

    return (
        <section id="goals_tasks" className="ph4 pv4 pv5-ns ph4-m ph5-l center ">
            <h1 className="pl3 f1">Goals &amp; Tasks</h1>
            <div className="goals-tasks-container flex justify-between wrap center pa3">
                <CalendarSection 
                    tasks={tasks} 
                    updateTasks={() => setTasks(tasks)} 
                    updateNumTasks={() => setNumTasks(tasks.length)} 
                />
                <TaskTable 
                    tasks={tasks} 
                    numTasks={numTasks} 
                    updateTasks={() => setTasks(tasks)} 
                    updateNumTasks={() => setNumTasks(tasks.length)} 
                    cross={cross} check={check} 
                    taskIcon={taskIcon}
                />
            </div>
        </section>
    )
}

export default GoalsAndTasks;