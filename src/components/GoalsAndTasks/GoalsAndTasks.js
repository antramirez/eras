import { useRef, useEffect, useState } from 'react';
import Calendar from './../Calendar/Calendar';
import './GoalsAndTasks.css';
import AddButton from '../AddButton/AddButton';
import taskIcon from './../../assets/completed-task.png';
import cross from './../../assets/cross.svg';
import check from './../../assets/check-mark.svg';

const AddCalendarEventPopUp = ({date, visible, handleDateSelect, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const [dateInputValue, setDateInputValue] = useState(date);
    const [eventInputValue, setEventInputValue] = useState(date);

    // Display the popup everytime visible is true, which happens when add button is pressed
    useEffect(() => {
        setDateInputValue(date);
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

    // Handler for event input change
    const handleInputChange = (e) => {
        setEventInputValue(e.target.value);
        // handleDateSelect(inputValue)
    }

    // Handler for submitting form
    const handleAddClick = (e) => {
        e.preventDefault();
        handleAdd(eventInputValue, dateInputValue);
        handleClose();
    }

    return (
        <article className="add-calendar-event-popup-container  " ref={popUpContainerRef}>
            <form className="black-80 mw6 center pa4 shadow-5 br3 relative" acceptCharset="utf-8">
                <button className="close-btn absolute bn bg-transparent" onClick={handleCloseClick}>
                    <img src={cross} alt=""/>
                </button>
                <h3 className="f3">Add Goal or Milestone</h3>
                <fieldset id="log_in" className="ba b--transparent ph0 mh0">
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="calendar-event-date">Date</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="calendar-event-date"  id="calendar-event-date" readOnly value={dateInputValue}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f5" htmlFor="calendar-event-title">Goal/Milestone</label>
                        <input className="pa2 input-reset bt-0 bl-0 br-0 bb bg-transparent w-100 measure" type="text" name="calendar-event-title"  id="calendar-event-title" onChange={handleInputChange}/>
                    </div>
                </fieldset>
                <button className=" mt3 mb2 b ph3 pv2 input-reset ba b--black grow pointer f6" type="submit" onClick={handleAddClick}>Add</button>
            </form>
        </article>
    )
}

const CalendarSection = () => {
    const [showAddCalendarEventPopUp, setShowAddCalendarEventPopUp] = useState(false);
    const [dateOfEvent, setDateOfEvent] = useState('');

    // Temporary events for calendar
    const [events, setEvents] = useState([
        { title: 'Milestone 1', date: '2021-03-01'},
        { title: 'Milestone 2', date: '2021-03-20' },
        { title: 'Milestone 3', date: '2021-03-22' }
    ])

    useEffect( () => {
        setEvents(events);
    }, [events.length])

    // Handlers for clicking add and close button to display/hide pop up
    const handleDateClick = (date) => {
        setDateOfEvent(date);
        setShowAddCalendarEventPopUp(true);
    }
    const handleClose = () => {
        setShowAddCalendarEventPopUp(false);
    }

    // Handler for adding event and updating calendar events
    const handleAddEvent = (title, date) => {
        console.log(events.push({title, date}));
        setEvents(events);
    }

    return (
        <div className="calendar-container">
            <div className="calendar pa2 white">
                <Calendar events={events} handleDateClick={handleDateClick} />
            </div>
            <div className="calendar-events">
                {events.map(e=> 
                    <div className="calendar-event-container pa3 bb b--white flex">
                        <div className="calendar-event-icon-container relative ml3 mr3 br4 pa1 flex justify-center items-center ">
                            <img src={taskIcon} alt=""/>
                        </div>
                        <p>{e.date} - {e.title}</p>
                    </div>
                )}
            </div>
            <AddCalendarEventPopUp date={dateOfEvent} visible={showAddCalendarEventPopUp} handleClose={handleClose} handleAdd={handleAddEvent} />
        </div>
    )
}

const AddTaskPopUp = ({visible, handleClose, handleAdd }) => {
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

const Task = ({task, onClick}) => {
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

const TaskTable = () => {
    const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);
    const [tasks, setTasks] = useState([
                                        'Email Professor Erling about letter of rec',
                                        'Finish chapter 3 of textbook'
                                    ])
    const [numTasks, setNumTasks] = useState(tasks.length)

    // update tasks every time number of tasks in array updates
    useEffect(() => {
        setTasks(tasks);
    }, [numTasks])

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
        setTasks(tasks)
    }

    // Handler for marking task comleted (removing task)
    const handleMarkCompleted = (task) => {
        const taskToRemove = tasks.find(task => task === task);
        tasks.splice(tasks.indexOf(taskToRemove), 1)
        setTasks(tasks);
        // task array doesn't update immediately so useEffect will run when numTasks updates instead
        setNumTasks(tasks.length)
    }

    return (
        <div className="tasks-container ml4">
            <div className="">
                <table id="task-table" className="f3 w-100 mw9 center collapse" cellSpacing="0">
                <thead>
                    <tr>
                        <th className="fw6 tl pb3 pl4 tc">
                            <h2 className="f1 mb2 mt2">Tasks</h2>
                            <div className="num_tasks flex justify-center items-center">
                                <img className="ma1" src={taskIcon} alt=""/>
                                <h3 className="f2 ma1">{tasks.length}</h3>
                            </div>
                            <p className="f3 mb1 mt2">tasks due</p>
                        </th>
                        <th className="check-box"></th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    {tasks.map(task => <Task task={task} onClick={() => handleMarkCompleted(task)}/>)}
                </tbody>
                </table>
            </div>
            <AddButton onClick={handleAddTaskClick}/>
            <AddTaskPopUp visible={showAddTaskPopUp} handleClose={handleClose} handleAdd={handleAddTask}/>
        </div>
    )
}

const GoalsAndTasks = () => {
        return (
        <section id="goals_tasks" className="ph4 pv4 pv5-ns ph4-m ph5-l center ">
            <h1 className="pl3 f1">Goals &amp; Tasks</h1>
            <div className="goals-tasks-container flex justify-between wrap center pa3">
                <CalendarSection />
                <TaskTable />
            </div>
        </section>
    )
}

export default GoalsAndTasks;