"use client";

import React, { useEffect } from "react";

import ClientCard from "./ClientCard";
import { Booking } from "@/interfaces";
import { getBookings } from "@/helpers/api";
import Loading from "../Loading";

const ClientCardList: React.FC = () => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const bookings = await getBookings();
      if (Array.isArray(bookings)) {
        setBookings(bookings);
        console.log("Bookings:", bookings);
      } else {
        console.error("Bookings is not an array:", bookings);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-[320px] mr-10 lg:h-[980px] md:w-[768px] m-auto lg:mx-10 lg:w-[320px]">
      <h2 className="text-3xl mb-5 text-main text-center">Our Clients</h2>
      <div className="flex  lg:flex-col gap-4 max-h-[900px] overflow-y-auto box-border">
        {bookings.map((booking) => (
          <ClientCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};
export default ClientCardList;
