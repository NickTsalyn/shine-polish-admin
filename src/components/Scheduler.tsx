"use client";
import FullCandar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
const ScheduleComponent = () => {
 return (
  <div>
   <p>Scheduler</p>
   <FullCandar
    plugins={[resourceTimelinePlugin, dayGridPlugin, timeGridPlugin]}
    headerToolbar={{
     left: "prev,next today",
     center: "title",
     right: "dayGridMonth,timeGridWeek,timeGridDay",
    }}
    initialView="resourceTimelineDay"
    nowIndicator={true}
    editable={true}
    selectable={true}
    selectMirror={true}
    resources={[
     {id: "a", title: "Auditorium A"},
     {id: "b", title: "Auditorium B", eventColor: "green"},
     {id: "c", title: "Auditorium C", eventColor: "orange"},
    ]}
    initialEvents={[
     {id: "1", resourceId: "a", title: "event 1"},
     {id: "2", resourceId: "b", title: "event 2"},
     {id: "3", resourceId: "c", title: "event 3"},
    ]}
    eventContent={(eventInfo) => {
     return (
      <>
       <b>{eventInfo.timeText}</b>
       <i>{eventInfo.event.title}</i>
      </>
     );
    }}
   />
  </div>
 );
};
export default ScheduleComponent;
