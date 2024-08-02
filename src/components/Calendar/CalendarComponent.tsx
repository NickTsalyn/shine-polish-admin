"use client";
import React, {useState} from "react";
import {Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import {events} from "../../app/data/date-bookings";
import "./Calendar.css";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const CalendarComponent = () => {
 const localizer = dayjsLocalizer(dayjs);

 const [view, setView] = useState("month");
 const [date, setDate] = useState(dayjs().toDate());

 const components = {
  event: (props: {event: {backgroundColor?: any; textColor?: any; title?: any; data?: any}}) => {
   const {data} = props.event;

   console.log(props);
   console.log(data);
   return (
    <div
     style={{
      backgroundColor: props.event.backgroundColor,
      color: props.event.textColor,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      borderRadius: 12,
      padding: 4,
     }}
    >
     <CircleRoundedIcon
      color={props.event.textColor}
      style={{fontSize: "10px", marginRight: "4px"}}
     />
     {props.event.title}
    </div>
   );
  },
 };

 return (
  <div className="p-4 h-[600px] w-[300px] md:w-[680px] lg:w-[980px] xl:w-[1400px] mx-auto">
   <Calendar
    localizer={localizer}
    events={events}
    // views={["week", "day", "month", "agenda"]}
    view={view}
    date={date}
    toolbar={true}
    onNavigate={(newDate, view) => setDate(newDate)}
    onView={(newView) => setView(newView)}
    defaultView="month"
    min={dayjs("2024-08-01T08:00:00").toDate()}
    max={dayjs("2024-08-31T16:00:00").toDate()}
    formats={{
     dayHeaderFormat: (date) => dayjs(date).format("D MMMM YYYY"),
    }}
    components={components}
   />
  </div>
 );
};

export default CalendarComponent;

// import {FC, useState} from "react";
// import {Calendar, dateFnsLocalizer, Event} from "react-big-calendar";
// import withDragAndDrop, {withDragAndDropProps} from "react-big-calendar/lib/addons/dragAndDrop";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enUS from "date-fns/locale/en-US";
// import startOfHour from "date-fns/startOfHour";
// import addHours from "date-fns/addHours";

// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const MyCalendar: FC = () => {
//  const [events, setEvents] = useState<Event[]>([
//   {
//    title: "Learn cool stuff",
//    start,
//    end,
//   },
//  ]);

//  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
//   const {start, end} = data;

//   setEvents((currentEvents) => {
//    const firstEvent = {
//     start: new Date(start),
//     end: new Date(end),
//    };
//    return [...currentEvents, firstEvent];
//   });
//  };

//  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
//   console.log(data);
//  };

//  return (
//   <DnDCalendar
//    //    defaultView="mounth"
//    views={["week", "day", "month", "agenda"]}
//    events={events}
//    localizer={localizer}
//    onEventDrop={onEventDrop}
//    onEventResize={onEventResize}
//    resizable
//    style={{height: "100vh"}}
//   />
//  );
// };

// const locales = {
//  "en-US": enUS,
// };
// const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
// const now = new Date();
// const start = endOfHour(now);
// const end = addHours(start, 2);
// // The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
// const localizer = dateFnsLocalizer({
//  format,
//  parse,
//  startOfWeek,
//  getDay,
//  locales,
// });
// //@ts-ignore
// const DnDCalendar = withDragAndDrop(Calendar);

// export default MyCalendar;
