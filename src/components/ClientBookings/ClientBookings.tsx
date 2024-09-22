"use client";
import {
  getClientBookings,
  getOptions,
  //   repeatBooking,
} from "@/helpers/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LetterAvatar from "@/components/UI/LetterAvatar";
import { AddressIcon, EmailIcon } from "@/components/images";
import { FormValues } from "@/types/interfaces";
// import ReviewRating from "@/components/UI/ReviewRating";
import Link from "next/link";
import axios from "axios";

import dayjs, { Dayjs } from "dayjs";
// import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";
// import Loading from "@/app/loading";

interface ClientBookingsProps {
  ownerId: string;
}

export default function ClientBookings({ ownerId }: ClientBookingsProps) {
  const [clientBooking, setClientBooking] = useState<FormValues | null>(null);
  const router = useRouter();

  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["client-bookings", ownerId],
    queryFn: () => getClientBookings(ownerId),
  });
  if (axios.isAxiosError(error)) {
    error;
    // ^? const error: AxiosError
  }
  const bookings = data;
  useEffect(() => {
    if (bookings) {
      setClientBooking(bookings[bookings.length - 1]);
    }
  }, [bookings]);

  const options = useQuery({
    queryKey: ["bookings-options"],
    queryFn: getOptions,
  });

  //   const mutation = useMutation({
  //     mutationFn: (newBooking: FormValues) => repeatBooking(newBooking),
  //     onSuccess: (data) => {
  //       setClientBooking(data);
  //       bookings.push(data);
  //        },
  //     onError: (error: any) => {
  //       // An error happened!
  //       console.log(`Була помилка`, error);
  //     },
  //   });

  //   const onRepeatBooking = async (clientBooking: any) => {
  //     const { _id, createdAt, updatedAt, ...newBooking } = clientBooking;
  //     console.log("Sent body", newBooking);
  //     const res = mutation.mutate(newBooking);
  //     console.log(res);
  //   };

  const handleChooseBooking = (
    event: React.MouseEvent<HTMLButtonElement>
  ): any => {
    const currentTarget = event.currentTarget as HTMLButtonElement;
    const index = Number(currentTarget.value);
    const selectedBooking = bookings.find(
      (booking: FormValues, idx: number): any => {
        if (index === idx) {
          return booking;
        }
      }
    );
    setClientBooking(selectedBooking);
  };

  const handleDateChange = (date: Dayjs | null): void => {
    setClientBooking((prevForm: any) => ({
      ...prevForm,
      ["selectedDate"]: date ? date.format("MM/DD/YYYY") : null,
    }));
  };

  const handleTimeChange = (time: Dayjs | null): void => {
    setClientBooking((prevForm: any) => ({
      ...prevForm,
      ["time"]: time ? time.format("h:mm A") : null,
    }));
  };

  if (isError) {
    // console.log(query.error.message);
    // console.log(axios.isAxiosError(error));
    // if (error.response.status === 401) {
    //   return <p>You are not authorized</p>;
    // }
    return <p>{error.message}</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
    // return <Loading/>
  }
  if (isSuccess && !bookings.length) {
    return <p>You do not have any bookings yet</p>;
  }
  if (isSuccess) {
  }
  const {
    name,
    surname,
    phone,
    email,
    address: { street, city, state, zip },
  } = bookings[0];

  return (
    isSuccess &&
    clientBooking && (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[minmax(200px,_1fr)_minmax(200px,_1fr)_minmax(200px,_1fr)_minmax(478px,_1fr)] xl:grid-cols-[minmax(270px,_1fr)_minmax(270px,_1fr)_minmax(270px,_1fr)_minmax(684px,_1fr)]  gap-x-4 items-center justify-items-center md:justify-items-start mb-10">
        <div className="col-span-2 lg:col-span-2 max-w-[280px] md:max-w-[810px] lg:w-full">
          <h2 className="text-accent text-[28px] md:text-[40px] font-bold px-5 mb-8">
            Hello, {name} {surname}
          </h2>

          <div className="flex flex-col gap-y-4 md:gap-y-5  shadow-main-shadow rounded-xl py-5 md:py-7 pl-16 xl:pl-20  pr-10 body mb-10 mx-auto">
            <div className="hidden md:block text-[16px] md:text-[28px] xl:text-[32px] relative ">
              {name} {surname}
              <div className="absolute -top-0 -left-12">
                <LetterAvatar fullName={`${name} ${surname}`} />
              </div>
            </div>
            <p className="text-[16px] md:text-[20px] relative">
              {phone}
              <PhoneIphoneIcon className="absolute top-0 xl:-top-1 -left-10 xl:-left-12 size-6 md:size-7 xl:size-9" />
            </p>

            <div className="text-[16px] md:text-[20px] relative">
              {street}, {city}, {state} {zip}
              <div className="absolute top-0 xl:-top-1 -left-10 xl:-left-12 size-6 md:size-7 xl:size-9">
                <AddressIcon />
              </div>
            </div>
            <div className="text-[16px] md:text-[20px] relative">
              {email}
              <div className="absolute top-0 xl:-top-1 -left-10 xl:-left-12 size-6 md:size-7 xl:size-9">
                <EmailIcon />
              </div>
            </div>
          </div>
        </div>
        {/*list last bookings */}
        <div className="self-center md:self-start lg:justify-self-center lg:col-start-3 lg:col-end-4 xl:w-full xl:p-5">
          <div className="w-[220px] lg:w-[180px] xl:w-full shadow-main-shadow rounded-xl p-4 px-2 mb-10 mx-auto">
            <h3 className="text-[24px] mb-5 text-accent text-center">
              Your bookings
            </h3>
            <ul className="flex flex-col gap-y-1 max-h-[225px] md:max-h-[160px] overflow-y-auto overflow-x-hidden ">
              {bookings.map((booking: any, index: number) => (
                <li
                  className={
                    booking.selectedDate === clientBooking.selectedDate
                      ? "flex flex-col items-center text-[20px] text-accent"
                      : "flex flex-col items-center text-[20px]  opacity-20"
                  }
                  key={index}
                >
                  <button
                    className=" focus:outline-0"
                    autoFocus={
                      booking.selectedDate === clientBooking.selectedDate
                    }
                    type="button"
                    value={index}
                    onClick={(event) => handleChooseBooking(event)}
                  >
                    {booking.selectedDate
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                    <div className="w-[187px] h-0.5 bg-gray-300"></div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="flex flex-col items-center mb-10 md:mb-0">
            <div className="w-[120px] mb-3">
              <ReviewRating />
            </div>
            <Link href={""} className="text-accent text-[20px]">
              Send review
            </Link>
          </div> */}
        </div>
        {/* bokings detail*/}
        {/* Your question*/}
        <div className="w-[320px] md:w-full px-5 md:px-0 lg:pr-8 mb-10 col-span-2 md:col-span-3">
          <h3 className="text-[20px] text-main mb-4">Your questions:</h3>
          <p className="text-[20px] leading-6 text-text overflow-y-hidden max-h-[76px] ">
            {clientBooking.specialInstructions}
          </p>
        </div>
        {/* Additional information*/}
        <div className="w-[320px] md:w-full px-5 md:px-0 lg:pr-8 mb-10 col-span-2 md:col-span-3">
          <h3 className="text-[20px] text-main mb-4">
            Additional information:
          </h3>
          <p className="text-[20px] leading-6 text-text overflow-y-hidden max-h-[76px] ">
            {clientBooking.homeAccess}
          </p>
        </div>
        {/* Special Instructions:*/}
        <div className="w-[320px] md:w-full px-5 md:px-0 lg:pr-8 mb-10 col-span-2 md:col-span-3">
          <h3 className="text-[20px] text-main mb-4">Special Instructions:</h3>
          <p className="text-[20px] leading-6 text-text overflow-y-hidden max-h-[76px] ">
            {clientBooking.specialInstructions}
          </p>
        </div>
        {/* Your last bookings*/}
        <div className="w-[320px] md:w-full px-5 md:px-0 mb-10 lg:md:self-start col-span-2 md:col-span-3 lg:col-start-4 lg:row-start-1 lg:col-end-5 lg:row-end-3">
          <h3 className="text-[32px] lg:text-[40px] xl:text-[42px] text-accent mb-6">
            Your last bookings:
          </h3>
          <div className="text-[16px] lg:text-[20px] leading-6 text-text grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 md:gap-y-12">
            <div className="flex flex-col gap-3">
              <p className="text-inherit">Bedrooms: {clientBooking.bedroom}</p>
              <p className="text-inherit ">
                Bathrooms: {clientBooking.bathroom}
              </p>
              <p className="text-main opacity-20">
                Extra Living Room/ <br /> Bonus Room
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-main">{clientBooking.service}</p>
              <p className="text-main">{clientBooking.frequency}</p>
              <p className="text-accent opacity-20">
                Visit to the facility for work evaluation
              </p>
            </div>
            <p className="text-inherit text-main text-center col-span-2 md:col-span-1">
              You haven’t cleaning supplies <br />
              (we cab bring it with us)
            </p>
            <ul className="col-span-2 md:col-span-3 flex flex-wrap lg:grid grid-cols-2 gap-5 justify-between items-start xl:grid-cols-3">
              {options.data.data.extrasOptions.map((item: any, index: number) =>
                item.name === clientBooking.extras[index] ? (
                  <li
                    key={index}
                    className="text-main lg:text-[20px] text-center lg:text-start"
                  >
                    {item.name}
                  </li>
                ) : (
                  <li
                    key={index}
                    className="text-main lg:text-[20px] opacity-40 text-center lg:text-start"
                  >
                    {item.name}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  );
}
