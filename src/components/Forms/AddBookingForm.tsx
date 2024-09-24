"use client";
import {Box, CircularProgress, SelectChangeEvent, TextField} from "@mui/material";
import CloseButton from "../UI/CloseButton";
import BasicSelect from "../UI/Select";
import React, {useEffect, useState} from "react";
import {bathroomOptions, bedroomOptions, inputAddressFields, inputFields} from "@/data/bookingOptions";
import MultipleSelectCheckmarks from "../UI/CheckedSelect";
import Button from "../UI/Button";
import {styledTextField} from "@/styles/overrides";
import {Address, Form} from "@/types/types";
import {initialForm} from "@/data/initialForm";
import DateTime from "../../components/DateTimePicker";
import dayjs, {Dayjs} from "dayjs";
import {addBooking, getOptions} from "@/helpers/api";
import {useSnackbar} from "notistack";

type Props = {
 onClose: () => void;
};

export default function AddBookingForm({onClose}: Props) {
 const {enqueueSnackbar} = useSnackbar();
 const [data, setData] = useState<{
  areaOptions: {name: string; value: number | string}[];
  discountOptions: {name: string; value: number}[];
  serviceOptions: {name: string; value: number}[];
  extrasOptions: {name: string; value: number}[];
 } | null>(null);

 const [form, setForm] = useState<Form>(initialForm);
 const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
 const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   try {
    setIsLoading(true);
    const options = await getOptions();
    setData(options.data);
    setIsLoading(false);
   } catch (error) {
    console.error(error);
   }
  };

  fetchData();
 }, []);

 const areas =
  data?.areaOptions.map((area) => {
   return {
    value: area.name,
    label: area.name,
   };
  }) || [];

 const frequencyOptions =
  data?.discountOptions.map((item) => {
   return {
    value: item.name,
    label: item.name,
   };
  }) || [];

 const services =
  data?.serviceOptions.map((service) => {
   return {
    value: service.name,
    label: service.name,
   };
  }) || [];

 const extras =
  data?.extrasOptions.map((extra) => {
   return {
    value: extra.name,
    name: extra.name,
   };
  }) || [];

 const handleStart = (date: Dayjs | null) => {
  setStartTime(date);
  if (date) {
   setForm({
    ...form,
    selectedDate: date.format("YYYY-MM-DD"),
    time: date.format("HH:mm"),
   });
  }
 };

 const handleEnd = (date: Dayjs | null) => {
  setEndDate(date);
  if (date) {
   setForm({
    ...form,
    endDate: date.format("YYYY-MM-DD"),
   });
  }
 };

 const handleChange = (event: SelectChangeEvent<string | number>) => {
  const value = event.target.value as string;

  switch (event.target.name) {
   case "areas":
    setForm({...form, area: value});
    break;
   case "bedroom":
    setForm({...form, bedroom: value});
    break;
   case "bathroom":
    setForm({...form, bathroom: value});
    break;
   case "frequency":
    setForm({...form, frequency: value});
    break;
   case "service":
    setForm({...form, service: value});
    break;
   default:
    break;
  }
 };

 const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = event.target;
  if (name in form.address) {
   setForm({
    ...form,
    address: {
     ...form.address,
     [name]: value,
    },
   });
  } else {
   setForm({...form, [name]: value});
  }
 };

 const handleCheckChange = (event: SelectChangeEvent<string[]>) => {
  const value = event.target.value as string[];
  setForm({...form, extras: value});
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  const bookingData = {
   ...form,
   startTime,
   endDate,
  };
  try {
   const response = await addBooking(form as Form);
   enqueueSnackbar("Booking added successfully", {variant: "success"});
  } catch (error) {
   enqueueSnackbar("Error adding booking", {variant: "error"});
  } finally {
   setIsLoading(false);
   onClose();
  }
 };

 return (
  <div className=" flex flex-col gap-4 md:gap-6 ">
   <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl text-center">Add Booking</h2>
   {isLoading ? (
    <Box
     sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#006778",
      height: "300px",
     }}
    >
     <CircularProgress />
    </Box>
   ) : (
    <form
     className="p-3 flex flex-col gap-4 text-sand max-h-[300px] md:max-h-[500px] overflow-y-auto "
     onSubmit={handleSubmit}
    >
     <BasicSelect
      name="areas"
      placeholder="Area*"
      value={form.area}
      items={areas}
      onChange={handleChange}
     />
     <BasicSelect
      name="bedroom"
      placeholder="Bedrooms*"
      value={form.bedroom}
      items={bedroomOptions}
      onChange={handleChange}
     />
     <BasicSelect
      name="bathroom"
      placeholder="Bathrooms*"
      value={form.bathroom}
      items={bathroomOptions}
      onChange={handleChange}
     />
     <BasicSelect
      name="frequency"
      placeholder="Booking frequency*"
      value={form.frequency}
      items={frequencyOptions}
      onChange={handleChange}
     />
     <BasicSelect
      name="service"
      placeholder="Booking service*"
      value={form.service}
      items={services}
      onChange={handleChange}
     />
     <MultipleSelectCheckmarks
      name="extras"
      placeholder="Extras*"
      value={form.extras || []}
      items={extras}
      onChange={handleCheckChange}
     />

     {inputFields.map((field) => (
      <TextField
       key={field.id}
       id="outlined-basic"
       label={field.label}
       variant="outlined"
       //  size="small"
       value={form[field.name as keyof Form] || ""}
       name={field.name}
       onChange={handleInputChange}
       sx={{
        width: field.width,
        height: "56px",
        ...styledTextField,
       }}
      />
     ))}

     <div className="inline-flex gap-2 flex-wrap">
      {inputAddressFields.map((field) => (
       <TextField
        key={field.id}
        id="outlined-basic"
        label={field.label}
        variant="outlined"
        // size="small"
        value={form.address[field.name as keyof Address] || ""}
        name={field.name}
        onChange={handleInputChange}
        sx={{
         width: field.width,
         height: "56px",
         ...styledTextField,
        }}
       />
      ))}
     </div>
     <DateTime
      onStartTime={handleStart}
      onEndTime={handleEnd}
     />
     <Button
      type="submit"
      style="confirm"
     >
      Submit
     </Button>
    </form>
   )}
   <CloseButton
    type="button"
    onClick={onClose}
   />
  </div>
 );
}
