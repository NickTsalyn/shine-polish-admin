"use client";

import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DigitalClock} from "@mui/x-date-pickers";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const StartBooking: React.FC<{
 onDateChange: (selectedDate: Dayjs | null) => void;
 onTimeChange: (time: Dayjs | null) => void;
}> = ({onDateChange, onTimeChange}) => {
 const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
 const [time, setTime] = React.useState<Dayjs | null>(dayjs());
 const [isTimeOpen, setIsTimeOpen] = useState(false);

 const handleDateChange = (date: Dayjs | null) => {
  setSelectedDate(date);
  console.log("New date", date);
  onDateChange(date);
  console.log("New date2", date);
 };

 const shouldDisableDate = (date: Dayjs) => {
  return date.isSame(dayjs(), "day");
 };
 const handleTimeChange = (newTime: Dayjs | null) => {
  setTime(newTime);
  console.log("New time", newTime);
  onTimeChange(newTime);
  console.log("New time2", newTime);
  setIsTimeOpen(false);
 };
 const openTimePicker = () => {
  setIsTimeOpen(!isTimeOpen);
 };

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className="flex flex-col gap-2">
    <div className="flex justify-center">
     <DatePicker
      label="Start Date"
      onChange={handleDateChange}
      value={dayjs(selectedDate, "MM/DD/YYYY")}
      shouldDisableDate={shouldDisableDate}
      disablePast
      //   views={views}
      //   orientation="portrait"
      openTo="day"
      autoFocus
     />
     <button onClick={openTimePicker}>
      <AccessTimeRoundedIcon />
      <span className="text-secondary">Choose Time</span>
     </button>
     {isTimeOpen && (
      <div className="absolute right-0 bottom-[22px]">
       <DigitalClock
        value={dayjs(time, "h:mm A")}
        onChange={handleTimeChange}
        skipDisabled
        minTime={dayjs("2022-04-17T08:00")}
        maxTime={dayjs("2022-04-17T16:30")}
        timeStep={30}
        // shouldDisableTime={shouldDisableTime}
       />
      </div>
     )}
    </div>
   </div>
  </LocalizationProvider>
 );
};

export default StartBooking;
