"use client";
import React, {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DigitalClock} from "@mui/x-date-pickers/DigitalClock";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {useSnackbar} from "notistack";
import Button from "../UI/Button";
import {updateEvent} from "../../helpers/api";
import {CalendarFieldProps, Booking, UpdateEventPayload, Address} from "@/types/interfaces";

const CalendarField: React.FC<CalendarFieldProps> = ({event, onSave, events}) => {
 const {enqueueSnackbar} = useSnackbar();
 const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(event.start));
 const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(event.end));
 const [time, setTime] = useState<Dayjs | null>(dayjs(event.time));
 const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(event.end));
 const [isTimeCalendarOpen, setIsTimeCalendarOpen] = useState(false);
 //  const [events, setEvents] = useState<Booking>(event);
 //  const [isModalOpen, setIsModalOpen] = useState(false);

 const handleStartDateChange = (newDate: Dayjs | null) => {
  setStartDate(newDate);
 };

 const handleEndDateChange = (newDate: Dayjs | null) => {
  if (newDate && newDate.isBefore(startDate, "day")) {
   enqueueSnackbar("End date cannot be before start date", {variant: "error"});
   return;
  }
  setEndDate(newDate);
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  setTime(newTime);
 };

 const handleEndTimeChange = (newTime: Dayjs | null) => {
  setEndTime(newTime);
 };

 const toggleTimeCalendar = () => {
  setIsTimeCalendarOpen(!isTimeCalendarOpen);
 };
 const isDateDisabled = (date: Dayjs) => {
  return events.some((event: any) => dayjs(date).isSame(dayjs(event.start), "day"));
 };

 const isTimeDisabled = (time: Dayjs) => {
  return events.some((event: any) => dayjs(time).isSame(dayjs(event.start), "minute"));
 };

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className="flex flex-col gap-4  mb-6">
    <div className="flex gap-4">
     <DatePicker
      label="Start Date"
      value={startDate}
      onChange={handleStartDateChange}
      shouldDisableDate={isDateDisabled}
     />
     <div className="w-[100px] relative">
      <button
       type="button"
       onClick={toggleTimeCalendar}
       className="flex flex-col items-center"
      >
       <AccessTimeRoundedIcon />
       <span className="text-secondary">Choose Time</span>
      </button>
      {isTimeCalendarOpen && (
       <div className="absolute right-0 bottom-[22px] ">
        <DigitalClock
         value={dayjs(time, "h:mm A")}
         onChange={handleTimeChange}
         skipDisabled
         minTime={dayjs("08:00", "h:mm A")}
         maxTime={dayjs("16:30", "h:mm A")}
         timeStep={30}
         shouldDisableTime={isTimeDisabled}
        />
       </div>
      )}
     </div>
    </div>
    <div className="flex flex-col gap-4">
     <div className="flex gap-4">
      <DatePicker
       label="End Date"
       value={endDate}
       onChange={handleEndDateChange}
       shouldDisableDate={isDateDisabled}
      />
      <div className="w-[100px] relative">
       <button
        type="button"
        onClick={toggleTimeCalendar}
        className="flex flex-col items-center"
       >
        <AccessTimeRoundedIcon />
        <span className="text-secondary">Choose Time</span>
       </button>
       {isTimeCalendarOpen && (
        <div className="absolute right-0 bottom-[22px] ">
         <DigitalClock
          value={dayjs(time, "h:mm A")}
          onChange={handleEndTimeChange}
          skipDisabled
          minTime={dayjs("08:00", "h:mm A")}
          maxTime={dayjs("16:30", "h:mm A")}
          timeStep={30}
          shouldDisableTime={isTimeDisabled}
         />
        </div>
       )}
      </div>
     </div>
    </div>
   </div>
  </LocalizationProvider>
 );
};

export default CalendarField;
