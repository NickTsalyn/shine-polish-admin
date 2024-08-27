import React, {useState, useEffect} from "react";
import BasicModal from "../UI/Modal";
import Button from "../UI/Button";
import {TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {EditEventModalProps, Booking} from "@/interfaces";
import axios from "axios";
import {deleteEvent, getBookings, getExtras, updateEvent} from "@/helpers/api";
import {setAuthHeader} from "@/helpers/auth";
import CalendarField from "../UI/CalendarField";

const EditEventModal: React.FC<EditEventModalProps> = ({open, onClose, event, onSave, onDelete}) => {
 const handleSave = (updatedEvent: any) => {
  onSave(updatedEvent);
 };
 return (
  <BasicModal
   open={open}
   onClose={onClose}
  >
   <div className="mb-4 lg:mb-6">
    <h2 className="text-[24px] md:text-[32px] text-accent text-center ">Edit booking</h2>
    <p className="text-subtext">
     Are you sure you want to edit this booking? <br /> This action cannot be undone.
     <br /> Please select the new start and end dates.
    </p>
    <p className="text-[24px] text-main">{event.title}</p>
    <p className="text-[18px] text-text">{`${event.email}, ${event.phone}`}</p>
    <p className="text-[18px] text-text">{`${event.address.street}, ${event.address.city}, ${event.address.state}`}</p>
    <p>{event.specialInstructions}</p>
    <p className="text-[18px] text-text">{`${dayjs(event.selectedDate).format("MM/DD/YYYY")} - ${event.time}`}</p>
    <p>
     {event.extras && event.extras.length > 0 ? `Extras: ${event.extras.join(", ")}` : "Extras: Not specified"}
    </p>{" "}
   </div>
   <div>
    <CalendarField
     event={event}
     onSave={handleSave}
    />
   </div>
   <div className="flex justify-between gap-4">
    {/* <Button
     onClick={handleSave}
     type={"button"}
     style={"confirm"}
    >
     Save
    </Button> */}
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

export default EditEventModal;
