"use client";
import React from "react";
import {signin} from "@/helpers/api";
import {useEffect} from "react";
import ClientCardList from "@/components/ClientCard/ClientCardList";
import CalendarComponent from "@/components/Calendar/CalendarComponent";

export default function Home() {
 const [events, setEvents] = React.useState([]);

 useEffect(() => {
  signin({email: "AlvaroCapibaraTESTER@mail.com", password: "qwerty123"});
 }, []);

 function updateEvent(updateEvent: any): void {
  throw new Error("Function not implemented.");
 }

 function deleteEvent(eventId: number): void {
  throw new Error("Function not implemented.");
 }
 return (
  <div className="py-5 md:p-7 lg:py-20">
   <h1 className="text-2xl font-medium text-center text-accent">Home</h1>
   <div className="flex flex-col lg:flex-row">
    {/* <ClientCard /> */}
    <ClientCardList />
    <CalendarComponent
     events={events}
     onUpdateEvent={updateEvent}
     onDeleteEvent={deleteEvent}
    />
   </div>
  </div>
 );
}
