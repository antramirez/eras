import { useRef, useEffect, useState } from 'react';
import Calendar from './../Calendar/Calendar';
import TaskTable from './../TaskTable/TaskTable';
import './GoalsAndTasks.css';
import AddButton from './../AddButton/AddButton';
import taskIcon from './../../assets/completed-task.png';
import cross from './../../assets/cross.svg';
import check from './../../assets/check-mark.svg';

const AddCalendarEventPopUp = ({date, visible, handleDateSelect, handleClose, handleAdd}) => {
    const popUpContainerRef = useRef(null);
    const [dateInputValue, setDateInputValue] = useState(date);
    const [eventInputValue, setEventInputValue] = useState('');

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

const CalendarSection = ({tasks, updateTasks, updateNumTasks}) => {
    const [showAddCalendarEventPopUp, setShowAddCalendarEventPopUp] = useState(false);
    const [dateStrOfEvent, setDateStrOfEvent] = useState('');

    // Temporary events for calendar
    const [events, setEvents] = useState([
        { title: 'Milestone 1', date: '2021-03-01', dateStr: 'Mar 01, 2021', dateObj: new Date('2021-03-20') },
        { title: 'Milestone 2', date: '2021-03-20', dateStr: 'Mar 20, 2021', dateObj: new Date('2021-03-20') },
        { title: 'Milestone 3', date: '2021-03-22', dateStr: 'Mar 22, 2021', dateObj: new Date('2021-03-26') },
        { title: 'Milestone 4', date: '2021-03-26', dateStr: 'Mar 26, 2021', dateObj: new Date('2021-03-20') }
    ])

    useEffect( () => {
        setEvents(events);
    }, [events.length])

    // Boolean to determine whether event is this week so it can go in task table
    // Parameter is a date object
    const isThisWeek = (date) => { 
        const today = new Date();
        const todayDate = today.getDate(); // return 0-31
        const currDayOfWeek = today.getDay(); // return 0-6
        const daysLeftThisWeek = 6 - currDayOfWeek;
        const firstDateOfWeek = todayDate - (6 - daysLeftThisWeek);
        const lastDateOfWeek = todayDate + daysLeftThisWeek;
        const eventDate = date.getDate();

        return eventDate >= firstDateOfWeek && eventDate <= lastDateOfWeek
    }

    // Handlers for clicking add and close button to display/hide pop up
    const handleDateClick = (dateStr, dateFormatted) => {
        setDateStrOfEvent(dateStr);
        setShowAddCalendarEventPopUp(true);
    }
    const handleClose = () => {
        setShowAddCalendarEventPopUp(false);
    }

    // Handler for adding event and updating calendar events
    const handleAddEvent = (title, date) => {
        const dateObj = new Date(date)
        events.push({title, date, dateStr: `${dateObj.toLocaleDateString("en", {month: "short"})} ${dateObj.getDate()}, ${dateObj.getFullYear()}`, dateObj: new Date(date)});
        setEvents(events);

        // If event is in current week, add to tasks list
        if (isThisWeek(dateObj)) {
            tasks.push(title);
            updateTasks(tasks);
            updateNumTasks(tasks.length);
        }
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
                        <p>{e.dateStr} - {e.title}</p>
                    </div>
                )}
            </div>
            <AddCalendarEventPopUp date={dateStrOfEvent} visible={showAddCalendarEventPopUp} handleClose={handleClose} handleAdd={handleAddEvent} />
        </div>
    )
}

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
                    updateTasks={() => {
                        setTasks(tasks);
                        console.log(tasks)
                        console.log(numTasks)
                    }} 
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