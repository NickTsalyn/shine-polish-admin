"use client";

import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DigitalClock} from "@mui/x-date-pickers";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {Booking} from "@/types/interfaces";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface EndBookingProps {
 onDateChange: (date: Dayjs | null) => void;
 onTimeChange: (time: Dayjs | null) => void;
 events: Booking[];
 minDate?: Dayjs;
}

const EndBooking: React.FC<EndBookingProps> = ({onDateChange, onTimeChange, events}) => {
 const [endDate, setEndDate] = useState<Dayjs | null>(null);
 const [endTime, setEndTime] = useState<Dayjs | null>(null);
 const [isTimeOpen, setIsTimeOpen] = useState(false);
 //  const [time, setTime] = React.useState<Dayjs | null>(dayjs());

 const handleDateChange = (newDate: Dayjs | null) => {
  const updatedDate = newDate || undefined;
  setEndDate(newDate);
  onDateChange(newDate);
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  const updatedTime = newTime || undefined;
  setEndTime(newTime);
  onTimeChange(newTime);
  setIsTimeOpen(false);
 };

 const openTimePicker = () => setIsTimeOpen(!isTimeOpen);

 const minDate = events[0]?.startDate ? dayjs(events[0]?.startDate) : dayjs();

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

 //    const eventEndTime = dayjs(event.endTime, "HH:mm");
 //    return time.isSame(eventStartTime, "minute") || time.isBetween(eventStartTime, eventEndTime, "minute", "[]");
 //   });
 //  };

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   {/* <div className="flex flex-col gap-2"> */}
   <div className="flex flex-col gap-2 justify-center md:flex-row md:justify-between">
    <div className="md:w-[200px]">
     <DatePicker
      label="End Date"
      value={endDate}
      onChange={handleDateChange}
      disablePast
      minDate={minDate || dayjs()}
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
      <span className="text-secondary">Choose Time </span>
      <div className="flex flex-row gap-2">
       <AccessTimeRoundedIcon className="text-main text-[28px]" />
       <span className="text-accent">{endTime ? endTime.format("h:mm A") : "End Time"}</span>
      </div>
     </button>
     {isTimeOpen && (
      <div className="absolute right-0 bottom-[22px]">
       <DigitalClock
        value={endTime}
        onChange={handleTimeChange}
        timeStep={30}
        skipDisabled
        minTime={dayjs().hour(8).minute(0)}
        maxTime={dayjs().hour(16).minute(30)}
        // shouldDisableTime={(time) => shouldDisableTime(time, endDate, events)}
       />
      </div>
     )}
    </div>
   </div>
   {/* </div> */}
  </LocalizationProvider>
 );
};

export default EndBooking;
