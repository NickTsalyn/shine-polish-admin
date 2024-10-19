"use client";
import { getClientBookings, getEmployees, getOptions } from "@/helpers/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LetterAvatar from "@/components/UI/LetterAvatar";
import { AddressIcon, EmailIcon } from "@/components/images";
import { FormValues } from "@/types/interfaces";
import axios from "axios";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import SelectWithAvatar from "@/components/UI/SelectWithAvatar";
import Loading from "@/components/Loading";

interface ClientBookingsProps {
  bookingId: string;
}

export default function ClientBookings({ bookingId }: ClientBookingsProps) {
  const [clientBooking, setClientBooking] = useState<FormValues | null>(null);

  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["client-booking", bookingId],
    queryFn: () => getClientBookings(bookingId),
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
  const employees = useQuery({
    queryKey: ["get-employees"],
    queryFn: getEmployees,
  });

  const handleChooseBooking = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
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

  if (isError) {
    // console.log(query.error.message);
    // console.log(axios.isAxiosError(error));
    // if (error.response.status === 401) {
    //   return <p>You are not authorized</p>;
    // }
    return <p>{error.message}</p>;
  }

  if (isPending) {
    return <Loading />;
  }
  if (isSuccess && !bookings.length) {
    return <p>You do not have any bookings yet</p>;
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[minmax(180px,_1fr)_minmax(180px,_1fr)_minmax(180px,_1fr)_minmax(520px,_1fr)] xl:grid-cols-[minmax(285px,_1fr)_minmax(285px,_1fr)_minmax(135px,_1fr)_minmax(135px,_1fr)_minmax(135px,_1fr)_minmax(380px,_1fr)] gap-x-4 lg:gap-x-8 items-center justify-items-center md:justify-items-start mb-10">
        <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6 flex lg:flex-row-reverse gap-2 md:justify-between md:w-full">
          <p className="flex lg:w-[520px] lg:justify-between items-center text-[10px] md:text-[24px] lg:text-[32px] xl:text-[40px]  mb-8 text-center">
            today:{" "}
            <span className="text-main text-[16px] md:text-[24px] lg:text-[32px] indent-1.5">
              {dayjs().format("MM/DD/YYYY")}
            </span>
            <span className="indent-5">{`${dayjs().format("dddd")}`}</span>
          </p>
          <div className="flex gap-3 md:gap-6 ">
            {/* <CustomDatePicker />
            <CustomTimePicker /> */}
          </div>
        </div>
        <div className="flex h-44 min-h-44 md:h-56 lg:min-h-[245px] gap-6 col-span-2 lg:col-span-2 lg:self-start max-w-[280px] md:max-w-[810px] lg:w-full mb-10 md:mb-16">
          <div className="self-start w-40 md:min-w-[520px] lg:min-w-[405px] flex flex-col gap-y-4 md:gap-y-5 shadow-card-shadow rounded-xl py-3 md:py-7 pl-8 md:pl-16 xl:pl-20 pr-3 body h-full">
            <div className="md:block text-[12px] md:text-[28px] xl:text-[32px] relative ">
              {name} {surname}
              <div className="absolute top-0 -left-6 md:-top-0 md:-left-12 text-[12px]">
                <LetterAvatar fullName={`${name} ${surname}`} />
              </div>
            </div>
            <p className="text-[12px] md:text-[20px] relative">
              {phone}
              <PhoneIphoneIcon className="absolute top-0 -left-5 xl:-top-1 md:-left-10 xl:-left-12 size-4 md:size-7 xl:size-9" />
            </p>

            <div className="text-[12px] md:text-[20px] relative">
              {street}, {city}, {state} {zip}
              <div className="absolute top-0 xl:-top-1 -left-5 md:-left-10 xl:-left-12 size-4 md:size-7 xl:size-9">
                <AddressIcon />
              </div>
            </div>
            <div className="text-[12px] md:text-[20px] relative">
              {email}
              <div className="absolute top-0 xl:-top-1 -left-5 md:-left-10 xl:-left-12 size-4 md:size-7 xl:size-9">
                <EmailIcon />
              </div>
            </div>
          </div>

          {/*list last bookings */}
          <div className="self-start md:self-start lg:justify-self-center col-start-3 col-end-4 h-full ">
            <div className="w-[100px] md:w-[160px] lg:w-[180px]  shadow-card-shadow rounded-xl p-3 px-2 mx-auto h-full">
              <ul className="flex flex-col gap-y-1 max-h-[150px] md:max-h-[198px] overflow-y-auto">
                {bookings.map((booking: any, index: number) => (
                  <li
                    className={
                      booking.selectedDate === clientBooking.selectedDate
                        ? "flex flex-col items-center text-[10px] md:text-sm lg:text-lg text-accent"
                        : "flex flex-col items-center text-[10px] md:text-sm lg:text-lg opacity-20"
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
                      <div className="w-[80px] h-0.5 bg-gray-300"></div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* bokings detail*/}

        {/* Your last bookings*/}
        <div className="w-[320px] md:w-full px-5 md:px-0 mb-10 lg:md:self-start col-span-2 md:col-span-3 lg:col-start-4 lg:row-start-2 lg:col-end-5 lg:row-end-4 xl:col-start-3 xl:col-end-7">
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-1 md:gap-y-3 lg:gap-y-8 text-[12px] leading-6 md:text-[24px] md:leading-normal text-main ">
            <div className="flex flex-col gap-1 md:gap-3 lg:gap-8 xl:gap-10 lg:flex-row lg:col-span-3 xl:col-start-3">
              <div className="flex flex-col gap-1 ">
                <p className="text-inherit">
                  Bedrooms: {clientBooking.bedroom}
                </p>
                <p className="text-inherit ">
                  Bathrooms: {clientBooking.bathroom}
                </p>
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="text-main">{clientBooking.service}</p>
                <p className="text-main">{clientBooking.frequency}</p>
              </div>
            </div>
            <div className="hidden lg:block lg:col-start-1 lg:row-start-1 xl:col-start-1 xl:row-start-1 xl:self-center">
              {/* {employees.isSuccess && (
                <SelectWithAvatar employees={employees.data} />
              )} */}
            </div>

            <ul className="col-span-2 lg:col-span-3 xl:col-span-4 grid row-span-1 grow lg:grid grid-cols-3 xl:col-start-1 xl:grid-cols-4 gap-1 lg:gap-y-3 justify-items-start items-start  pt-[6px] md:pt-0">
              {options.isSuccess &&
                options.data.data.extrasOptions.map(
                  (item: any, index: number) =>
                    item.name === clientBooking.extras[index] ? (
                      <li
                        key={index}
                        className="text-main text-[10px] leading-tight md:text-[20px] md:leading-normal text-start lg:text-start "
                      >
                        {item.name}
                      </li>
                    ) : (
                      <li
                        key={index}
                        className="text-main text-[10px] leading-tight md:text-[20px] md:leading-normal opacity-40 text-start lg:text-start"
                      >
                        {item.name}
                      </li>
                    )
                )}
            </ul>
            <p className="text-accent opacity-20 lg:col-span-3 xl:col-span-2 xl:col-start-1">
              Visit to the facility for work evaluation
            </p>
            <p className="text-inherit text-main text-start col-span-2 md:col-span-3 xl:col-start-3">
              You haven’t cleaning supplies <br />
              (we cab bring it with us)
            </p>
          </div>
        </div>
        {/* Your question*/}
        <div className="w-[320px] md:w-full p-2 md:px-5 md:py-4 lg:pr-8 mb-5 md:mb-10 col-span-2 md:col-span-3 xl:col-start-1 xl:col-end-3 xl:row-start-4 xl:self-start xl:min-h-[150px] rounded-md shadow-card-shadow">
          <h3 className="text-[12px] md:text-2xl text-accent mb-3 md:mb-4">
            Your questions:
          </h3>
          <p className="text-[10px] md:text-[20px] md:leading-6 text-text line-clamp-3 hover:line-clamp-none">
            {clientBooking.specialInstructions}
          </p>
        </div>
        {/* Additional information*/}
        <div className="w-[320px] md:w-full p-2 md:px-5 md:py-4 lg:pr-8 mb-5 md:mb-10 col-span-2 md:col-span-3 xl:col-start-3 xl:col-end-5 xl:row-start-4 xl:self-start xl:min-h-[150px] rounded-md shadow-card-shadow">
          <h3 className="text-[12px] md:text-2xl text-accent mb-3">
            Additional information:
          </h3>
          <p className="text-[10px] md:text-[20px] md:leading-6 text-text line-clamp-3 hover:line-clamp-none">
            {clientBooking.homeAccess}
          </p>
        </div>
        {/* Special Instructions:*/}
        <div className="w-[320px] md:w-full p-2 md:px-5 md:py-4 lg:pr-8 mb-5 md:mb-10 col-span-2 md:col-span-3 xl:col-start-5 xl:col-end-7 xl:row-start-4 xl:self-start xl:min-h-[150px] rounded-md shadow-card-shadow h-auto">
          <h3 className="text-[12px] md:text-2xl text-accent mb-3">
            Special Instructions:
          </h3>
          <p className="text-[10px] md:text-[20px] md:leading-6 text-text line-clamp-3 hover:line-clamp-none">
            {clientBooking.specialInstructions}
          </p>
        </div>
      </div>
    )
  );
}
