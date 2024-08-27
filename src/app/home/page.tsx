"use client";
import React from "react";
import {signin} from "@/helpers/api";
import {useEffect} from "react";
import ClientCardList from "@/components/ClientCard/ClientCardList";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import {Booking, CalendarEvent} from "@/interfaces";

export default function Home() {
 const [events, setEvents] = React.useState([]);

 useEffect(() => {
  signin({email: "AlvaroCapibaraTESTER@mail.com", password: "qwerty123"});
 }, []);

 function updateEvent(): void {
  throw new Error("Function not implemented.");
 }

 function handleSave(): void {
  throw new Error("Function not implemented.");
 }

 function handleDeleteEvent(eventId: string): void {
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
     onDeleteEvent={handleDeleteEvent}
     onSave={handleSave}
    />
   </div>
  </div>
 );
}
