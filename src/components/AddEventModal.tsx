// "use client";
// import React from "react";
// import dayjs from "dayjs";
// import BasicModal from "./UI/Modal";
// import {events} from "../app/data/date-bookings";
// import {DateTimePicker} from "@mui/x-date-pickers";

// export default function AddEventModal() {
//  const [isModalOpen, setIsModalOpen] = React.useState(false);
//  const [selectedEvent, setSelectedEvent] = React.useState(null);
//  const [date, setDate] = React.useState(dayjs().toDate());
//  const [events, setEvents] = React.useState([]);

//  const handleSaveEvent = (event) => {
//   if (selectedEvent) {
//    setEvents((prevEvents) => prevEvents.map((ev) => (ev.id === selectedEvent.id ? event : ev)));
//   } else {
//    setEvents((prevEvents) => [...prevEvents, {...event, id: prevEvents.length + 1}]);
//   }
//   setIsModalOpen(false);
//  };
//  const handleDeleteEvent = () => {
//   setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== selectedEvent.id));
//   setIsModalOpen(false);
//  };
//  return (
//   <div>
//    <BasicModal
//     open={isModalOpen}
//     onClose={() => setIsModalOpen(false)}
//    >
//     <div>
//      <h2>titleEvent</h2>
//      <p>description</p>
//      <label>Start:</label>
//      <DateTimePicker
//       value={value}
//       onChange={setValue}
//       referenceDate={dayjs("2022-04-17T15:30")}
//      />
//      <label>End:</label>
//      <DateTimePicker
//       value={value}
//       onChange={setValue}
//       referenceDate={dayjs("2022-04-17T15:30")}
//      />
//      {/* <button>add</button> */}
//      <button type="button">edit event</button>
//      <button
//       type="button"
//       onClick={handleDeleteEvent}
//      >
//       delete event
//      </button>
//      <button
//       type="button"
//       onClick={() => setIsModalOpen(false)}
//      >
//       Cancel
//      </button>
//      <button
//       onClick={() => handleSaveEvent(selectedEvent)}
//       className="bg-blue-500 text-white px-4 py-2 rounded"
//      >
//       Save
//      </button>
//     </div>
//    </BasicModal>
//   </div>
//  );
// }
