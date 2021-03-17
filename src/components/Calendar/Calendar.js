import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Calendar.css';

const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}



const Calendar = ({events}) => {
    const handleDateClick = (info) => {
        alert(`you clicked ${info.dateStr}`)
    }

    
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        events={events}
        eventColor={"white"}
        eventBackgroundColor={"transparent"}
        // eventDisplay={"auto"}
        dateClick={handleDateClick}
      />
    )
}

export default Calendar;