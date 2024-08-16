import React, {useState, useEffect} from "react";
import BasicModal from "../UI/Modal";
import Button from "../UI/Button";
import {TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {EditEventModalProps, Booking} from "@/interfaces";
import axios from "axios";
import {getBookings} from "@/helpers/api";

const EditEventModal: React.FC<EditEventModalProps> = ({open, onClose, event, onSave, onDelete}) => {
 const [startDate, setStartDate] = useState(dayjs(event.start).format("MM/DD/YYYYTh:mm A"));
 const [endDate, setEndDate] = useState(dayjs(event.end).format("MM/DD/YYYYTh:mm A"));

 const [bookings, setBookings] = React.useState<Booking[]>();
 useEffect(() => {
  const setAuthHeader = (token: string) => {
   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  setAuthHeader(
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmVlOGM3MzE3MmUzNDM3OTNlNjQwZiIsImVtYWlsIjoiQWx2YXJvQ2FwaWJhcmFURVNURVJAbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFsdmFybyBDYXBpYmFyYSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcyMzY0ODQ4NywiZXhwIjoxNzIzNzM0ODg3fQ.8FkcJOSWK9cWDRi8Uw9ckhT8SDi4EPrTiMsNu0NE1p4"
  );

  const fetchData = async () => {
   const bookings = await getBookings();
   setBookings(bookings); // Set the first element of the array
  };
  fetchData();
 }, []);
 const handleSave = () => {
  onSave({
   ...event,
   start: new Date(startDate),
   end: new Date(endDate),
  });
  onClose();
 };

 const handleDelete = () => {
  onDelete(event.id);
  onClose();
 };

 return (
  <BasicModal
   open={open}
   onClose={onClose}
  >
   <div>
    <h2 className="text-center text-accent text-[36px]">Edit booking</h2>
    <div className="flex flex-col gap-4">
     <p className="text-[24px] text-main ">{event.title}</p>
     <p>{event.email}</p>
     <p>{event.phone}</p>
     <p>{`${event.address.street}, ${event.address.aptSuite}, ${event.address.city}, ${event.address.state}, ${event.address.zip}`}</p>
     <p>{event.areas}</p>
     <p>{dayjs(event.selectedDate).format("MM/DD/YYYY")}</p>
     <p>{event.time}</p>
     <p>Bedrooms:{event.bedrooms}</p>
     <p>Bathrooms:{event.bathrooms}</p>
     <p>
      {event.service}, {event.frequency}
     </p>
     <p>{event.specialInstructions}</p>
     <p>{event.extras}</p>
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
      onClick={handleDelete}
      type={"button"}
    //   style={"delete-button"}
    style={"confirm"}
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
   </div>
  </BasicModal>
 );
};

export default EditEventModal;

// import React, {useState} from "react";
// import BasicModal from "../UI/Modal";
// import Button from "../UI/Button";
// import {TextField} from "@mui/material";
// import datejs from "dayjs";
import {format} from "date-fns";

// interface EditEventModalProps {
//  open: boolean;
//  onClose: () => void;
//  event: any;
//  onSave: (updateEvent: any) => void;
//  onDelete: (eventId: number) => void;
// }

// const EditEventModal: React.FC<EditEventModalProps> = ({open, onClose, event, onSave, onDelete}) => {
//  const [startDate, setStartDate] = useState(datejs(event.start).format("MM/DD/YYYYTh:mm A"));
//  const [endDate, setEndDate] = useState(datejs(event.end).format("MM/DD/YYYYTh:mm A"));

//  const handleSave = () => {
//   onSave({
//    ...event,
//    start: new Date(startDate),
//    end: new Date(endDate),
//    //   id: event.id,
//    //   title: event.title,
//    //   description: event.description,
//    //   start: startDate,
//    //   end: endDate,
//    //   backgroundColor: event.backgroundColor,
//    //   textColor: event.textColor,
//   });
//   onClose();
//  };
//  const handleDelete = () => {
//   onDelete(event.id);
//   onClose();
//  };
//  return (
//   <BasicModal
//    open={open}
//    onClose={onClose}
//   >
//    <div>
//     <h2>Edit Event</h2>
//     <TextField
//      label="Start Date"
//      type="datetime-local"
//      value={startDate}
//      onChange={(e) => setStartDate(e.target.value)}
//     />
//     <TextField
//      label="End Date"
//      type="datetime-local"
//      value={endDate}
//      onChange={(e) => setEndDate(e.target.value)}
//     />
//     <Button
//      onClick={handleSave}
//      type={"button"}
//      style={"burger-book-now"}
//     >
//      Save
//     </Button>
//     <Button
//      onClick={handleDelete}
//      type={"button"}
//      style={"burger-book-now"}
//     >
//      Delete
//     </Button>
//     <Button
//      onClick={onClose}
//      type={"button"}
//      style={"burger-book-now"}
//     >
//      Cancel
//     </Button>
//    </div>
//   </BasicModal>
//  );
// };
// export default EditEventModal;
