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

const Calendar = ({events, handleDateClick}) => {
  const calRef=useRef(null)

  // Handler for when a date is clicked, which passes date to parent
  const handleClick = (info) => {
    handleDateClick(info.dateStr);
  }

  // Use Calendar API to add event to calendar every time the array of events gets bigger
  useEffect(() => {
    if (calRef.current) {
      calRef.current.getApi().addEvent(events[events.length - 1])
    }
  }, [events.length])

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