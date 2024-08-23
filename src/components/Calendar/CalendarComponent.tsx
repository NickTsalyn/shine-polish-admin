"use client";
import React, {useState, useEffect} from "react";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "./Calendar.css";
import Event from "./EventComponents";
import EditEventModal from "./EditEventModal";
import {Booking, BookingEvent, CalendarComponentProps} from "@/interfaces";
import {getBookings, updateEvent, deleteEvent} from "@/helpers/api";
import {setAuthHeader} from "../../helpers/auth";
// import {fetchEvents} from "../../helpers/api";
import {getBackgroundColor} from "../../helpers/colorUtils";

const CalendarComponent: React.FC<CalendarComponentProps> = ({
 defaultDate = dayjs().toDate(),
 minDate = dayjs("2024-08-01T08:00:00").toDate(),
 maxDate = dayjs("2024-08-31T16:00:00").toDate(),
 //  onUpdateEvent,
 //  onDeleteEvent,
}) => {
 const localizer = dayjsLocalizer(dayjs);

 const [view, setView] = useState<View>("month");
 const [date, setDate] = useState(dayjs().toDate());
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedEvent, setSelectedEvent] = useState<any>(null);
 const [events, setEvents] = useState<BookingEvent[]>([]);

 useEffect(() => {
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQwNjRjYzk2YWFhMWVkNjQyN2NiNyIsImVtYWlsIjoiVG9tQ3J1aXNlNjlAbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRvbSBDcnVpc2UiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MjQ0MjU0MDgsImV4cCI6MTcyNDUxMTgwOH0.8uEECuFpDXRn3bhcBaIsHCRSg7gzkMlTiaspuQuoAkQ"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   console.log("Bookings:", bookings);
   if (Array.isArray(bookings)) {
    const transformedEvents = bookings.map((booking) => {
     const selectedDate = dayjs(booking.selectedDate).format("MM/DD/YYYY");
     const start = dayjs(`${selectedDate} ${booking.time}`, "MM/DD/YYYY h:mm A").toDate();
     //  console.log("Start:", start);
     const end = dayjs(start).add(3, "hour").toDate();
     //  console.log("End:", end);
     const isRegistered = booking.email && booking.phone;

     return {
      id: booking._id,
      title: `${booking.name} ${booking.surname}`,
      start,
      end,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
      areas: booking.areas,
      selectedDate: booking.selectedDate,
      time: booking.time,
      backgroundColor: getBackgroundColor(`${booking.name} ${booking.surname}`),
      textColor: isRegistered ? "#fff" : "#000",
     };
    });
    setEvents(transformedEvents);
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  };
  fetchData();
 }, []);

 const handleSelectEvent = (event: any) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
  console.log("Selected event:", event);
 };

 //  const handleSaveEvent = (updatedEvent: BookingEvent) => {
 //   setEvents((prevEvents) => {
 //    return prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
 //   });
 //   setIsModalOpen(false);
 //  };

 //  const handleDeleteEvent = (eventId: string) => {
 //   console.log("Deleting event with id:", eventId);
 //   setEvents((prevState) => prevState.filter((event) => event.id !== eventId || []));
 //  };

 //  const openEditModal = (event: Booking) => {
 //   setSelectedEvent(event);
 //   setIsModalOpen(true);
 //   console.log("Opening modal for event:", event);
 //  };
 const handleSaveEvent = async (updatedEvent: BookingEvent) => {
  try {
   await updateEvent(updatedEvent); // Оновлення на сервері через API
   setEvents((prevEvents) => prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
   setIsModalOpen(false);
  } catch (error) {
   console.error("Error updating event:", error);
  }
 };

 const handleDeleteEvent = async (eventId: string) => {
  try {
   await deleteEvent(eventId); // Видалення з сервера через API
   setEvents((prevState) => prevState.filter((event) => event.id !== eventId));
   setIsModalOpen(false);
  } catch (error) {
   console.error("Error deleting event:", error);
  }
 };

 return (
  <div className="p-4 h-[600px] w-[300px] md:h-[800px] md:min-w-[748px] lg:w-[980px] xl:w-[1400px] mx-auto">
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
     onSave={handleSaveEvent}
     onDelete={() => handleDeleteEvent(selectedEvent.id)}
    />
   )}
  </div>
 );
};

export default CalendarComponent;
