import { Box, SelectChangeEvent, TextField } from "@mui/material";

import CloseButton from "../UI/CloseButton";
import BasicSelect from "../UI/Select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bathroomOptions, bedroomOptions } from "@/data/bookingOptions";
import MultipleSelectCheckmarks from "../UI/CheckedSelect";
import Button from "../UI/Button";
import { styledTextField } from "@/styles/overrides";

type Props = {
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  onClose: () => void;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type Form = {
  area: string;
  bedroom: string;
  bathroom: string;
  frequency: string;
  service: string;
  extras: string[];
  additionalInfo?: string;
  name: string;
  surname: string;
  email: string;
  phone: number | string;
  address: Address;
  selectedDate: string;
  time: string;
  aboutUs: string;
  specialInstructions: string;
  homeAccess: string;
  totalPrice: number;
};

export default function AddBookingForm({ onClose }: Props) {
  const [data, setData] = useState<{
    areaOptions: { name: string; value: number | string }[];
    discountOptions: { name: string; value: number }[];
    serviceOptions: { name: string; value: number }[];
    extrasOptions: { name: string; value: number }[];
  } | null>(null);
  const [form, setForm] = useState<Form>({
    area: "",
    bedroom: "",
    bathroom: "",
    frequency: "",
    service: "",
    extras: [],
    additionalInfo: '',
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    selectedDate: "",
    time: "",
    aboutUs: "",
    specialInstructions: "",
    homeAccess: "",
    totalPrice: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shine-polish-server.onrender.com/bookings/options"
        );
        setData(response.data);
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

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const value = event.target.value as string;
    switch (event.target.name) {
      case "areas":
        setForm({ ...form, area: value });
        break;
      case "bedroom":
        setForm({ ...form, bedroom: value });
        break;
      case "bathroom":
        setForm({ ...form, bathroom: value });
        break;
      case "frequency":
        setForm({ ...form, frequency: value });
        break;
      case "service":
        setForm({ ...form, service: value });
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name in form.address) {
      setForm({
        ...form,
        address: {
          ...form.address,
          [name]: value,
        }, 
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    console.log("Value:", value);
    setForm({ ...form, extras: value });
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setResult(form);
    try {
      const response = await axios.post(
        "https://shine-polish-server.onrender.com/bookings",
        form
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  return (
    <div className=" flex flex-col gap-4 md:gap-6">
      <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl">
        Add Booking
      </h2>
      <form
        className="flex flex-col gap-4  items-center text-sand"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
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
          <TextField
            id="outlined-basic"
            label="First name"
            variant="outlined"
            size="small"
            value={form.name}
            name="name"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Last name"
            variant="outlined"
            size="small"
            value={form.surname}
            name="surname"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            value={form.email}
            name="email"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            size="small"
            value={form.phone}
            name="phone"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            size="small"
            value={form.address.street}
            name="street"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            size="small"
            value={form.address.city}
            name="city"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="State"
            variant="outlined"
            size="small"
            value={form.address.state}
            name="state"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-basic"
            label="ZIP Code"
            variant="outlined"
            size="small"
            value={form.address.zip}
            name="zip"
            onChange={handleInputChange}
            sx={{
              width: "30%",
              ...styledTextField,
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Additional Information"
            multiline
            rows={4}
            variant="outlined"
            size="small"
            value={form.additionalInfo || ""}
            name="additionalInfo"
            onChange={handleInputChange}
            sx={{
              width: "56%",
              ...styledTextField,
            }}
          />
        </div>
        <Button type="submit" style="confirm">
          Submit
        </Button>
      </form>
      <CloseButton type="button" onClick={onClose} />
    </div>
  );
}
