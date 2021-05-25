import { useEffect, useState, useContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import CalendarSection from '../../components/CalendarSection/CalendarSection';
import TaskTable from '../../components/TaskTable/TaskTable';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import { taskReducer } from '../../reducers/TaskReducer';
import { fakeTasks } from '../../data/fakeData';
import './GoalsAndTasks.css';
import taskIcon from './../../assets/completed-task.png';
import check from './../../assets/check-mark.svg';
import { Fade } from 'react-reveal';

const GoalsAndTasks = () => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(taskReducer, { _id: 0, goalId: '', description: '', isFetching: false, isAdding: false, isDeleting: false, fetchSuccess: false, addSuccess: false, deleteSuccess: false, fetchError: '', addError: '', deleteError: '' });

    // TODO: move goals up from child components
    const [tasks, setTasks] = useState([]);
    const [fakeTaskIdCounter, setFakeTaskIdCounter] = useState(3);

    useEffect(() => {
        // if user is logged in, set tasks to their tasks
        if (isLoggedIn) {
            dispatch({ type: 'fetch' });
            apiRequest('tasks', 'GET', {}, (data) => {
                setTasks(data);
                dispatch({ type: 'fetch_success' });
            }, () => {
                dispatch({ type: 'fetch_error', payload: 'Could not load your tasks, please try again later.' });
            })
            
            // Set error message if api can't be accessed
            if (!state.fetchSuccess) {
                dispatch({ type: 'fetch_error', payload: 'Could not load your tasks, please try again later.' });
            }
        } else {
            setTasks(fakeTasks);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])


    // Handler for adding task and updating tasks
    const addTask = async (description) => {
        dispatch({ type: 'add', payload: description });
        let success = false; // temporary variable to get around reducer's async functionality

        if (isLoggedIn) {
            await apiRequest('tasks', 'POST', {description}, (task) => {
                const updatedTasks = [...tasks, task];
                setTasks(updatedTasks);

                dispatch({ type: 'add_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'add_error', payload: e.error });
                success = false;
            });
        } else {
            const updatedTasks = [...tasks, { _id: fakeTaskIdCounter, description }];
            setTasks(updatedTasks);
            setFakeTaskIdCounter(fakeTaskIdCounter + 1);
            success = true;
        }

        return success;
    }

    // Handler for marking task comleted (removing task)
    const removeTask = async (taskId) => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        const updatedTasks = tasks.filter(task => task._id !== taskId);

        if (isLoggedIn) {
            await idApiRequest('tasks', taskId, 'DELETE', {}, () => {
                setTasks(updatedTasks);

                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });
        } else {
            setTasks(updatedTasks);

            dispatch({ type: 'delete_success' });
            success = true;
        }

        return success;
    }

    return (
        <section id="goals_tasks" className="ph4 pv4 pv5-ns ph4-m ph5-l center ">
            <Fade top delay={200}>
                <h1 className="pl3 f1">Goals &amp; Tasks</h1>
            </Fade>
            <div className="goals-tasks-container flex justify-between wrap center pa3">
                <CalendarSection 
                    tasks={tasks} 
                    updateTasks={(updatedTasks) => setTasks(updatedTasks)} 
                />
                <TaskTable 
                    tasks={tasks} 
                    state={state}
                    dispatch={dispatch}
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