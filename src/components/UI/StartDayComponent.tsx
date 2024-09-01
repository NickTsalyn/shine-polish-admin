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

 //  shouldDisableDate={(date) => {
 //     return events.some(event =>
 //       dayjs(date).isSame(dayjs(event.start), 'day')
 //     );
 //   }}
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
   {/* <div className="flex flex-col gap-2 "> */}
   <div className="flex flex-col gap-2 justify-center md:flex-row md:justify-between">
    <div className="md:w-[200px]">
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
        minTime={dayjs("2022-04-17T08:00")}
        maxTime={dayjs("2022-04-17T16:30")}
        timeStep={30}
        // shouldDisableTime={shouldDisableTime}
       />
      </div>
     )}
    </div>
   </div>
   {/* </div> */}
  </LocalizationProvider>
 );
};

export default StartBooking;
