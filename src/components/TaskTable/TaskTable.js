import { useRef, useEffect, useState } from 'react';
import AddButton from './..//AddButton/AddButton';
import taskIcon from './../../assets/completed-task.png';

const AddTaskPopUp = ({visible, handleClose, handleAdd, cross }) => {
    const popUpContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    // Display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
        if (visible) {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.remove('dn');
                popUpContainerRef.current.classList.add('flex', 'content-center', 'justify-center', 'items-center');
            }
        } else {
            if (popUpContainerRef.current) {
                popUpContainerRef.current.classList.add('dn');
                popUpContainerRef.current.classList.remove('flex', 'content-center', 'justify-center', 'items-center');
            }
        }
        
    }, [visible])

    // Handler for closing pop up
    const handleCloseClick = (e) => {
        e.preventDefault();
        handleClose();
    }
    
    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(inputValue);
        handleClose();
    }

    // Handler for input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <article className="add-task-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Task</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="task-title">Task</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="task-title"  id="task-title" onChange={handleInputChange}/>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>Add</button>
            </form>
        </article>
    )
}

const Task = ({task, onClick, check}) => {
    return (
       <tr className="relative bb task-border task-row">
            <td className="pv3 pr3 task-cell">
                <p className="f4 pl3 mt1 mb1">{task}</p>
            </td>
            <td>
                <button className="bg-transparent bn b grow pointer f6 check-mark" onClick={onClick}><img src={check} alt="Check mark"/></button>
            </td>
       </tr>
    )
}

const TaskTable = ({tasks, numTasks, updateTasks, updateNumTasks, cross, check}) => {
    const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);

    // update tasks every time number of tasks in array updates
    // useEffect(() => {
    //     updateTasks(tasks);
    // }, [numTasks])

    // Handlers for clicking add/closing pop up
    const handleAddTaskClick = (e) => {
        setShowAddTaskPopUp(true);
    }
    const handleClose = (e) => {
        setShowAddTaskPopUp(false);
    }
    
    // Handler for adding task and updating tasks
    const handleAddTask = (task) => {
        tasks.push(task)
        updateTasks(tasks)
        updateNumTasks(tasks.length)
    }

    // Handler for marking task comleted (removing task)
    const handleMarkCompleted = (remTask) => {
        const taskToRemove = tasks.find(task => task === remTask);
        console.log(taskToRemove)
        tasks.splice(tasks.indexOf(taskToRemove), 1)
        updateTasks(tasks);
        // task array doesn't update immediately so useEffect will run when numTasks updates instead
        updateNumTasks(tasks.length)
    }

    return (
        <div className="tasks-container ml4">
            <div className="task-table-container">
                <table id="task-table" className="f3 w-100 mw9 center collapse" cellSpacing="0">
                    <thead>
                        <tr>
                            <th className="fw6 tl pb3 pl4 tc">
                                <h2 className="f1 mb2 mt2">Tasks</h2>
                                <div className="num_tasks flex justify-center items-center">
                                    <img className="ma1" src={taskIcon} alt=""/>
                                    <h3 className="f2 ma1">{numTasks}</h3>
                                </div>
                                <p className="f3 mb1 mt2">task{numTasks !== 1 && 's'} due this week</p>
                            </th>
                            <th className="check-box"></th>
                        </tr>
                    </thead>
                    <tbody className="lh-copy">
                        {tasks.map(task => <Task task={task} onClick={() => handleMarkCompleted(task)} check={check}/>)}
                    </tbody>
                </table>
                <AddButton onClick={handleAddTaskClick}/>
            </div>
            <AddTaskPopUp visible={showAddTaskPopUp} handleClose={handleClose} handleAdd={handleAddTask} cross={cross}/>
        </div>
    )
}

export default TaskTable;