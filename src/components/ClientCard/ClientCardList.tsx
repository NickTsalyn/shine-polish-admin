"use client";

import React, {useEffect, useState} from "react";
import ClientCard from "./ClientCard";
import {Booking} from "@/interfaces";
import {getBookings} from "@/helpers/api";

const ClientCardList: React.FC = () => {
 const [bookings, setBookings] = useState<Booking[]>([]);

 useEffect(() => {
  const fetchData = async () => {
   const bookings = await getBookings();
   console.log("Original Bookings:", bookings);
   if (Array.isArray(bookings)) {
    const uniqueClients = bookings.filter(
     (booking, index, self) => index === self.findIndex((b) => b.email === booking.email)
    );
    setBookings(uniqueClients);
    console.log("Filtered Unique Clients:", uniqueClients);
   } else {
    console.error("Bookings is not an array:", bookings);
   }
  };
  fetchData();
 }, []);

 return (
  <div className="flex flex-col  w-[320px] mr-4 lg:h-[830px] md:w-[768px] m-auto  lg:w-[380px] mb-10">
   <h2 className="text-3xl mb-5 text-main text-center">Our Clients</h2>
   <div className="flex h-[240px] lg:h-[800px] rounded-xl justify-center lg:flex-col gap-4 xl:max-h-[900px] overflow-y-auto box-border">
    {bookings.map((booking) => (
     <ClientCard
      key={booking._id}
      booking={booking}
     />
    ))}
   </div>
  </div>
 );
};

export default ClientCardList;
