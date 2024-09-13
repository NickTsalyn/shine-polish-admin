"use client";

import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DigitalClock} from "@mui/x-date-pickers";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
// import {events} from "../../helpers/api";
import {Booking} from "@/types/interfaces";
interface StartBookingProps {
 onDateChange: (date: Dayjs | null) => void;
 onTimeChange: (time: Dayjs | null) => void;
 events: Booking[];
}

const StartBooking: React.FC<StartBookingProps> = ({onDateChange, onTimeChange, events}) => {
 const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
 const [time, setTime] = React.useState<Dayjs | null>(dayjs());
 const [isTimeOpen, setIsTimeOpen] = useState(false);

 const handleDateChange = (date: Dayjs | null) => {
  setSelectedDate(date);
  onDateChange(date);
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  setTime(newTime);
  onTimeChange(newTime);
  setIsTimeOpen(false);
 };
 const openTimePicker = () => {
  setIsTimeOpen(!isTimeOpen);
 };

//  const shouldDisableDate = (date: Dayjs, events: Booking[]) => {
//   return events.some((event) => {
//    const eventStart = dayjs(event.selectedDate);
//    const eventEnd = dayjs(event.endDate);
//    return date.isSame(eventStart, "day") || date.isBetween(eventStart, eventEnd, "day", "[]");
//   });
//  };
//  const shouldDisableTime = (time: Dayjs, selectedDate: Dayjs | null, events: Booking[]) => {
//   if (!selectedDate) return false;

//   return events.some((event) => {
//    const eventDate = dayjs(event.selectedDate);
//    if (!selectedDate.isSame(eventDate, "day")) return false;

//    const eventStartTime = dayjs(event.time, "HH:mm");
//    const eventEndTime = dayjs(event.endTime, "HH:mm");
//    return time.isSame(eventStartTime, "minute") || time.isBetween(eventStartTime, eventEndTime, "minute", "[]");
//   });
//  };

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className="flex flex-col gap-2 justify-center md:flex-row md:justify-between">
    <div className="md:w-[200px]">
     <DatePicker
      label="Start Date"
      onChange={handleDateChange}
      value={dayjs(selectedDate, "MM/DD/YYYY")}
      disablePast
      openTo="day"
      autoFocus
    //   shouldDisableDate={(date) => shouldDisableDate(date, events)}
     />
    </div>
    <div className="flex flex-col gap-2">
     <button
      onClick={openTimePicker}
      className="border-color-main flex flex-col gap-1 rounded-lg border-[1px] p-2 md:border-none md:p-0"
     >
      <span className="text-[16px] text-secondary">Choose Time</span>
      <div className="flex flex-row gap-2">
       <AccessTimeRoundedIcon className="text-main text-[28px]" />
       <span className="text-[16px] text-accent">{time ? time.format("h:mm A") : "Select Time"}</span>
      </div>
     </button>
     {isTimeOpen && (
      <div className="absolute right-0 bottom-[22px]">
       <DigitalClock
        value={dayjs(time, "h:mm A")}
        onChange={handleTimeChange}
        skipDisabled
        // minTime={dayjs("2022-04-17T08:00")}
        // maxTime={dayjs("2022-04-17T16:30")}
        minTime={dayjs().hour(8).minute(0)}
        maxTime={dayjs().hour(16).minute(30)}
        timeStep={30}
        // shouldDisableTime={(time) => shouldDisableTime(time, selectedDate, events)}
       />
      </div>
     )}
    </div>
   </div>
  </LocalizationProvider>
 );
};

export default StartBooking;
