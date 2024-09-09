"use client";

import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DigitalClock} from "@mui/x-date-pickers";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {Booking} from "@/types/interfaces";

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
 const [time, setTime] = React.useState<Dayjs | null>(dayjs());

 const handleDateChange = (newDate: Dayjs | null) => {
  const updatedDate = newDate || undefined;
  setEndDate(newDate);
  onDateChange(newDate);
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  const updatedTime = newTime || undefined; // Set undefined if newTime is null
  setEndTime(newTime);
  onTimeChange(newTime);
  setIsTimeOpen(false);
 };

 const openTimePicker = () => setIsTimeOpen(!isTimeOpen);
 const minDate = events[0]?.startDate ? dayjs(events[0]?.startDate) : dayjs();
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
        // minTime={dayjs("2022-04-17T08:00")}
        // maxTime={dayjs("2022-04-17T16:30")}
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
