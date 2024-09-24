import React, {useState, useEffect} from "react";
import {ShineLogo} from "./images";
import {getBookings} from "@/helpers/api";
import {UpdateEventPayload} from "@/types/interfaces";
interface LetterProps {
 booking: UpdateEventPayload;
}
const LetterSuccess: React.FC<LetterProps> = ({booking}) => {
 //  const [booking, setBooking] = useState({
 //   name: "",
 //   surname: "",
 //   selectedDate: "",
 //   area: "",
 //   extras: [],
 //   address: {
 //    street: "",
 //    city: "",
 //    state: "",
 //    zip: "",
 //   },
 //   phone: "",
 //   email: "",
 //   frequency: "",
 //   aboutUs: "",
 //   specialInstructions: "",
 //   homeAccess: "",
 //   bathroom: "",
 //   bedroom: "",
 //   service: "",
 //   description: "",
 //   totalPrice: "",
 //   time: "",
 //  });
 useEffect(() => {
  getBookings();
 }, []);
 return (
  <>
   <h1 className="hidden">Shine Polish Letter Template</h1>
   <div className="flex justify-center">
    <ShineLogo />

    <p>Confirmation of Your Shine&Polish Cleaning Service Order</p>
   </div>
   <h2>
    Dear {booking.name} {booking.surname},
   </h2>
   <p>Thank you for choosing Shine&Polish for your cleaning service!</p>
   <p>Your cleaning service order has been successfully confirmed. Below are the details of your order:</p>
   <ul>
    <li>
     Date: {booking.selectedDate} at {booking.time}{" "}
    </li>
    <li>Phone: {booking.phone}</li>
    <li>Email: {booking.email}</li>
    <li>
     Address: {booking.address.street}, {booking.address.city}, {booking.address.state}
    </li>
    <li>
     {booking.bedroom} bedrooms, {booking.bathroom} bathrooms
    </li>
    <li>Servises: {booking.service}</li>
    <li>Frequency: {booking.frequency}</li>
    <li>
     Extras: {booking.extras && booking.extras.length > 0 ? ` ${booking.extras.join(", ")}` : "Extras: Not specified"}
    </li>

    <li>Area:{booking.area ? ` ${booking.area}` : "Area: Not specified"}</li>
    <li> Special Instruction: {booking.specialInstructions}</li>
    <li>Home access:{booking.homeAccess}</li>
    <li> Tips: {booking.tips} </li>
    <li>Total price: {booking.totalPrice}</li>
   </ul>
   <h3>What to Expect Next:</h3>
   <ul>
    <li>1. Our team will arrive at the specified address at the scheduled time.</li>
    <li>2. Please make sure the premises are accessible.</li>
    <li>3. If you have any questions or need to make changes to your order, feel free to contact us in advance.</li>
   </ul>
   <p>
    We’re committed to making your home shine and feel cozy! Should you have any questions or need further assistance,
    please reach out to us at [Contact Phone Number] or via email at [Company’s Email Address].
   </p>
   <p>We look forward to serving you!</p>
   <p>Best regards, The Shine&Polish Team</p>
   <link>[Company Website Link]</link>
   <link>[Social Media Links]</link>
  </>
 );
};

export default LetterSuccess;
