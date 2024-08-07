import React, {useState} from "react";
import BasicModal from "../UI/Modal";
import Button from "../UI/Button";
import {TextField} from "@mui/material";
import dayjs from "dayjs";

interface EditEventModalProps {
 open: boolean;
 onClose: () => void;
 event: any;
 onSave: (updateEvent: any) => void;
 onDelete: (eventId: number) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({open, onClose, event, onSave, onDelete}) => {
 const [startDate, setStartDate] = useState(dayjs(event.start).format("YYYY-MM-DDTHH:mm"));
 const [endDate, setEndDate] = useState(dayjs(event.end).format("YYYY-MM-DDTHH:mm"));

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
    <h2>Edit booking</h2>
    <p>{event.title}</p>
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
    <Button
     onClick={handleSave}
     type={"button"}
     style={"burger-book-now"}
    >
     Save
    </Button>
    <Button
     onClick={handleDelete}
     type={"button"}
     style={"burger-book-now"}
    >
     Delete
    </Button>
    <Button
     onClick={onClose}
     type={"button"}
     style={"burger-book-now"}
    >
     Cancel
    </Button>
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
