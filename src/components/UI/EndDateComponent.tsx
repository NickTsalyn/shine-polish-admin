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

 const handleDateChange = (newDate: Dayjs | null) => {
  setEndDate(newDate);
  onDateChange(newDate);
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  setEndTime(newTime);
  onTimeChange(newTime);
  setIsTimeOpen(false);
 };

 const toggleTimePicker = () => setIsTimeOpen(!isTimeOpen);

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className="flex flex-col gap-2">
    <div className="flex justify-center">
     <DatePicker
      label="End Date"
      value={endDate}
      onChange={handleDateChange}
     />
     <button onClick={toggleTimePicker}>
      <AccessTimeRoundedIcon />
      <span className="text-secondary">Choose Time</span>
     </button>
     {isTimeOpen && (
      <div className="absolute right-0 bottom-[22px]">
       <DigitalClock
        value={endTime}
        onChange={handleTimeChange}
        timeStep={30}
       />
      </div>
     )}
    </div>
   </div>
  </LocalizationProvider>
 );
};

export default EndBooking;
