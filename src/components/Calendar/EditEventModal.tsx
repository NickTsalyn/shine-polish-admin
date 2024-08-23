import React, {useState, useEffect} from "react";
import BasicModal from "../UI/Modal";
import Button from "../UI/Button";
import {TextField} from "@mui/material";
import dayjs from "dayjs";
import {EditEventModalProps, Booking} from "@/interfaces";
import axios from "axios";
import {deleteEvent, getBookings, getExtras, updateEvent} from "@/helpers/api";
import {setAuthHeader} from "@/helpers/auth";

type Form = {
 title: string;
 start: string;
 end: string;
 extras: string[];
};

const EditEventModal: React.FC<EditEventModalProps> = ({open, onClose, event, onSave, onDelete}) => {
 const [startDate, setStartDate] = useState(dayjs(event.start).format("YYYY-MM-DDThh:mm"));
 const [endDate, setEndDate] = useState(dayjs(event.end).format("YYYY-MM-DDThh:mm"));

 const handleSave = () => {
  const updatedEvent = {
   ...event,
   start: dayjs(startDate).toDate(),
   end: dayjs(endDate).toDate(),
  };
  onSave(updatedEvent);
 };

 return (
  <BasicModal
   open={open}
   onClose={onClose}
  >
   <div>
    <h2 className="text-center">Edit booking</h2>
    <p className="text-center">Are you sure you want to edit this booking?</p>
    <p className="text-center">This action cannot be undone.</p>
    <p className="text-center">Please select the new start and end dates.</p>
    <p className="text-center">You can also add or remove extras.</p>
    <p className="text-[24px] text-main">{event.title}</p>
    <p className="text-[18px] text-main">{`${event.email}, ${event.phone}`}</p>
    <p className="text-[18px] text-main">{`${event.address.street}, ${event.address.city}, ${event.address.state}`}</p>
    <p>{event.specialInstructions}</p>
    <p className="text-[18px] text-main">{`${event.selectedDate} - ${event.time}`}</p>
    <p className="text-[18px] text-main">{`${dayjs(event.start).format("MMM DD, YYYY")} - ${dayjs(event.end).format(
     "MMM DD, YYYY"
    )}`}</p>
    <p>{event.extras && event.extras.length > 0 ? `Extras: ${event.extras.join(", ")}` : "Extras: Not specified"}</p>{" "}
   </div>
   <div className="flex flex-col gap-4 md:flex-row mb-6">
    <TextField
     label="Start Date"
     type="datetime-local"
     value={startDate}
     onChange={(e) => setStartDate(e.target.value)}
    />
    <TextField
     label="End Date"
     type="datetime-local"
     value={endDate}
     onChange={(e) => setEndDate(e.target.value)}
    />
   </div>
   <div className="flex justify-between gap-4">
    <Button
     onClick={handleSave}
     type={"button"}
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
     type={"submit"}
     style={"confirm"}
    >
     Cancel
    </Button>
   </div>
  </BasicModal>
 );
};

// const EditEventModal: React.FC<EditEventModalProps> = ({open, onClose, event, onSave, _id, onDelete}) => {
//  const [data, setData] = useState<Form>({
//   title: event.title,
//   start: dayjs(event.start).format("MM/DD/YYYYThh:mm A"),
//   end: dayjs(event.end).format("MM/DD/YYYYThh:mm A"),
//   extras: [],
//  });
//  const [startDate, setStartDate] = useState(dayjs(event.start).format("MM/DD/YYYYThh:mm A"));
//  const [endDate, setEndDate] = useState(dayjs(event.end).format("MM/DD/YYYYThh:mm A"));
//  const [events, setEvents] = useState<Booking[]>([]);
//  const [selectedEvent, setSelectedEvent] = useState<Booking | null>(null); // Для модального вікна
//  const [isModalOpen, setIsModalOpen] = useState(false);

//  const [bookings, setBookings] = React.useState<Booking[]>();
//  const [extras, setExtras] = React.useState<string[]>();

//  useEffect(() => {
//   console.log("Event in useEffect:", event);
//   if (event) {
//    console.log("Event ID in useEffect:", event._id);
//   }
//  }, [event]);

//  useEffect(() => {
//   console.log("Event details:", event);
//   const fetchData = async () => {
//    const bookings = await getBookings();
//    setBookings(bookings);
//    //    const extras = await getExtras();
//    //    setExtras(extras);

//    console.log("Bookings:", bookings);
//   };

//   fetchData();
//  }, [event]);

//  return (
//   <BasicModal
//    open={open}
//    onClose={onClose}
//   >
//    <div>
//     <h2 className="text-center text-accent text-[36px]">Edit booking</h2>
//     <div className="flex flex-col gap-4">
//      <p className="text-[24px] text-main ">{event.title}</p>
//      <p>{event.email}</p>
//      <p>{event.phone}</p>
//      <p>{`${event.address.street}, ${event.address.aptSuite}, ${event.address.city}, ${event.address.state}, ${event.address.zip}`}</p>
//      <p>{event.areas}</p>
//      <p>{dayjs(event.selectedDate).format("MM/DD/YYYY")}</p>
//      <p>{event.time}</p>
//      <p>Bedrooms:{event.bedrooms}</p>
//      <p>Bathrooms:{event.bathrooms}</p>
//      <p>
//       {event.service}, {event.frequency}
//      </p>
//      <p>{event.specialInstructions}</p>
//      <p>{event.extras}</p>
//     </div>
//     <div className="flex flex-col gap-4 md:flex-row mb-6">
//      <TextField
//       label="Start Date"
//       type="datetime-local"
//       value={startDate}
//       onChange={(e) => setStartDate(e.target.value)}
//      />
//      <TextField
//       label="End Date"
//       type="datetime-local"
//       value={endDate}
//       onChange={(e) => setEndDate(e.target.value)}
//      />
//     </div>
//     <div className="flex justify-between gap-4">
//      <Button
//       onClick={handleSave}
//       type={"button"}
//       style={"confirm"}
//      >
//       Save
//      </Button>

//      <Button
//       onClick={() => {
//        if (event && event._id) {
//         console.log("Deleting event with ID:", event._id);
//         handleDeleteEvent(event._id);
//        } else {
//         console.error("event._id is undefined");
//        }
//       }}
//       type={"button"}
//       style={"delete-button"}
//      >
//       Delete
//      </Button>

//      <Button
//       onClick={handleCloseModal}
//       type={"button"}
//       style={"confirm"}
//      >
//       Cancel
//      </Button>
//     </div>
//    </div>
//   </BasicModal>
//  );
// };

export default EditEventModal;
