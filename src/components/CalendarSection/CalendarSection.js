import { useEffect, useState, useContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import AddCalendarEventPopUp from './../AddCalendarEventPopUp/AddCalendarEventPopUp';
import { apiRequest, idApiRequest } from '../../utils/apiRequests';
import Calendar from './../Calendar/Calendar';
import { eventReducer } from '../../reducers/EventReducer';
import trophyIcon from './../../assets/trophy.png';
import check from './../../assets/check-mark.svg';

const CalendarSection = ({tasks, updateTasks, updateNumTasks}) => {
    const { isLoggedIn } = useContext(UserContext);

    const [state, dispatch] = useReducer(eventReducer, { title: '', date: '', dateStr: '', dateObj: '', isAdding: false, isEditing: false, isDeleting: false, addSuccess: false, editSuccess: false, deleteSuccess: false, addError: '', editError: '', deleteError: '' });

    const [showAddCalendarEventPopUp, setShowAddCalendarEventPopUp] = useState(false);
    const [fakeIdCounter, setFakeIdCounter ]= useState(5);

    const [events, setEvents] = useState([]);

    const [numEvents, setNumEvents] = useState(0);
    const [eventToRemove, setEventToRemove] = useState({});
    const [eventToAdd, setEventToAdd] = useState({});

    useEffect( () => {
        if (isLoggedIn) {
            apiRequest('goals', 'GET', {}, (data) => {
                setEvents(data);
                setNumEvents(data.length)
            }, console.log);
        } else {
            setEvents([
                { _id: 1, title: 'Milestone 1', date: '2021-03-01', dateStr: 'Mar 01, 2021', dateObj: new Date('2021-03-01') },
                { _id: 2, title: 'Milestone 2', date: '2021-03-20', dateStr: 'Mar 20, 2021', dateObj: new Date('2021-03-20') },
                { _id: 3, title: 'Milestone 3', date: '2021-03-22', dateStr: 'Mar 22, 2021', dateObj: new Date('2021-03-22') },
                { _id: 4, title: 'Milestone 4', date: '2021-03-26', dateStr: 'Mar 26, 2021', dateObj: new Date('2021-03-26') }
            ]);
            setNumEvents(events.length);
        }
    }, [isLoggedIn])

    // Boolean to determine whether event is this week so it can go in task table
    const isThisWeek = (dateObj) => { 
        const today = new Date();
        const todayDate = today.getDate(); // return 0-31
        const currDayOfWeek = today.getDay(); // return 0-6
        const daysLeftThisWeek = 6 - currDayOfWeek;
        const firstDateOfWeek = todayDate - (6 - daysLeftThisWeek);
        const lastDateOfWeek = todayDate + daysLeftThisWeek; // if in the next month, may be in the 30s
        let eventDate = dateObj.getUTCDate();

        const currMonth = today.getMonth(); // 0-11

        const monthsWith30 = [3,5,8,10];
        const monthsWith31 = [0,2,4,6,7,9,11];

        // Alter event date if currently last week of month to determine whether it is this week
        // e.g. if last week of April, May 1 is counted as date 31
        if (monthsWith30.includes(currMonth)) {
            if (firstDateOfWeek >= 25 && eventDate < lastDateOfWeek - 25) {
                eventDate += 30;
            }
        } else if (monthsWith31.includes(currMonth)) {
            if (firstDateOfWeek >= 26 && eventDate < lastDateOfWeek - 26) {
                eventDate += 31;
            }
        } else if (today.getFullYear() % 4 === 0) { // check if leap year
            if (today.getFullYear() % 400 === 0) { // leap year
                if (firstDateOfWeek >= 24 && eventDate < lastDateOfWeek - 24) {
                    eventDate += 29;
                }
            } else if (today.getFullYear() % 100 === 0) { // not leap year
                if (firstDateOfWeek >= 23 && eventDate < lastDateOfWeek - 23) {
                    eventDate += 28;
                }
            }
        } else { // not leap year, check feb
            if (firstDateOfWeek >= 23 && eventDate < lastDateOfWeek - 23) {
                eventDate += 28;
            }
        }

        return eventDate >= firstDateOfWeek && eventDate <= lastDateOfWeek;
    }

    // Handlers for clicking add and close button to display/hide pop up
    const handleDateClick = (date) => {
        const dateParts = date.split('-').map(e => parseInt(e)); // y, m, d
        dateParts[1] -= 1; // months range 0-11 so subtract 1 from real month number
        const dateObj = new Date(...dateParts);
        const dateStr = `${dateObj.toLocaleDateString("en-US", {month: "short"}, {timeZone: 'UTC'})} ${dateObj.getUTCDate()}, ${dateObj.getFullYear()}`; 

        dispatch({ type: 'field', fieldName: 'date', payload: date });
        dispatch({ type: 'field', fieldName: 'dateObj', payload: dateObj });
        dispatch({ type: 'field', fieldName: 'dateStr', payload: dateStr });

        setShowAddCalendarEventPopUp(true);
    }
    const handleClose = () => {
        setShowAddCalendarEventPopUp(false);
    }

    // Handler for adding/deleting event and updating calendar events
    const handleAddEvent = async (title, date, dateObj, dateStr) => {
        let success = false; // temporary variable to get around reducer's async functionality
        dispatch({ type: 'add', payload: {date, dateObj, title, dateStr} });

        if (isLoggedIn) {
            await apiRequest('goals', 'POST', {date, dateObj, title, dateStr}, 
            (goal) => {
                setEvents([...events, goal]);
                setEventToAdd(goal);

                dispatch({ type: 'add_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'add_error', payload: e.error });
                success = false;
            });
        } else {
            const e = {_id: fakeIdCounter, title, date, dateStr: dateStr, dateObj: new Date(date)}
            setEvents([...events, e]);
            setEventToAdd(e); 
            setFakeIdCounter(fakeIdCounter + 1);

            dispatch({ type: 'add_success' });
            success = true;
        }

        // If there's an error with the event, return right away
        if (!success) {
            return false;
        }

        // If event is in current week, add to tasks list
        if (isThisWeek(dateObj)) {
            if (isLoggedIn) {
                await apiRequest('tasks', 'POST', {description: `${title} (${dateStr})`}, 
                (task) => {
                    updateNumTasks([...tasks, task].length);
                    updateTasks([...tasks, task]);

                    dispatch({ type: 'add_success' });
                    success = true;
                }, (e) => {
                    dispatch({ type: 'add_error', payload: e.error });
                    success = false;
                });
            } else {
                const updatedTasks = [...tasks, {_id: `t-${fakeIdCounter}`, description: `${title} (${dateStr})`}]
                updateTasks(updatedTasks);
                updateNumTasks(updatedTasks.length);

                dispatch({ type: 'add_success' });
                success = true;
            }            
        }

        return success;
    }

    const handleRemoveEvent = async (eventId) => {
        dispatch({ type: 'delete' });
        let success = false; // temporary variable to get around reducer's async functionality

        const e = events.find(event => event._id === eventId);
        const updatedEvents = events.filter(event => event._id !== eventId);

        if (isLoggedIn) {
            await idApiRequest('goals', eventId, 'DELETE', {}, () => {
                const updatedEvents = events.filter(event => event._id !== eventId);
                setEvents(updatedEvents);
                setNumEvents(updatedEvents.length);
                setEventToRemove(e);

                dispatch({ type: 'delete_success' });
                success = true;
            }, (e) => {
                dispatch({ type: 'delete_error', payload: e.error });
                success = false;
            });    
        } else {
            setEvents(updatedEvents);
            setNumEvents(updatedEvents.length);
            setEventToRemove(e);

            dispatch({ type: 'delete_success' });
            success = true;
        }       

        // Remove from task table if event was this week
        if (tasks.some(task => task.description === `${e.title} (${e.dateStr})`)) {
            const taskToRemove = tasks.find(task => task.description === `${e.title} (${e.dateStr})`);

            if (isLoggedIn) {
                await idApiRequest('tasks', taskToRemove._id, 'DELETE', {}, () => {
                    const updatedTasks = tasks.filter(task => task.description !== `${e.title} (${e.dateStr})`)
                    updateTasks(updatedTasks)
                    updateNumTasks(updatedTasks.length);

                    dispatch({ type: 'delete_success' });
                    success = true;
                }, (e) => {
                    dispatch({ type: 'delete_error', payload: e.error });
                    success = false;
                });
            } else {
                const fakeTaskToRemove = tasks.find(task => task._id === `t-${eventId}`);
                const updatedTasks = tasks.filter(task => task._id !== fakeTaskToRemove._id)
                updateTasks(updatedTasks);
                updateNumTasks(updatedTasks.length);

                dispatch({ type: 'delete_success' });
                success = true;
            }
        }

        return success;
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
                <p className="f5 red b tc">{state.deleteError ? state.deleteError : ''}</p>
            </div>
            <AddCalendarEventPopUp visible={showAddCalendarEventPopUp} state={state} dispatch={dispatch} handleClose={handleClose} handleAdd={handleAddEvent} />
        </div>
    )
}

export default CalendarSection;