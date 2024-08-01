"use client";
import React, {useMemo} from "react";
import clsx from "clsx";
import {eachDayOfInterval, endOfMonth, format, getDay, isSameDay, isToday, startOfMonth} from "date-fns";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
 date: Date;
 title: string;
}

interface SchedulerProps {
 events: Event[];
}

const Scheduler = ({events}: SchedulerProps) => {
 const currentDate = new Date();
 const firsDateOfMouth = startOfMonth(currentDate);
 const lastDateOfMounth = endOfMonth(currentDate);

 const daysInMounth = eachDayOfInterval({start: firsDateOfMouth, end: lastDateOfMounth});
 const startingDayIndex = getDay(firsDateOfMouth);
 const eventsByDate = useMemo(() => {
  return events.reduce((acc: {[key: string]: Event[]}, event) => {
   const dateKey = format(event.date, "yyyy-MM-dd");
   if (!acc[dateKey]) {
    acc[dateKey] = [];
   }
   acc[dateKey].push(event);
   return acc;
  }, {});
 }, [events]);
 return (
  <div className="p-4 mx-auto">
   <h2 className="text-2xl font-bold text-center mb-4 text-accent">{format(currentDate, "d MMMM yyyy")}</h2>
   <div className="grid grid-cols-7 gap-2">
    {WEEKDAYS.map((day) => {
     return (
      <div
       key={day}
       className="text-center border border-s-orange-500"
      >
       {day}
      </div>
     );
    })}
    {Array.from({length: startingDayIndex}).map((_, index) => {
     return (
      <div
       key={`empty-${index}`}
       className="border border-s-orange-500 text-center rounded-xl p-2"
      />
     );
    })}
    {daysInMounth.map((day, index) => {
     const dateKey = format(day, "yyyy-MM-dd");
     const todayEvents = eventsByDate[dateKey] || [];

     return (
      <div
       key={index}
       className={clsx("border border-s-orange-500 text-center rounded-xl p-2", {
        "bg-orange-500": isToday(day),
        "text-accent": isToday(day),
       })}
      >
       {format(day, "d")}
       {todayEvents.map((event) => (
        <div
         key={event.title}
         className="text-sm bg-slate-100"
        >
         {event.title}
        </div>
       ))}
       {/* {events.filter((event) => isSameDay(event.date, day)
        .map((event) => {
         return <div key={event.title}>{event.title}</div>;
        })
       )} */}
      </div>
     );
    })}
   </div>
  </div>
 );
};
export default Scheduler;
