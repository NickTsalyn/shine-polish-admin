"use client";
import React, {useState} from "react";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import {events} from "../../app/data/date-bookings";
import "./Calendar.css";
import {components} from "./BookingEventComponent";

interface CalendarComponentProps {
 defaultDate?: Date;
 defaultView?: string;
 minDate?: Date;
 maxDate?: Date;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
 defaultDate = dayjs().toDate(),
 minDate = dayjs("2024-08-01T08:00:00").toDate(),
 maxDate = dayjs("2024-08-31T16:00:00").toDate(),
}) => {
 const localizer = dayjsLocalizer(dayjs);

 const [view, setView] = useState<View>("month");
 const [date, setDate] = useState(dayjs().toDate());

 return (
  <div className="p-4 h-[600px] w-[300px] md:h-[800px] md:w-[680px] lg:w-[980px] xl:w-[1400px] mx-auto">
   <Calendar
    localizer={localizer}
    events={events}
    view={view}
    date={date}
    toolbar={true}
    onNavigate={(newDate) => setDate(newDate)}
    onView={(newView) => setView(newView)}
    defaultView="month"
    defaultDate={defaultDate}
    min={minDate}
    max={maxDate}
    formats={{
     dayHeaderFormat: (date) => dayjs(date).format("dd-MMMM-yyyy"),
    }}
    components={components}
   />
  </div>
 );
};

export default CalendarComponent;

// import React, { useState } from "react";
// import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import dayjs from "dayjs";
// import { events as initialEvents } from "../../app/data/date-bookings";
// import "./Calendar.css";
// import { components } from "./BookingEventComponent";
// import BasicModal from "./BasicModal"; // Import the BasicModal component

// const CalendarComponent = () => {
//   const localizer = dayjsLocalizer(dayjs);

//   const [events, setEvents] = useState(initialEvents);
//   const [view, setView] = useState<View>("month");
//   const [date, setDate] = useState(dayjs().toDate());
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setIsModalOpen(true);
//   };

//   const handleAddEvent = () => {
//     setSelectedEvent(null);
//     setIsModalOpen(true);
//   };

//   const handleSaveEvent = (event) => {
//     if (selectedEvent) {
//       setEvents((prevEvents) =>
//         prevEvents.map((ev) => (ev.id === selectedEvent.id ? event : ev))
//       );
//     } else {
//       setEvents((prevEvents) => [...prevEvents, { ...event, id: prevEvents.length + 1 }]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleDeleteEvent = () => {
//     setEvents((prevEvents) =>
//       prevEvents.filter((ev) => ev.id !== selectedEvent.id)
//     );
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-4 h-[500px] w-[800px]">
//       <button onClick={handleAddEvent} className="mb-4 p-2 bg-blue-500 text-white">
//         Add Event
//       </button>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         view={view}
//         date={date}
//         toolbar={true}
//         onNavigate={(newDate) => setDate(newDate)}
//         onView={(newView) => setView(newView)}
//         defaultView="month"
//         min={dayjs("2024-08-01T08:00:00").toDate()}
//         max={dayjs("2024-08-31T16:00:00").toDate()}
//         formats={{
//           dayHeaderFormat: (date) => dayjs(date).format("dd-MMMM-yyyy"),
//         }}
//         components={components}
//         onSelectEvent={handleSelectEvent}
//       />
//       <BasicModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div>
//           <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
//           <input
//             type="text"
//             value={selectedEvent ? selectedEvent.title : ""}
//             onChange={(e) =>
//               setSelectedEvent((prev) => ({ ...prev, title: e.target.value }))
//             }
//             placeholder="Event Title"
//             className="block w-full mb-4 p-2 border"
//           />
//           <label>Start:</label>
//           <input
//             type="datetime-local"
//             value={selectedEvent ? dayjs(selectedEvent.start).format("YYYY-MM-DDTHH:mm") : ""}
//             onChange={(e) =>
//               setSelectedEvent((prev) => ({ ...prev, start: dayjs(e.target.value).toDate() }))
//             }
//             className="block w-full mb-4 p-2 border"
//           />
//           <label>End:</label>
//           <input
//             type="datetime-local"
//             value={selectedEvent ? dayjs(selectedEvent.end).format("YYYY-MM-DDTHH:mm") : ""}
//             onChange={(e) =>
//               setSelectedEvent((prev) => ({ ...prev, end: dayjs(e.target.value).toDate() }))
//             }
//             className="block w-full mb-4 p-2 border"
//           />
//           <div className="flex justify-between">
//             <button
//               onClick={() => handleSaveEvent(selectedEvent)}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Save
//             </button>
//             {selectedEvent && (
//               <button
//                 onClick={handleDeleteEvent}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             )}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="px-4 py-2 rounded border"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </BasicModal>
//     </div>
//   );
// };

// export default CalendarComponent;
