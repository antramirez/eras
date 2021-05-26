import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import { useEffect, useRef } from 'react';

const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}

const Calendar = ({events, eventToAdd = {}, eventToRemove = {}, handleAdd, handleRemove, handleDateClick}) => {
  const calRef=useRef(null)

  // Handler for when a date is clicked, which passes date to parent
  const handleClick = (info) => {
    const dateFormatted = `${info.date.toLocaleDateString("en", {month: "short"})} ${info.date.getDate()}, ${info.date.getFullYear()}`;
    handleDateClick(info.dateStr, dateFormatted, info.date);
  }

  // Use Calendar API to add or remove event to calendar every time the array of events changes
  useEffect(() => {
    if (calRef.current) {
      // Remove event object if there is one to remove
      if (Object.keys(eventToRemove).length !== 0) {
        // There is no public remove single event method, so remove all and add back remaining ones
        calRef.current.getApi().removeAllEvents();
        events.forEach((e) => {
            calRef.current.getApi().addEvent(e);
        })

        // clear events to add and remove
        handleAdd();
        handleRemove();
      }

      // Add event object if there is one to add
      if (Object.keys(eventToAdd).length !== 0) {
        calRef.current.getApi().addEvent(eventToAdd);

        // clear events to add and remove
        handleAdd();
        handleRemove();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventToAdd, eventToRemove])

  return (
    <FullCalendar
      ref={calRef}
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      eventContent={renderEventContent}
      events={events}
      eventColor={"white"}
      eventBackgroundColor={"transparent"}
      eventDisplay={"auto"}
      dateClick={handleClick}
    />
  )
}

export default Calendar;