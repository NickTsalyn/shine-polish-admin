"use client";
import React, {useState, useEffect} from "react";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "./Calendar.css";
import Event from "./EventComponents";
import EditEventModal from "./EditEventModal";
import {Booking, CalendarEvent, CalendarComponentProps} from "@/interfaces";
import {getBookings, updateEvent, deleteEvent} from "@/helpers/api";
import {setAuthHeader} from "../../helpers/auth";
import {getBackgroundColor} from "../../helpers/colorUtils";

const CalendarComponent: React.FC<CalendarComponentProps> = ({
 defaultDate = dayjs().toDate(),
 minDate = dayjs("2024-08-01T08:00:00").toDate(),
 maxDate = dayjs("2024-08-31T16:00:00").toDate(),
 onSave,
}) => {
 const localizer = dayjsLocalizer(dayjs);

 const [view, setView] = useState<View>("month");
 const [date, setDate] = useState(dayjs().toDate());
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedEvent, setSelectedEvent] = useState<any>(null);
 const [events, setEvents] = useState<(Booking & CalendarEvent)[]>([]);

 useEffect(() => {
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQwNjRjYzk2YWFhMWVkNjQyN2NiNyIsImVtYWlsIjoiVG9tQ3J1aXNlNjlAbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRvbSBDcnVpc2UiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MjQ5NDk3MTgsImV4cCI6MTcyNTAzNjExOH0.oruSDsjVzmqSzimdr8Cx6Y5ZKek2FxhISgQ59Yy3WRk"
  );
  const fetchAndSetNewEvents = async () => {
   const bookings = await getBookings();

   if (Array.isArray(bookings)) {
    const transformedEvents = bookings.map((booking: Booking) => {
     const selectedDate = dayjs(booking.selectedDate).format("MM/DD/YYYY");
     const start = dayjs(`${selectedDate} ${booking.time}`, "MM/DD/YYYY h:mm A").toDate();
     const end = dayjs(start).add(3, "hour").toDate();
     const isRegistered = booking.email && booking.phone;

     return {
      ...booking,
      id: String(booking._id),
      title: `${booking.name} ${booking.surname}`,
      start,
      end,
      backgroundColor: getBackgroundColor(`${booking.name} ${booking.surname}`),
      textColor: isRegistered ? "#fff" : "#000",
     };
    });
    setEvents(transformedEvents);
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  };
  fetchAndSetNewEvents();
 }, []);

 const handleSelectEvent = (event: Booking & CalendarEvent) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
 };

 //  const handleSave = async (updatedEvent: any) => {
 //   // Оновлюємо подію у backend
 //   try {
 //    await updateEvent(updatedEvent.id, updatedEvent);
 //    // Оновлюємо стан подій у CalendarComponent
 //    const updatedEvents = events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
 //    setEvents(updatedEvents);
 //    setIsModalOpen(false); // Закриваємо модальне вікно
 //   } catch (error) {
 //    console.error("Error updating event:", error);
 //   }
 //  };

 const handleSave = (updatedEvent: Booking & CalendarEvent) => {
  console.log("Handling save for event:", updatedEvent);
  setEvents((prevEvents) =>
   prevEvents.map((event) => (event.id === updatedEvent.id ? {...event, ...updatedEvent} : event))
  );
 };
 //  const handleSave = (updatedEvent: Booking & CalendarEvent) => {
 //   setEvents((prevEvents) =>
 //    prevEvents.map((event) => (event.id === updatedEvent.id ? {...event, ...updatedEvent} : event))
 //   );
 //  };

 const handleDeleteEvent = async (eventId: string) => {
  try {
   await deleteEvent(eventId);
   setEvents((prevState) => prevState.filter((event) => event.id !== eventId));
   setIsModalOpen(false);
  } catch (error) {
   console.error("Error deleting event:", error);
  }
 };

 const handleOpenModal = (event: Booking & CalendarEvent) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
 };

 const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedEvent(null);
 };

 return (
  <div className=" h-[600px] w-[300px] md:h-[800px] md:min-w-[748px] lg:w-[980px] xl:w-[1400px] mx-auto">
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
    components={{
     event: Event,
    }}
    onSelectEvent={handleSelectEvent}
   />
   {selectedEvent && (
    <EditEventModal
     open={isModalOpen}
     onClose={() => setIsModalOpen(false)}
     event={selectedEvent}
     start={dayjs(selectedEvent.start).format("MM/DD/YYYY")}
     end={dayjs(selectedEvent.end).format("MM/DD/YYYY")}
     onSave={handleSave}
     onDelete={() => handleDeleteEvent(selectedEvent.id)}
    />
   )}
  </div>
 );
};

export default CalendarComponent;
