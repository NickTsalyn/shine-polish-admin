"use client";
import React, {useState, useEffect} from "react";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "./Calendar.css";
import Event from "./EventComponents";
import EditEventModal from "./EditEventModal";
import {Booking, CalendarEvent, CalendarComponentProps} from "../../types/interfaces";
import {getBookings, updateEvent, deleteEvent} from "@/helpers/api";
import {getBackgroundColor} from "../../helpers/colorUtils";
import {Form} from "@/types/types";
import {useSnackbar} from "notistack";

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
 const {enqueueSnackbar} = useSnackbar();

 const transformBookingToEvent = (booking: Booking): Booking & CalendarEvent => {
  const selectedDate = dayjs(booking.selectedDate).format("MM/DD/YYYY");
  const startTime = dayjs(`${selectedDate} ${booking.time}`, "MM/DD/YYYY h:mm A");
  //   const endTime = booking.endDate
  //    ? dayjs(`${booking.endDate} ${booking.endTime}`, "MM/DD/YYYY h:mm A")
  //    : startTime.add(3, "hour");
  const endTime =
   dayjs(startTime).add(3, "hour") ?? dayjs(`${booking.endDate} ${booking.endTime}`, "MM/DD/YYYY h:mm A");
  const isRegistered = booking.email && booking.phone;

  return {
   ...booking,
   id: String(booking._id),
   title: `${booking.name} ${booking.surname}`,
   start: startTime.toDate(),
   end: endTime.toDate(),
   backgroundColor: getBackgroundColor(`${booking.name} ${booking.surname}`),
   textColor: isRegistered ? "#fff" : "#000",
  };
 };

 const fetchAndSetNewEvents = async () => {
  try {
   const bookings = await getBookings();
   if (Array.isArray(bookings)) {
    const transformedEvents = bookings.map(transformBookingToEvent);
    setEvents(transformedEvents);
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  } catch (error) {
   console.error("Error fetching bookings:", error);
  }
 };

 useEffect(() => {
  fetchAndSetNewEvents();
 }, []);
 const handleSelectEvent = (event: Booking & CalendarEvent) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
 };

 const handleSaveEvent = async (eventData: Form) => {
  if (!eventData._id) {
   console.error("Event ID is missing. Cannot update event.");
   enqueueSnackbar("Error updating event: Event ID is missing.", {variant: "error"});
   return;
  }
  const updatedEventData = {
   email: eventData.email,
   name: eventData.name,
   surname: eventData.surname,
   phone: eventData.phone,
   address: {
    city: eventData.address?.city || "",
    street: eventData.address?.street || "",
    aptSuite: eventData.address?.aptSuite || "",
    zip: eventData.address?.zip || "",
    state: eventData.address?.state || "",
   },
   area: eventData.area || "",
   selectedDate: dayjs(eventData.selectedDate).format("MM/DD/YYYY"),
   endDate: dayjs(eventData.endDate).format("MM/DD/YYYY"),
   time: dayjs(eventData.time).format("h:mm A"),
   endTime: dayjs(eventData.endTime).format("h:mm A"),
   bedroom: eventData.bedroom || 0,
   bathroom: eventData.bathroom || 0,
   extras: eventData.extras || [],
   service: eventData.service || "",
   frequency: eventData.frequency || "",
   aboutUs: eventData.aboutUs || "",
   specialInstructions: eventData.specialInstructions || "",
   homeAccess: eventData.homeAccess || "",
   tips: eventData.tips || "",
   totalPrice: eventData.totalPrice || 0,
  };

  try {
   await updateEvent(eventData._id, updatedEventData);
   console.log("Event updated successfully!");
   enqueueSnackbar("Event updated successfully", {variant: "success"});

   fetchAndSetNewEvents();

   if (onSave) {
    onSave(updatedEventData);
   }
  } catch (error) {
   console.error("Error updating event:", error);
   enqueueSnackbar("Error updating event", {variant: "error"});
  }
 };
 const handleDeleteEvent = async (eventId: string) => {
  if (!eventId) return;
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
     dayHeaderFormat: (date) => dayjs(date).format("MM/DD/YYYY"),
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
     onSave={handleSaveEvent}
     onDelete={() => handleDeleteEvent(selectedEvent.id)}
    />
   )}
  </div>
 );
};
export default CalendarComponent;
