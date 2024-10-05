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
// import TimePickerComponent from "@/components/UI/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DigitalClock,
  StaticDatePicker,
} from "@mui/x-date-pickers";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useRouter } from "next/navigation";
// import Loading from "@/app/loading";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CustomDatePicker from "@/components/DatePicker";
import CustomTimePicker from "@/components/TimePicker";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

interface ClientBookingsProps {
  bookingId: string;
}

export default function ClientBookings({ bookingId }: ClientBookingsProps) {
  const [clientBooking, setClientBooking] = useState<FormValues | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const router = useRouter();
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

  const handleTimeChange = (newTime: Dayjs | null) => {
    setTime(newTime);
    console.log("New time", newTime);
    // onTimeChange(newTime);
    console.log("New time2", newTime);
    setIsTimeOpen(false);
  };
  const openTimePicker = () => {
    setIsTimeOpen(!isTimeOpen);
  };
  const openDatePicker = () => {
    setIsDateOpen(!isDateOpen);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    console.log("New date", date);
    // onDateChange(date);
    console.log("New date2", date);
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[minmax(180px,_1fr)_minmax(180px,_1fr)_minmax(180px,_1fr)_minmax(520px,_1fr)] xl:grid-cols-[minmax(270px,_1fr)_minmax(270px,_1fr)_minmax(270px,_1fr)_minmax(684px,_1fr)] gap-x-4 lg:gap-x-8 items-center justify-items-center md:justify-items-start mb-10">
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex lg:flex-row-reverse gap-2 md:justify-between md:w-full">
          <p className="flex  items-center text-[10px] md:text-[24px] lg:text-[28px] xl:text-[40px]  mb-8 text-center">
            today:{" "}
            <span className="text-main text-[16px] md:text-[24px] indent-1.5">
              {dayjs().format("MM/DD/YYYY")}
            </span>
            <span className="indent-5">{`${dayjs().format("dddd")}`}</span>
          </p>
          <div className="flex gap-3 md:gap-6 ">
            <CustomDatePicker />
            <CustomTimePicker />
          </div>
        </div>
        <div className="flex h-44 min-h-44 md:h-56 gap-6 col-span-2 lg:col-span-3 lg:self-start max-w-[280px] md:max-w-[810px] lg:w-full mb-10 md:mb-16">
          {/* <div className="flex space-x-6 lg:space-x-0 lg:space-y-10 mb-7 md:mb-0 md:self-center lg:grid lg:justify-self-start lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-5 xl:flex xl:space-x-6 xl:space-y-0">
            
          </div> */}

          <div className="self-start w-40 md:min-w-[520px] lg:min-w-[350px] flex flex-col gap-y-4 md:gap-y-5 shadow-card-shadow rounded-xl py-3 md:py-7 pl-8 md:pl-16 xl:pl-20 pr-3 body ">
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
          <div className="self-start md:self-start lg:justify-self-center col-start-3 col-end-4  xl:w-full xl:p-5 h-full ">
            <div className="w-[100px] md:w-[160px] lg:w-[180px] xl:w-full shadow-card-shadow rounded-xl p-3 px-2 mx-auto h-full">
              {/* <h3 className="text-[12px] md:text-lg mb-5 text-accent text-center">
                Last bookings
              </h3> */}
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
            {/* <div className="flex flex-col items-center mb-10 md:mb-0">
            <div className="w-[120px] mb-3">
              <ReviewRating />
            </div>
            <Link href={""} className="text-accent text-[20px]">
              Send review
            </Link>
          </div> */}
          </div>
        </div>
        {/* bokings detail*/}

        {/* Your last bookings*/}
        <div className="w-[320px] md:w-full px-5 md:px-0 mb-10 lg:md:self-start col-span-2 md:col-span-3 lg:col-start-4 lg:row-start-2 lg:col-end-5 lg:row-end-4">
          <div className="grid grid-cols-3 gap-x-2 gap-y-1 md:gap-y-3 lg:gap-y-8 text-[12px] leading-6 md:text-[24px] md:leading-normal text-main ">
            <div className="flex flex-col gap-1 md:gap-3 lg:gap-8 lg:flex-row lg:col-span-3 ">
              <div className="flex flex-col gap-1 ">
                <p className="text-inherit">
                  Bedrooms: {clientBooking.bedroom}
                </p>
                <p className="text-inherit ">
                  Bathrooms: {clientBooking.bathroom}
                </p>
              </div>
              {/* <p className="text-main opacity-20">
                Extra Living Room/ <br /> Bonus Room
              </p> */}

              <div className="flex flex-col gap-1 ">
                <p className="text-main">{clientBooking.service}</p>
                <p className="text-main">{clientBooking.frequency}</p>
              </div>
            </div>

            <ul className="col-span-2 lg:col-span-3 grid row-span-1 grow  lg:grid grid-cols-3 gap-1 lg:gap-y-3 justify-items-start items-start xl:grid-cols-3 pt-[6px] md:pt-0">
              {options.data.data.extrasOptions.map((item: any, index: number) =>
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
            <p className="text-accent opacity-20 lg:col-span-3">
              Visit to the facility for work evaluation
            </p>
            <p className="text-inherit text-main text-start col-span-2 md:col-span-3">
              You haven’t cleaning supplies <br />
              (we cab bring it with us)
            </p>
          </div>
        </div>
        {/* Your question*/}
        <div className="w-[320px] md:w-full p-2 md:px-5 md:py-4 lg:pr-8 mb-5 md:mb-10 col-span-2 md:col-span-3 rounded-md shadow-card-shadow">
          <h3 className="text-[12px] md:text-2xl text-accent mb-3 md:mb-4">
            Your questions:
          </h3>
          <p className="text-[10px] md:text-[20px] md:leading-6 text-text line-clamp-3 hover:line-clamp-none">
            {clientBooking.specialInstructions}
          </p>
        </div>
        {/* Additional information*/}
        <div className="w-[320px] md:w-full p-2 md:px-5 md:py-4 lg:pr-8 mb-5 md:mb-10 col-span-2 md:col-span-3 rounded-md shadow-card-shadow">
          <h3 className="text-[12px] md:text-2xl text-accent mb-3">
            Additional information:
          </h3>
          <p className="text-[10px] md:text-[20px] md:leading-6 text-text line-clamp-3 hover:line-clamp-none">
            {clientBooking.homeAccess}
          </p>
        </div>
        {/* Special Instructions:*/}
        <div className="w-[320px] md:w-full p-2 md:px-5 md:py-4 lg:pr-8 mb-5 md:mb-10 col-span-2 md:col-span-3 rounded-md shadow-card-shadow h-auto">
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
