"use client";
import React, {useState, useEffect} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DigitalClock} from "@mui/x-date-pickers/DigitalClock";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import axios from "axios";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import Button from "../UI/Button";
import {getBookings, updateEvent} from "../../helpers/api";
import {CalendarFieldProps, Booking, UpdateEventPayload, CalendarEvent, Address} from "../../interfaces";
// import {getBackgroundColor} from "@/helpers/colorUtils";
// import {setAuthHeader} from "../../helpers/auth";

const CalendarField: React.FC<CalendarFieldProps> = ({event, onSave}) => {
 const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(event.start));
 const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(event.end));
 const [time, setTime] = useState<Dayjs | null>(dayjs(event.time));
 const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(event.end));
 const [isTimeCalendarOpen, setIsTimeCalendarOpen] = useState(false);
 const [events, setEvents] = useState<Booking>(event);
 const [isModalOpen, setIsModalOpen] = useState(false);

 const handleStartDateChange = (newDate: Dayjs | null) => {
  if (newDate) {
   setStartDate(newDate);
   console.log("Start date", newDate);
  } else {
   console.error("Invalid date selected");
  }
 };

 const handleEndDateChange = (newDate: Dayjs | null) => {
  if (newDate) {
   setEndDate(newDate);
   setStartDate(newDate);
   console.log("End date", newDate);
  } else {
   console.error("Invalid date selected");
  }
 };

 const handleTimeChange = (newTime: Dayjs | null) => {
  setTime(newTime);
 };

 const handleEndTimeChange = (newTime: Dayjs | null) => {
  setEndTime(newTime);
 };

 const handleTimeButtonClick = () => {
  setIsTimeCalendarOpen(!isTimeCalendarOpen);
 };

 const toggleTimeCalendar = () => {
  setIsTimeCalendarOpen(!isTimeCalendarOpen);
 };
 const constructAddress = (address: any): Address => {
  if (!address.street || !address.city || !address.state || !address.zip) {
   throw new Error("Missing required address properties");
  }

  return {
   street: address.street,
   city: address.city,
   state: address.state,
   zip: address.zip,
   aptSuite: address.aptSuite,
  };
 };

 const handleSave = async () => {
  // Перевірка та форматування дат перед збереженням
  const selectedDateISO = startDate ? dayjs(startDate).toISOString() : "";
  const endDateISO = endDate ? dayjs(endDate).toISOString() : "";
  const timeISO = time ? dayjs(time).toISOString() : "";

  const updatedEvent = {
   ...event,
   selectedDate: selectedDateISO,
   endDate: endDateISO,
   time: timeISO,
  };

  const updatePayload: UpdateEventPayload = {
   email: updatedEvent.email,
   name: updatedEvent.name,
   surname: updatedEvent.surname,
   phone: updatedEvent.phone,
   address: updatedEvent.address,
   area: updatedEvent.area,
   selectedDate: selectedDateISO, // Переконайтеся, що це рядок
   endDate: endDateISO, // Переконайтеся, що це рядок
   time: timeISO, // Переконайтеся, що це рядок
   bedroom: updatedEvent.bedroom,
   bathroom: updatedEvent.bathroom,
   extras: updatedEvent.extras,
   service: updatedEvent.service,
   frequency: updatedEvent.frequency,
   aboutUs: updatedEvent.aboutUs,
   specialInstructions: updatedEvent.specialInstructions,
   homeAccess: updatedEvent.homeAccess,
   tips: updatedEvent.tips,
   totalPrice: updatedEvent.totalPrice,
  };

  try {
   // Надсилаємо оновлений об'єкт події на бекенд
   await updateEvent(updatedEvent.id, updatePayload);
   console.log("Updated bookings:", updatedEvent);

   // Якщо є функція onSave, викликаємо її
   if (onSave) {
    onSave(updatedEvent);
   }
  } catch (error) {
   console.error("Error updating event:", error);
  }
 };

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className="flex flex-col gap-4  mb-6">
    <div className="flex gap-4">
     <DatePicker
      label="Start Date"
      value={startDate}
      onChange={handleStartDateChange}
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
         minTime={dayjs("2022-04-17T08:00")}
         maxTime={dayjs("2022-04-17T16:30")}
         timeStep={30}
         // shouldDisableTime={shouldDisableTime}
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
          minTime={dayjs("2022-04-17T08:00")}
          maxTime={dayjs("2022-04-17T16:30")}
          timeStep={30}
          // shouldDisableTime={shouldDisableTime}
         />
        </div>
       )}
      </div>
     </div>
     <Button
      type={"submit"}
      style="confirm"
      onClick={() => handleSave()}
     >
      Save
     </Button>
    </div>
   </div>
  </LocalizationProvider>
 );
};

export default CalendarField;