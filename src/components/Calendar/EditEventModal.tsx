"use client";
import React, {useState} from "react";
import BasicModal from "../UI/Modal";
import Button from "../UI/Button";
import dayjs, {Dayjs} from "dayjs";
import {EditEventModalProps, Booking, CalendarEvent, UpdateEventPayload} from "@/interfaces";
import {deleteEvent, updateEvent} from "@/helpers/api";
import StartBooking from "../UI/StartDayComponent";
import EndBooking from "../UI/EndDateComponent";
const EditEventModal: React.FC<EditEventModalProps> = ({event, onSave, onClose, onDelete, start, end, open}) => {
 const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(event.selectedDate));
 const [time, setTime] = useState<Dayjs | null>(dayjs(event.time));
 const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(event.endDate));
 const handleStartDateChange = (date: Dayjs | null) => {
  setSelectedDate(date);
 };
 const handleStartTimeChange = (time: Dayjs | null) => {
  setTime(time);
 };
 const handleEndDateChange = (date: Dayjs | null) => {
  setSelectedDate(date);
 };
 const handleEndTimeChange = (time: Dayjs | null) => {
  setTime(time);
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
   onSave(updatedEventData); // Notify parent component about the update
   onClose();
  } catch (error) {
   console.error("Error updating event:", error);
  }
 };
 return (
  <BasicModal
   open={open}
   onClose={onClose}
  >
   <div className="mb-4 lg:mb-6">
    <h2 className="text-[24px] md:text-[32px] text-accent text-center">Edit booking</h2>
    <p className="text-subtext">
     Are you sure you want to edit this booking? <br /> This action cannot be undone.
     <br /> Please select the new start and end dates.
    </p>
    <p className="text-[24px] text-main">{event.title}</p>
    <p className="text-[18px] text-text">{`${event.email}, ${event.phone}`}</p>
    <p className="text-[18px] text-text">{`${event.address.street}, ${event.address.city}, ${event.address.state}`}</p>
    <p>{event.specialInstructions}</p>
    <p className="text-[18px] text-text">{`${dayjs(event.selectedDate).format("MM/DD/YYYY")} - ${event.time}`}</p>
    <p>{event.extras && event.extras.length > 0 ? `Extras: ${event.extras.join(", ")}` : "Extras: Not specified"}</p>
   </div>
   <div>
    <StartBooking
     onDateChange={handleStartDateChange}
     onTimeChange={handleStartTimeChange}
    />
    <EndBooking
     onDateChange={handleEndDateChange}
     onTimeChange={handleEndTimeChange}
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
     onClick={() => onDelete(event._id)}
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
 );
};
export default EditEventModal;

// "use client";
// import React, {useState} from "react";
// import BasicModal from "../UI/Modal";
// import Button from "../UI/Button";
// import dayjs, {Dayjs} from "dayjs";
// import {EditEventModalProps, Booking, CalendarEvent, UpdateEventPayload} from "@/interfaces";
// import {deleteEvent, updateEvent} from "@/helpers/api";
// import StartBooking from "../UI/StartDayComponent";
// import EndBooking from "../UI/EndDateComponent";

// const EditEventModal: React.FC<EditEventModalProps> = ({event, onSave, onClose, onDelete, start, end, open}) => {
//  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(event.selectedDate));
//  const [time, setTime] = useState<Dayjs | null>(dayjs(event.time));
//  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(event.endDate));
//  const handleStartDateChange = (date: Dayjs | null) => {
//   setSelectedDate(date);
//  };

//  const handleStartTimeChange = (time: Dayjs | null) => {
//   setTime(time);
//  };

//  const handleEndDateChange = (date: Dayjs | null) => {
//   setSelectedDate(date);
//  };

//  const handleEndTimeChange = (time: Dayjs | null) => {
//   setTime(time);
//  };

//  const handleSave = async () => {
//   const updatedEventData: UpdateEventPayload = {
//    _id: event._id,
//    email: event.email,
//    name: event.name,
//    surname: event.surname,
//    phone: event.phone,
//    address: event.address,
//    area: event.area,
//    selectedDate: dayjs(selectedDate).format("MM/DD/YYYY"),
//    endDate: dayjs(endDate).format("MM/DD/YYYY"),
//    time: dayjs(time).format("h:mm A"),
//    bedroom: event.bedroom,
//    bathroom: event.bathroom,
//    extras: event.extras,
//    service: event.service,
//    frequency: event.frequency,
//    aboutUs: event.aboutUs,
//    specialInstructions: event.specialInstructions,
//    homeAccess: event.homeAccess,
//    tips: event.tips,
//    totalPrice: event.totalPrice,
//   };

//   try {
//    await updateEvent(event.id, updatedEventData);
//    console.log("Event updated successfully!");
//    onSave(updatedEventData);
//    onClose();
//   } catch (error) {
//    console.error("Error updating event:", error);
//   }
//  };

//  return (
//   <BasicModal
//    open={open}
//    onClose={onClose}
//   >
//    <div className="mb-4 lg:mb-6">
//     <h2 className="text-[24px] md:text-[32px] text-accent text-center">Edit booking</h2>
//     <p className="text-subtext">
//      Are you sure you want to edit this booking? <br /> This action cannot be undone.
//      <br /> Please select the new start and end dates.
//     </p>
//     <p className="text-[24px] text-main">{event.title}</p>
//     <p className="text-[18px] text-text">{`${event.email}, ${event.phone}`}</p>
//     <p className="text-[18px] text-text">{`${event.address.street}, ${event.address.city}, ${event.address.state}`}</p>
//     <p>{event.specialInstructions}</p>
//     <p className="text-[18px] text-text">{`${dayjs(event.selectedDate).format("MM/DD/YYYY")} - ${event.time}`}</p>
//     <p>{event.extras && event.extras.length > 0 ? `Extras: ${event.extras.join(", ")}` : "Extras: Not specified"}</p>
//    </div>
//    <div>
//     <StartBooking
//      onDateChange={handleStartDateChange}
//      onTimeChange={handleStartTimeChange}
//     />
//     <EndBooking
//      onDateChange={handleEndDateChange}
//      onTimeChange={handleEndTimeChange}
//     />
//    </div>
//    <div className="flex justify-between gap-4">
//     <Button
//      onClick={handleSave}
//      type={"submit"}
//      style={"confirm"}
//     >
//      Save
//     </Button>
//     <Button
//      onClick={() => onDelete(event._id)}
//      type={"button"}
//      style={"delete-button"}
//     >
//      Delete
//     </Button>
//     <Button
//      onClick={onClose}
//      type={"button"}
//      style={"confirm"}
//     >
//      Cancel
//     </Button>
//    </div>
//   </BasicModal>
//  );
// };

// export default EditEventModal;
// // import React, {useState, useEffect} from "react";
// // import BasicModal from "../UI/Modal";
// // import Button from "../UI/Button";
// // import dayjs, {Dayjs} from "dayjs";
// // import {EditEventModalProps, Booking, CalendarEvent, UpdateEventPayload} from "@/interfaces";

// // import {deleteEvent, getBookings, getExtras, updateEvent} from "@/helpers/api";

// // import StartBooking from "../UI/StartDayComponent";
// // import EndBooking from "../UI/EndDateComponent";

// // const EditEventModal: React.FC<EditEventModalProps> = ({event, onSave, onClose, onDelete, start, end, open}) => {
// //  const [events, setEvents] = useState<(Booking & CalendarEvent)[]>([]);
// //  const [isModalOpen, setIsModalOpen] = useState(false);
// //  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
// //  const [time, setTime] = useState<Dayjs | null>(dayjs());

// //  //  const handleSave = (updatedEvent: any) => {
// //  //   onSave(updatedEvent);
// //  //  };
// //  const handleStartDateChange = (date: Dayjs | null) => {
// //   setSelectedDate(date);
// //  };

// //  const handleStartTimeChange = (time: Dayjs | null) => {
// //   setTime(time);
// //  };

// //  const handleEndDateChange = (date: Dayjs | null) => {
// //   setSelectedDate(date);
// //  };
// //  const handleEndTimeChange = (time: Dayjs | null) => {
// //   setTime(time);
// //  };

// //  const handleSave = async (updatedEvent: Booking & CalendarEvent) => {
// //   const {
// //    id,
// //    email,
// //    name,
// //    surname,
// //    phone,
// //    address,
// //    area,
// //    selectedDate,
// //    endDate,
// //    time,
// //    bedroom,
// //    bathroom,
// //    extras,
// //    service,
// //    frequency,
// //    aboutUs,
// //    specialInstructions,
// //    homeAccess,
// //    tips,
// //    totalPrice,
// //   } = updatedEvent;
// //   if (!selectedDate || !time) {
// //    console.error("Date or time is missing");
// //    return;
// //   }

// //   const updatedEventData: UpdateEventPayload = {
// //    email: email,
// //    name: name,
// //    surname: surname,
// //    phone: phone,
// //    address: address,
// //    area: area,

// //    selectedDate: dayjs(selectedDate).format("MM/DD/YYYY"), // Оновлюємо дату
// //    endDate: dayjs(endDate).format("MM/DD/YYYY"),
// //    time: dayjs(time).format("h:mm A"), // Оновлюємо час у форматі AM/PM

// //    bedroom: bedroom,
// //    bathroom: bathroom,
// //    extras: extras,
// //    service: service,
// //    frequency: frequency,
// //    aboutUs: aboutUs,
// //    specialInstructions: specialInstructions,
// //    homeAccess: homeAccess,
// //    tips: tips,
// //    totalPrice: totalPrice,
// //   };

// //   console.log("Updating event with data:", updatedEventData);
// //   if (event && event._id) {
// //    try {
// //     await updateEvent(event._id, updatedEventData);
// //     console.log("Event updated successfully!");
// //     onSave(updatedEventData);
// //     onClose();
// //    } catch (error) {
// //     console.error("Error updating event:", error);
// //    }
// //   } else {
// //    console.error("Selected event or event ID is missing.");
// //   }
// //  };

// //  //   try {
// //  //    await updateEvent(updatedEvent.id, updatePayload);
// //  //    console.log("Updated bookings:", updatedEvent);
// //  //    if (onSave) {
// //  //     onSave(updatedEvent); // Call onSave if it is provided
// //  //    }
// //  //    setIsModalOpen(false);
// //  //   } catch (error) {
// //  //    console.error("Error updating event:", error);
// //  //   }

// //  //  const handleDeleteEvent = async (eventId: string) => {
// //  //     try {
// //  //      await deleteEvent(eventId);
// //  //      setEvents((prevState) => prevState.filter((event) => event.id !== eventId));
// //  //      setIsModalOpen(false);
// //  //     } catch (error) {
// //  //      console.error("Error deleting event:", error);
// //  //     }
// //  //    };

// //  return (
// //   <BasicModal
// //    open={open}
// //    onClose={onClose}
// //   >
// //    <div className="mb-4 lg:mb-6">
// //     <h2 className="text-[24px] md:text-[32px] text-accent text-center ">Edit booking</h2>
// //     <p className="text-subtext">
// //      Are you sure you want to edit this booking? <br /> This action cannot be undone.
// //      <br /> Please select the new start and end dates.
// //     </p>
// //     <p className="text-[24px] text-main">{event.title}</p>
// //     <p className="text-[18px] text-text">{`${event.email}, ${event.phone}`}</p>
// //     <p className="text-[18px] text-text">{`${event.address.street}, ${event.address.city}, ${event.address.state}`}</p>
// //     <p>{event.specialInstructions}</p>
// //     <p className="text-[18px] text-text">{`${dayjs(event.selectedDate).format("MM/DD/YYYY")} - ${event.time}`}</p>
// //     <p>
// //      {event.extras && event.extras.length > 0 ? `Extras: ${event.extras.join(", ")}` : "Extras: Not specified"}
// //     </p>{" "}
// //    </div>
// //    <div>
// //     <StartBooking
// //      onDateChange={handleStartDateChange}
// //      onTimeChange={handleStartTimeChange}
// //     />
// //     {/* <CalendarField
// //      event={event}
// //      onSave={handleSave}
// //     /> */}
// //     <EndBooking
// //      onDateChange={handleEndDateChange}
// //      onTimeChange={handleEndTimeChange}
// //     />
// //    </div>

// //    <div className="flex justify-between gap-4">
// //     <Button
// //      onClick={handleSave}
// //      type={"submit"}
// //      style={"confirm"}
// //     >
// //      Save
// //     </Button>
// //     <Button
// //      onClick={() => onDelete(event._id)}
// //      type={"button"}
// //      style={"delete-button"}
// //     >
// //      Delete
// //     </Button>
// //     <Button
// //      onClick={onClose}
// //      type={"submit"}
// //      style={"confirm"}
// //     >
// //      Cancel
// //     </Button>
// //    </div>
// //   </BasicModal>
// //  );
// // };

// // export default EditEventModal;
