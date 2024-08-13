"use client";

import * as React from "react";
import SignInForm from "@/components/SignInForm";
import CalendarComponent from "@/components/Calendar/CalendarComponent";

export default function App() {
 const [events, setEvents] = React.useState<Event[]>([]);
 function updateEvent(updateEvent: any): void {
  throw new Error("Function not implemented.");
 }

 function deleteEvent(eventId: number): void {
  throw new Error("Function not implemented.");
 }

 return (
  <div className="py-5 md:p-7 lg:py-20">
   <SignInForm />
   <CalendarComponent
    events={events}
    onUpdateEvent={updateEvent}
    onDeleteEvent={deleteEvent}
   />
  </div>
 );
}
