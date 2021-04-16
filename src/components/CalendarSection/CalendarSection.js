import { useRef, useEffect, useState } from 'react';
import AddCalendarEventPopUp from './../AddCalendarEventPopUp/AddCalendarEventPopUp';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import Calendar from './../Calendar/Calendar';
import trophyIcon from './../../assets/trophy.png';
import check from './../../assets/check-mark.svg';

const CalendarSection = ({tasks, updateTasks, updateNumTasks}) => {
    const [showAddCalendarEventPopUp, setShowAddCalendarEventPopUp] = useState(false);
    const [dateStrOfEvent, setDateStrOfEvent] = useState('');
    // const [fakeIdCounter, setFakeIdCounter ]= useState(5); //TODO: uncomment when logged in state exists

    const [events, setEvents] = useState([]);

    const [numEvents, setNumEvents] = useState(0);
    const [eventToRemove, setEventToRemove] = useState({});
    const [eventToAdd, setEventToAdd] = useState({});

    useEffect( () => {
        // if user is logged in
        apiRequest('goals', 'GET', {}, (data) => {
            setEvents(data);
            setNumEvents(data.length)
        }, console.log);

        // TODO: uncomment when logged in state exists
        // if user is not logged in
        // setEvents([
        //     { _id: 1, title: 'Milestone 1', date: '2021-03-01', dateStr: 'Mar 01, 2021', dateObj: new Date('2021-03-01') },
        //     { _id: 2, title: 'Milestone 2', date: '2021-03-20', dateStr: 'Mar 20, 2021', dateObj: new Date('2021-03-20') },
        //     { _id: 3, title: 'Milestone 3', date: '2021-03-22', dateStr: 'Mar 22, 2021', dateObj: new Date('2021-03-22') },
        //     { _id: 4, title: 'Milestone 4', date: '2021-03-26', dateStr: 'Mar 26, 2021', dateObj: new Date('2021-03-26') }
        // ]);
        // setNumEvents(events.length)
    }, [])

    // Boolean to determine whether event is this week so it can go in task table
    // Parameter is a date object
    const isThisWeek = (date) => { 
        const today = new Date();
        const todayDate = today.getDate(); // return 0-31
        const currDayOfWeek = today.getDay(); // return 0-6
        const daysLeftThisWeek = 6 - currDayOfWeek;
        const firstDateOfWeek = todayDate - (6 - daysLeftThisWeek);
        const lastDateOfWeek = todayDate + daysLeftThisWeek;
        const eventDate = date.getUTCDate();

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

    // Handler for adding/deleting event and updating calendar events
    const handleAddEvent = (title, date) => {
        const dateObj = new Date(date);
        const dateStr = `${dateObj.toLocaleDateString("en-US", {month: "short"}, {timeZone: 'UTC'})} ${dateObj.getUTCDate()}, ${dateObj.getFullYear()}`; 

        // if user is logged in
        apiRequest('goals', 'POST', {date: date, dateObj: dateObj, title: title, dateStr: dateStr}, 
        (goal) => {
            setEvents([...events, goal]);
            setEventToAdd(goal)
        }, console.log);

        // TODO: uncomment when logged in state exists
        // if user is not logged in
        // const e = {_id: fakeIdCounter, title, date, dateStr: dateStr, dateObj: new Date(date)}
        // setEvents([...events, e]);
        // setEventToAdd(e); 
        // setFakeIdCounter(fakeIdCounter + 1);

        // If event is in current week, add to tasks list
        if (isThisWeek(dateObj)) {
            // if user is logged in
            apiRequest('tasks', 'POST', {description: title}, 
            (task) => {
                updateNumTasks([...tasks, task].length);
                updateTasks([...tasks, task])
            }, console.log);

            // TODO: uncomment when logged in state exists
            // if user is not logged in
            // const updatedTasks = [...tasks, {_id: `t-${fakeIdCounter}`, description: title}]
            // updateTasks(updatedTasks);
            // updateNumTasks(updatedTasks.length);
        }
    }

    const handleRemoveEvent = (eventId) => {
        const e = events.find(event => event._id === eventId);
        const updatedEvents = events.filter(event => event._id !== eventId);

        // if user is logged in
        idApiRequest('goals', eventId, 'DELETE', {}, () => {
            const updatedEvents = events.filter(event => event._id !== eventId);
            setEvents(updatedEvents);
            setNumEvents(updatedEvents.length);
            setEventToRemove(e);
        }, console.log);    
        
        // TODO: uncomment when logged in state exists
        // if user is not logged in
        // setEvents(updatedEvents);
        // setNumEvents(updatedEvents.length);
        // setEventToRemove(e);

        // Remove from task table if event was this week
        if (tasks.some(task => task.description === e.title)) {
            const taskToRemove = tasks.find(task => task.description === e.title)

            // if user is logged in
            idApiRequest('tasks', taskToRemove._id, 'DELETE', {}, () => {
                const updatedTasks = tasks.filter(task => task.description !== e.title)
                updateTasks(updatedTasks)
                updateNumTasks(updatedTasks.length);
            }, console.log);
            
            // TODO: uncomment when logged in state exists
            // if user is not logged in
            // const fakeTaskToRemove = tasks.find(task => task._id === `t-${eventId}`);
            // const updatedTasks = tasks.filter(task => task._id !== fakeTaskToRemove._id)
            // updateTasks(updatedTasks);
            // updateNumTasks(updatedTasks.length);
        }
    }

    return (
        <div className="calendar-container">
            <div className="calendar pa2 white">
                <Calendar events={events} numEvents={numEvents} eventToAdd={eventToAdd} eventToRemove={eventToRemove} handleAdd={() => setEventToAdd({})} handleRemove={() => setEventToRemove({})} handleDateClick={handleDateClick} />
            </div>
            <div className="calendar-events">
                {events.map(e=> 
                    <div key={e._id} className="calendar-event-container pt3 pb3 pl1 pr1 bb b--white flex justify-between items-center">
                        <div className="calendar-event-icon-container relative ml2 mr2 br4 pa1 flex justify-center items-center">
                            <img src={trophyIcon} alt=""/>
                        </div>
                        <div className="desc-container">
                            <p><b>{e.dateStr}</b> - {e.title}</p>
                        </div>
                        <button className="bg-transparent bn b grow pointer f6 ml2 mr2" onClick={() => handleRemoveEvent(e._id)}><img src={check} alt="Check mark"/></button>
                    </div>
                )}
            </div>
            <AddCalendarEventPopUp date={dateStrOfEvent} visible={showAddCalendarEventPopUp} handleClose={handleClose} handleAdd={handleAddEvent} />
        </div>
    )
}

export default CalendarSection;