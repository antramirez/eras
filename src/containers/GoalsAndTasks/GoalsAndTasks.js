import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import CalendarSection from '../../components/CalendarSection/CalendarSection';
import TaskTable from '../../components/TaskTable/TaskTable';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import './GoalsAndTasks.css';
import taskIcon from './../../assets/completed-task.png';
import check from './../../assets/check-mark.svg';

const GoalsAndTasks = () => {
    const { isLoggedIn } = useContext(UserContext);

    // TODO: move goals up from child components
    const [tasks, setTasks] = useState([]);
    const [numTasks, setNumTasks] = useState(0);
    const [fakeTaskIdCounter, setFakeTaskIdCounter] = useState(3);

    useEffect(() => {
        // if user is logged in, set tasks to their tasks
        if (isLoggedIn) {
            apiRequest('tasks', 'GET', {}, (data) => {
                setTasks(data);
                setNumTasks(data.length);
            }, console.log)
        } else {
            // if user is not logged in
            const fakeTasks = [
                { _id: 1, goalId: null, description: 'Email Professor Erling about letter of rec' },
                { _id: 2, goalId: null, description: 'Finish chapter 3 of textbook' }
            ];
            setTasks(fakeTasks);
            setNumTasks(fakeTasks.length);
        }        
    }, [isLoggedIn])


    // Handler for adding task and updating tasks
    const addTask = (description) => {
        // if user is logged in
        if (isLoggedIn) {
            apiRequest('tasks', 'POST', {description}, (task) => {
                const updatedTasks = [...tasks, task];
                setTasks(updatedTasks);
                setNumTasks(updatedTasks.length);
            }, console.log);
        } else {
            // if user is not logged in
            const updatedTasks = [...tasks, { _id: fakeTaskIdCounter, description }];
            setTasks(updatedTasks);
            setNumTasks(updatedTasks.length)
            setFakeTaskIdCounter(fakeTaskIdCounter + 1);
        }
    }

    // Handler for marking task comleted (removing task)
    const removeTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task._id !== taskId);

        if (isLoggedIn) {
            // if user is logged in
            idApiRequest('tasks', taskId, 'DELETE', {}, () => {
                setTasks(updatedTasks);
                setNumTasks(updatedTasks.length);
            }, console.log);
        } else {
            // if user is not logged in
            setTasks(updatedTasks);
            setNumTasks(updatedTasks.length);
        }
    }

    return (
        <section id="goals_tasks" className="ph4 pv4 pv5-ns ph4-m ph5-l center ">
            <h1 className="pl3 f1">Goals &amp; Tasks</h1>
            <div className="goals-tasks-container flex justify-between wrap center pa3">
                <CalendarSection 
                    tasks={tasks} 
                    updateTasks={(updatedTasks) => setTasks(updatedTasks)} 
                    updateNumTasks={(num) => setNumTasks(num)} 
                />
                <TaskTable 
                    tasks={tasks} 
                    numTasks={numTasks} 
                    addTask={addTask}
                    removeTask={removeTask}
                    check={check} 
                    taskIcon={taskIcon}
                />
            </div>
        </section>
    )
}

export default GoalsAndTasks;