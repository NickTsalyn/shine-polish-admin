"use client";

import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DigitalClock} from "@mui/x-date-pickers";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const EndBooking: React.FC<{
 onDateChange: (selectedDate: Dayjs | null) => void;
 onTimeChange: (time: Dayjs | null) => void;
}> = ({onDateChange, onTimeChange}) => {
 const [endDate, setEndDate] = useState<Dayjs | null>(null);
 const [endTime, setEndTime] = useState<Dayjs | null>(null);
 const [isTimeOpen, setIsTimeOpen] = useState(false);
 const [time, setTime] = React.useState<Dayjs | null>(dayjs());

 const handleDateChange = (newDate: Dayjs | null) => {
  setEndDate(newDate);
  onDateChange(newDate);
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  setEndTime(newTime);
  onTimeChange(newTime);
  setIsTimeOpen(false);
 };
 const shouldDisableDate = (date: Dayjs) => {
  return date.isSame(dayjs(), "day");
 };
 const openTimePicker = () => setIsTimeOpen(!isTimeOpen);

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
      shouldDisableDate={shouldDisableDate}
      openTo="day"
      autoFocus
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
       <span className="text-accent">{time ? time.format("h:mm A") : "Select Time"}</span>
      </div>
     </button>
     {isTimeOpen && (
      <div className="absolute right-0 bottom-[22px]">
       <DigitalClock
        value={endTime}
        onChange={handleTimeChange}
        timeStep={30}
        skipDisabled
        minTime={dayjs("08:00", "HH:mm")}
        maxTime={dayjs("16:30", "HH:mm")}
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
