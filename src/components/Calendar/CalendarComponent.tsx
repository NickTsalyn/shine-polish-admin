"use client";
import React, {useState, useEffect} from "react";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "./Calendar.css";
import Event from "./EventComponents";
import EditEventModal from "./EditEventModal";
import {Booking, CalendarEvent, CalendarComponentProps, UpdateEventPayload} from "@/interfaces";
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
 const fetchAndSetNewEvents = async () => {
  try {
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
  } catch (error) {
   console.error("Error fetching bookings:", error);
  }
 };
 useEffect(() => {
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQwNjRjYzk2YWFhMWVkNjQyN2NiNyIsImVtYWlsIjoiVG9tQ3J1aXNlNjlAbWFpbC5jb20iLCJ1c2VybmFtZSI6IlRvbSBDcnVpc2UiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MjUwMzQ3MTgsImV4cCI6MTcyNTEyMTExOH0.G0RtOzXdgnqpxYV31Rd8O6EM9MRNBjkKJXT-3iBqDkY"
  );
  fetchAndSetNewEvents();
 }, []);
 const handleSelectEvent = (event: Booking & CalendarEvent) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
 };
 const handleSave = async (updatedEvent: Booking & CalendarEvent) => {
  try {
   const address = typeof updatedEvent.address === "string" ? JSON.parse(updatedEvent.address) : updatedEvent.address;
   if (!updatedEvent._id) {
    throw new Error("Event ID is undefined");
   }
   const eventPayload: UpdateEventPayload = {
    _id: updatedEvent._id,
    selectedDate: dayjs(updatedEvent.selectedDate).format("YYYY-MM-DD"),
    time: dayjs(updatedEvent.time).format("HH:mm"),
    endDate: dayjs(updatedEvent.endDate).format("YYYY-MM-DD"),
    area: updatedEvent.area,
    bedroom: updatedEvent.bedroom,
    bathroom: updatedEvent.bathroom,
    extras: updatedEvent.extras,
    service: updatedEvent.service,
    frequency: updatedEvent.frequency,
    aboutUs: updatedEvent.aboutUs,
    specialInstructions: updatedEvent.specialInstructions,
    homeAccess: updatedEvent.homeAccess,
    tips: updatedEvent.tips,
    discountCode: updatedEvent.discountCode,
    totalPrice: updatedEvent.totalPrice,
    email: "",
    name: "",
    surname: "",
    phone: "",
    address: address,
   };
   if (!updatedEvent._id) {
    throw new Error("Event ID is undefined");
   }
   await updateEvent(updatedEvent._id, eventPayload);
   await fetchAndSetNewEvents();
  } catch (error) {
   console.error("Error updating event:", error);
   await fetchAndSetNewEvents();
  }
 };
 const handleDeleteEvent = async (eventId: string) => {
  try {
   await deleteEvent(eventId);
   setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
   setIsModalOpen(false);
  } catch (error) {
   console.error("Error deleting event:", error);
   await fetchAndSetNewEvents();
  }
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
