import { useState } from 'react';
import Task from './../Task/Task';
import AddTaskPopUp from './../AddTaskPopUp/AddTaskPopUp';
import AddButton from './../AddButton/AddButton';
import taskIcon from './../../assets/completed-task.png';
import cross from './../../assets/cross.svg';

const TaskTable = ({tasks, numTasks, state, dispatch, addTask, removeTask, check}) => {
    const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);

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
                    {state.isFetching ? 'Loading tasks...' : 
                    <tbody className="lh-copy">
                        {tasks.map(task => <Task key={task._id} task={task} onClick={() => removeTask(task._id)} check={check}/>)}
                    </tbody>
                    }
                </table>
                {state.isFetching || state.fetchError ? '' : <AddButton onClick={() => setShowAddTaskPopUp(true) }/> }
            </div>
            <p className="f5 red b tc">{state.deleteError ? state.deleteError : ''}{state.fetchError ? state.fetchError : ''}</p>
            <AddTaskPopUp visible={showAddTaskPopUp} state={state} dispatch={dispatch} handleClose={() => setShowAddTaskPopUp(false)} handleAdd={addTask} cross={cross}/>
        </div>
    )
}

export default TaskTable;