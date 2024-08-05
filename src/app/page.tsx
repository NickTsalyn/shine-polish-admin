"use client";
import axios from "axios";
import {useEffect, useState} from "react";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import {events} from "./data/date-bookings";

interface Event {
 id: number;
 title: string;
 start: Date;
 end: Date;
 email: string;
 phone: string;
 address: any;
 areas: any;
 selectedDate: string;
 time: string;
 backgroundColor: string;
 textColor: string;
}

const getData = async () => {
 try {
  const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
  return response.data;
 } catch (error) {
  console.error(error);
 }
};
const transformBookingToEvent = (bookings: Array<any>) => {
 return bookings.map((booking: any) => {
  const start = new Date(`${booking.selectedDate}T${booking.time}`);
  const end = new Date(start.getTime() + 60 * 60 * 3000);
  return {
   id: Number(booking.id),
   title: `${booking.name} ${booking.surname}`,
   start,
   end,
   email: booking.email,
   phone: booking.phone,
   address: booking.address,
   areas: booking.areas,
   selectedDate: booking.selectedDate,
   time: booking.time,
   backgroundColor: booking.backgroundColor,
   textColor: booking.textColor,
  };
 });
};

export default function Home() {
 const [result, setResult] = useState([]);
 const [events, setEvents] = useState<Event[]>([]);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
    console.log(response.data);

    const bookingsArray = response.data.bookings || response.data;

    const transformedEvent = transformBookingToEvent(bookingsArray);
    setResult(response.data);
    setEvents(transformedEvent);
    // const areas = response.data.areaOptions;
    return response.data;
    // console.log(areas)
   } catch (error) {
    console.error(error);
   }
  };

  fetchData();
  // console.log(data)
 }, []);

 //   useEffect(() => {
 // 	console.log(data);
 //   }, [data]);

 console.log(result);

 const transformBookingToEvent = (bookings: Array<any>) => {
  return bookings.map((booking: any) => {
   const start = new Date(`${booking.selectedDate}T${booking.time}`);
   const end = new Date(start.getTime() + 60 * 60 * 3000);
   return {
    id: booking.id,
    title: `${booking.name} ${booking.surname}`,
    start,
    end,
    email: booking.email,
    phone: booking.phone,
    address: booking.address,
    areas: booking.areas,
    selectedDate: booking.selectedDate,
    time: booking.time,
    backgroundColor: booking.backgroundColor,
    textColor: booking.textColor,
   };
  });
 };

 const updateEvent = async (updatedEvent: any) => {
  try {
   await axios.put(`https://shine-polish-server.onrender.com/bookings/${updatedEvent.id}`, updatedEvent);
   setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  } catch (error) {
   console.error(error);
  }
 };
 const deleteEvent = async (eventId: number) => {
  try {
   await axios.delete(`https://shine-polish-server.onrender.com/bookings/${eventId}`);
   setEvents(events.filter((event) => event.id !== eventId));
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <div>
   <h1>Hello Admin page</h1>
   <form>
    <input
     type="text"
     className=" border border-s-orange-500"
    />
    <input
     type="text"
     className=" border border-s-orange-500"
    />
    <button type="submit">Submit</button>
   </form>
   <CalendarComponent
    events={events}
    onUpdateEvent={updateEvent}
    onDeleteEvent={deleteEvent}
   />
   <ul></ul>
  </div>
 );
}
