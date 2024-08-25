"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs, {Dayjs} from "dayjs";
import "./Calendar.css";
import Event from "./EventComponents";
import EditEventModal from "./EditEventModal";
import {BookingEvent, CalendarComponentProps} from "@/interfaces";
import {getBookings} from "@/helpers/api";

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
     const backgroundColor = isRegistered ? "#c1f3d5" : "#FF99C8";

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
      backgroundColor,
      textColor: isRegistered ? "#000" : "#fff",
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

 const handleSaveEvent = (updatedEvent: BookingEvent) => {
  setEvents((prevEvents) => {
   return prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
  });
  setIsModalOpen(false);
 };

 const handleDeleteEvent = (eventId: number) => {
  console.log("Deleting event with id:", eventId);
  setEvents((prevState) => prevState.filter((event) => event.id !== eventId));
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
     onDelete={() => handleDeleteEvent(selectedEvent?.id)}
    />
   )}
  </div>
 );
};

export default CalendarComponent;
