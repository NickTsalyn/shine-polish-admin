"use client";
import React, {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DigitalClock} from "@mui/x-date-pickers/DigitalClock";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {useSnackbar} from "notistack";
import {CalendarFieldProps, Booking} from "@/types/interfaces";

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

 const shouldDisableDate = (date: Dayjs, events: Booking[]) => {
  return events.some((event) => dayjs(event.selectedDate).isSame(date, "day"));
 };
 const shouldDisableTime = (time: Dayjs, selectedDate: Dayjs, events: Booking[]) => {
  return events.some(
   (event) => dayjs(event.selectedDate).isSame(selectedDate, "day") && dayjs(event.time).isSame(time, "minute")
  );
 };

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className="flex flex-col gap-4  mb-6">
    <div className="flex gap-4">
     <DatePicker
      label="Start Date"
      value={startDate ? dayjs(startDate, "YYYY-MM-DD") : null}
      onChange={handleStartDateChange}
      shouldDisableDate={(date) => shouldDisableDate(date, events)}
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
         value={time ? dayjs(time, "h:mm A") : null}
         onChange={handleTimeChange}
         skipDisabled
         minTime={dayjs("08:00", "h:mm A")}
         maxTime={dayjs("16:30", "h:mm A")}
         timeStep={30}
         shouldDisableTime={(time) => (startDate ? shouldDisableTime(time, startDate, events) : false)}
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
       //    shouldDisableDate={(date) => shouldDisable(date, events)}
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
          value={time ? dayjs(time, "h:mm A") : null}
          onChange={handleEndTimeChange}
          skipDisabled
          minTime={dayjs("08:00", "h:mm A")}
          maxTime={dayjs("16:30", "h:mm A")}
          timeStep={30}
          shouldDisableTime={(time) => (endDate ? shouldDisableTime(time, endDate, events) : false)}
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
