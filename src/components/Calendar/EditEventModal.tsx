"use client";
import React, {useState} from "react";
import BasicModal from "../UI/Modal";
import Button from "../UI/Button";
import dayjs, {Dayjs} from "dayjs";
import {EditEventModalProps, Booking, CalendarEvent, UpdateEventPayload} from "@/types/interfaces";
import {deleteEvent, updateEvent} from "@/helpers/api";
import StartBooking from "../UI/StartDayComponent";
import EndBooking from "../UI/EndDateComponent";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import {useSnackbar} from "notistack";
import DialogAgree from "../DialogAgree";

const EditEventModal: React.FC<EditEventModalProps> = ({event, onSave, onClose, onDelete, start, end, open}) => {
 const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(event.selectedDate));
 const [time, setTime] = useState<Dayjs | null>(dayjs(event.time));
 const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(event.endDate));
 const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(event.endTime));
 const {enqueueSnackbar} = useSnackbar();
 const [isDialogOpen, setIsDialogOpen] = useState(false);

 //  const [scroll, setScroll] = React.useState("paper");

 const handleStartDateChange = (date: Dayjs | null) => {
  setSelectedDate(date);
 };
 const handleStartTimeChange = (time: Dayjs | null) => {
  setTime(time);
 };
 const handleEndDateChange = (date: Dayjs | null) => {
  setEndDate(date);
 };
 const handleEndTimeChange = (time: Dayjs | null) => {
  setEndTime(time);
 };
 const handleSave = async () => {
  const updatedEventData: UpdateEventPayload = {
   email: event.email,
   name: event.name,
   surname: event.surname,
   phone: event.phone,
   address: event.address,
   area: event.area,
   selectedDate: dayjs(selectedDate).format("MM/DD/YYYY"),
   endDate: dayjs(endDate).format("MM/DD/YYYY"),
   time: dayjs(time).format("h:mm A"),
   endTime: dayjs(endTime).format("h:mm A"),
   bedroom: event.bedroom,
   bathroom: event.bathroom,
   extras: event.extras,
   service: event.service,
   frequency: event.frequency,
   aboutUs: event.aboutUs,
   specialInstructions: event.specialInstructions,
   homeAccess: event.homeAccess,
   tips: event.tips,
   totalPrice: event.totalPrice,
  };
  try {
   await updateEvent(event.id, updatedEventData);
   console.log("Event updated successfully!");
   onSave(updatedEventData);
   onClose();
   enqueueSnackbar("Event updated successfully", {variant: "success"});
   if (onSave) {
    onSave(updatedEventData);
    enqueueSnackbar("Event updated successfully", {variant: "success"});
   }
  } catch (error) {
   enqueueSnackbar("Error updating event", {variant: "error"});
  }
 };

 const handleOpenDialog = () => {
  setIsDialogOpen(true); // Відкриваємо діалог при натисканні "Delete"
 };

 const handleCloseDialog = () => {
  setIsDialogOpen(false); // Закриваємо діалог
 };

 //   const handleConfirmDelete = () => {
 //     onDelete(event._id);  // Викликаємо функцію видалення
 //     handleCloseDialog();  // Закриваємо діалог після підтвердження
 //   };

 return (
  <>
   <BasicModal
    open={open}
    onClose={onClose}
    //    scroll={scroll}
   >
    <div className="flex flex-col gap-2 mb-4 lg:mb-6 h-[80%]">
     <h2 className="text-[24px] md:text-[32px] text-accent text-center">Edit booking</h2>
     <p className="text-subtext">
      Are you sure you want to edit this booking? <br /> This action cannot be undone.
     </p>
     <p className="text-[24px] text-main">{event.title}</p>
     <div className="flex gap-2 align-center">
      <MailOutlineRoundedIcon className="w-6 h-6 text-main" />
      <p className="text-[18px] text-text">{event.email}</p>
     </div>
     <div className="flex gap-2">
      <LocalPhoneRoundedIcon className="w-6 h-6 text-main" />
      <p className="text-[18px] text-text"> {event.phone}</p>
     </div>
     <div className="flex gap-2">
      <LocationOnRoundedIcon className="w-6 h-6 text-main" />
      <div className="flex flex-col">
       <p className="text-[18px] text-text">{`${event.address.street}, ${event.address.city}, ${event.address.state}`}</p>
       <p> Area:{event.area ? ` ${event.area}` : "Area: Not specified"}</p>
      </div>
     </div>
     <p>
      {event.bedroom} bedrooms, {event.bathroom} bathrooms
     </p>
     <p className="text-subtext">
      <span className="text-text">Special instruction: </span>
      {event.specialInstructions}
     </p>
     <div className="flex gap-2 justify-start align-center">
      <EventRoundedIcon className="w-6 h-6 text-main" />
      <p className="text-[18px] text-accent">{`${dayjs(event.selectedDate).format("MM/DD/YYYY")} - ${event.time}`}</p>
     </div>
     <p className="text-subtext">
      <span className="text-text">Extras:</span>
      {event.extras && event.extras.length > 0 ? ` ${event.extras.join(", ")}` : "Extras: Not specified"}
     </p>
    </div>
    <div className="flex flex-col gap-4 mb-4">
     <p className="text-subtext">Please select the new start and end dates.</p>
     <StartBooking
      onDateChange={handleStartDateChange}
      onTimeChange={handleStartTimeChange}
      events={event}
     />
     <EndBooking
      onDateChange={handleEndDateChange}
      onTimeChange={handleEndTimeChange}
      events={event}
     />
    </div>
    <div className="flex justify-between gap-4">
     <Button
      onClick={handleSave}
      type={"submit"}
      style={"confirm"}
     >
      Save
     </Button>

     <Button
      onClick={() => handleOpenDialog}
      type={"button"}
      style={"delete-button"}
     >
      Delete
     </Button>
     <Button
      onClick={onClose}
      type={"button"}
      style={"confirm"}
     >
      Cancel
     </Button>
    </div>
   </BasicModal>
   <DialogAgree
    open={isDialogOpen}
    onClose={handleCloseDialog}
    onConfirm={() => onDelete(event._id)}
    // message="Are you sure you want to delete this event?"
   />
  </>
 );
};
export default EditEventModal;
