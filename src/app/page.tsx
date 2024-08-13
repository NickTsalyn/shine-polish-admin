"use client";
import axios from "axios";
import {useEffect, useState} from "react";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import ClientCard from "@/components/ClientCard/ClientCard";
import ClientCardList from "@/components/ClientCard/ClientCardList";

const getData = async () => {
 try {
  const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
  return response.data;
 } catch (error) {
  console.error(error);
 }
};

export default function Home() {
 const [result, setResult] = useState([]);
 const [events, setEvents] = useState<Event[]>([]);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
    // console.log(response.data);

    setResult(response.data);
    // setEvents(transformedEvent);

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

 //  console.log(result);

 function updateEvent(updateEvent: any): void {
  throw new Error("Function not implemented.");
 }

 function deleteEvent(eventId: number): void {
  throw new Error("Function not implemented.");
 }

 return (
  <div className="container mx-auto  py-5">
   <h1>Hello Admin page</h1>
   {/* <form>
    <input
     type="text"
     className=" border border-s-orange-500"
    />
    <input
     type="text"
     className=" border border-s-orange-500"
    />
    <button type="submit">Submit</button>
   </form> */}
   <div className="flex flex-col lg:flex-row">
    {/* <ClientCard /> */}
    <ClientCardList />
    <CalendarComponent
     events={events}
     onUpdateEvent={updateEvent}
     onDeleteEvent={deleteEvent}
    />
   </div>

   <ul></ul>
  </div>
 );
}
