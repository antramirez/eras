import { useRef, useEffect, useState } from 'react';
import AddCalendarEventPopUp from './../AddCalendarEventPopUp/AddCalendarEventPopUp';
import Calendar from './../Calendar/Calendar';
import trophyIcon from './../../assets/trophy.png';
import check from './../../assets/check-mark.svg';


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

    const [numEvents, setNumEvents] = useState(events.length);
    const [eventToRemove, setEventToRemove] = useState({});
    const [eventToAdd, setEventToAdd] = useState({});

    useEffect( () => {
        setEvents(events);
    }, [eventToRemove])

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

    // Handler for adding/deleting event and updating calendar events
    const handleAddEvent = (title, date) => {
        const dateObj = new Date(date);
        events.push({title, date, dateStr: `${dateObj.toLocaleDateString("en-US", {month: "short"}, {timeZone: 'UTC'})} ${dateObj.getUTCDate()}, ${dateObj.getFullYear()}`, dateObj: new Date(date)});
        setEvents(events);
        setEventToAdd({title, date, dateStr: `${dateObj.toLocaleDateString("en-US", {month: "short"}, {timeZone: 'UTC'})} ${dateObj.getUTCDate()}, ${dateObj.getFullYear()}`, dateObj: new Date(date)});

        // If event is in current week, add to tasks list
        if (isThisWeek(dateObj)) {
            tasks.push(title);
            updateTasks(tasks);
            updateNumTasks(tasks.length);
        }
    }

    const handleRemoveEvent = (title, date) => {
        const e = events.find(event => event.title === title);
        setEventToRemove(e);

        events.splice(events.indexOf(e), 1);

        setEvents(events);
        setNumEvents(events.length);

        // Remove from task table if event was this week
        if (tasks.includes(title)) {
            tasks.splice(tasks.indexOf(title), 1);
            updateTasks(tasks);
            updateNumTasks(tasks.length);
        }
    }

    return (
        <div className="calendar-container">
            <div className="calendar pa2 white">
                <Calendar events={events} numEvents={numEvents} eventToAdd={eventToAdd} eventToRemove={eventToRemove} handleAdd={() => setEventToAdd({})} handleRemove={() => setEventToRemove({})} handleDateClick={handleDateClick} />
            </div>
            <div className="calendar-events">
                {events.map(e=> 
                    <div className="calendar-event-container pt3 pb3 pl1 pr1 bb b--white flex justify-between items-center">
                        <div className="calendar-event-icon-container relative ml2 mr2 br4 pa1 flex justify-center items-center">
                            <img src={trophyIcon} alt=""/>
                        </div>
                        <div className="desc-container">
                            <p><b>{e.dateStr}</b> - {e.title}</p>
                        </div>
                        <button className="bg-transparent bn b grow pointer f6 ml2 mr2" onClick={() => handleRemoveEvent(e.title, e.dateStr)}><img src={check} alt="Check mark"/></button>
                    </div>
                )}
            </div>
            <AddCalendarEventPopUp date={dateStrOfEvent} visible={showAddCalendarEventPopUp} handleClose={handleClose} handleAdd={handleAddEvent} />
        </div>
    )
}

export default CalendarSection;