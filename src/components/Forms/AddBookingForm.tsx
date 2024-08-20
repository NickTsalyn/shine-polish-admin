import { Box, SelectChangeEvent, TextField } from "@mui/material";

import CloseButton from "../UI/CloseButton";
import BasicSelect from "../UI/Select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bathroomOptions, bedroomOptions, inputAddressFields, inputFields } from "@/data/bookingOptions";
import MultipleSelectCheckmarks from "../UI/CheckedSelect";
import Button from "../UI/Button";
import { styledTextField } from "@/styles/overrides";
import { Address, Form } from "@/types/types";
import { initialForm } from "@/data/initialForm";

type Props = {
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  onClose: () => void;
};

export default function AddBookingForm({ onClose }: Props) {
  const [data, setData] = useState<{
    areaOptions: { name: string; value: number | string }[];
    discountOptions: { name: string; value: number }[];
    serviceOptions: { name: string; value: number }[];
    extrasOptions: { name: string; value: number }[];
  } | null>(null);
  const [form, setForm] = useState<Form>(initialForm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setResult(form);
    try {
      const response = await axios.post("https://shine-polish-server.onrender.com/bookings", form);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex flex-col gap-4 md:gap-6 ">
      <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl">Add Booking</h2>
      <form
        className="p-3 flex flex-col gap-4 text-sand max-h-[300px] md:max-h-[500px] overflow-y-auto "
        onSubmit={handleSubmit}
      >
        <BasicSelect name="areas" placeholder="Area*" value={form.area} items={areas} onChange={handleChange} />
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
            size="small"
            value={form.address[field.name as keyof Address] || ""}
            name={field.name}
            onChange={handleInputChange}
            sx={{
              width: field.width,
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
              size="small"
              value={form.address.street}
              name={field.name}
              onChange={handleInputChange}
              sx={{
                width: field.width,
                ...styledTextField,
              }}
            />
          ))}
        </div>
        <Button type="submit" style="confirm">
          Submit
        </Button>
      </form>
      <CloseButton type="button" onClick={onClose} />
    </div>
  );
}
