"use client";
import React, {useState, useEffect} from "react";
import {Calendar, dayjsLocalizer, View} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "./Calendar.css";
import Event from "./EventComponents";
import EditEventModal from "./EditEventModal";
import {Booking, CalendarEvent, CalendarComponentProps, UpdateEventPayload} from "../../types/interfaces";
import {getBookings, updateEvent, deleteEvent} from "@/helpers/api";
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
     const startTime = dayjs(`${selectedDate} ${booking.time}`, "MM/DD/YYYY h:mm A");
     const endTime = dayjs(`${booking.endDate} ${booking.endTime}`, "MM/DD/YYYY h:mm A");
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
  fetchAndSetNewEvents();
 }, []);
 const handleSelectEvent = (event: Booking & CalendarEvent) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
 };

 //  const handleSelectEvent = (event: Booking & CalendarEvent) => {
 //     const existingEvent = events.find((e) => {
 //       return (
 //         dayjs(e.start).format("YYYY-MM-DD HH:mm") ===
 //         dayjs(event.start).format("YYYY-MM-DD HH:mm")
 //       );
 //     });
 //     if (existingEvent) {
 //       console.log("Подія вже існує на цій даті і часі");
 //       // Ви можете показати повідомлення користувачеві про те, що подія вже існує
 //       enqueueSnackbar("Подія вже існує на цій даті і часі", { variant: "error" });
 //     } else {
 //       setSelectedEvent(event);
 //       setIsModalOpen(true);
 //     }
 //   };

 const handleSaveEvent = async (eventData: UpdateEventPayload) => {
  try {
   const updatedEvent = {
    ...eventData,
    selectedDate: dayjs(eventData.selectedDate).format("MM/DD/YYYY"),
    endDate: dayjs(eventData.endDate).format("MM/DD/YYYY"),
    time: dayjs(eventData.time).format("h:mm A"),
    endTime: dayjs(eventData.endTime).format("h:mm A"),
   };

   await updateEvent(updatedEvent._id, updatedEvent);

   await fetchAndSetNewEvents();
   setIsModalOpen(false);
  } catch (error) {
   console.error("Error updating event:", error);
  }
 };

 //  const handleDayPropGetter = (date: any) => {
 //   const existingEvent = events.find((e) => {
 //    return dayjs(e.start).format("MM/DD/YYYY") === dayjs(date).format("MM/DD/YYYY");
 //   });
 //   if (existingEvent) {
 //    return {className: "rbc-off"};
 //   }
 //   return {};
 //  };
 //  const handleSave = async (updatedEvent: Booking & CalendarEvent) => {
 //   try {
 //    const address = typeof updatedEvent.address === "string" ? JSON.parse(updatedEvent.address) : updatedEvent.address;
 //    if (!updatedEvent._id) {
 //     throw new Error("Event ID is undefined");
 //    }
 //    const eventPayload: UpdateEventPayload = {
 //     _id: updatedEvent._id,
 //     selectedDate: dayjs(updatedEvent.selectedDate).format("YYYY-MM-DD"),
 //     time: dayjs(updatedEvent.time).format("HH:mm"),
 //     endDate: dayjs(updatedEvent.endDate).format("YYYY-MM-DD"),
 //     endTime: dayjs(updatedEvent.time).format("HH:mm"),
 //     area: updatedEvent.area,
 //     bedroom: updatedEvent.bedroom,
 //     bathroom: updatedEvent.bathroom,
 //     extras: updatedEvent.extras,
 //     service: updatedEvent.service,
 //     frequency: updatedEvent.frequency,
 //     aboutUs: updatedEvent.aboutUs,
 //     specialInstructions: updatedEvent.specialInstructions,
 //     homeAccess: updatedEvent.homeAccess,
 //     tips: updatedEvent.tips,
 //     discountCode: updatedEvent.discountCode,
 //     totalPrice: updatedEvent.totalPrice,
 //     email: "",
 //     name: "",
 //     surname: "",
 //     phone: "",
 //     address: address,
 //    };
 //    if (!updatedEvent._id) {
 //     throw new Error("Event ID is undefined");
 //    }
 //    await updateEvent(updatedEvent._id, eventPayload);
 //    await fetchAndSetNewEvents();
 //   } catch (error) {
 //    console.error("Error updating event:", error);
 //    await fetchAndSetNewEvents();
 //   }
 //  };
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
     dayHeaderFormat: (date) => dayjs(date).format("MM/DD/YYYY"),
    }}
    components={{
     event: Event,
    }}
    onSelectEvent={handleSelectEvent}
    // dayPropGetter={handleDayPropGetter}
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
