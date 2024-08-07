import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseButton from "../UI/CloseButton";

type Props = {
  onClose: () => void;
};

type InputValues = {
  base: string;
  coff: string;
  bathPrice: string;
};

type InputField = {
  id: string;
  label: string;
  name: keyof InputValues;
};

const inputFields: InputField[] = [
  { id: "1", name: "base", label: "Base price" },
  { id: "2", name: "coff", label: "Coff price" },
  { id: "3", name: "bathPrice", label: "Bath price" },
];

export default function PriceForm({ onClose }: Props) {
  const [inputValues, setInputValues] = useState<InputValues>({
    base: '',
    coff: '',
    bathPrice: ''
  });
  const [result, setResult] = useState<{ base: number; coff: number; bathPrice: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://shine-polish-server.onrender.com/bookings/options");
        setResult(data);
        setInputValues({
          base: data.base.toString(),
          coff: data.coff.toString(),
          bathPrice: data.bathPrice.toString(),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setInputValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedPricing = {
      base: Number(inputValues.base),
      coff: Number(inputValues.coff),
      bathPrice: Number(inputValues.bathPrice),
    };

    try {
      const { data } = await axios.put("https://shine-polish-server.onrender.com/admin/bookings/pricing", updatedPricing);
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] h-[427px] bg-white rounded-xl flex flex-col gap-8">
      <h2 className="text-accent text-4xl">Change Price</h2>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col gap-8 items-center text-sand"
        onSubmit={handleSubmit}
      >
        {inputFields.map(field => (
          <div key={field.id} className="flex flex-row justify-between items-center w-full">
            <TextField
              label={field.label}
              variant="outlined"
              size="small"
              className="border-2 border-solid border-sand rounded-xl text-sm w-3/4"
              value={inputValues[field.name]}
              name={field.name}
              onChange={handleChange}
            />
            <button className="w-1/4 text-main">
              <EditRoundedIcon fontSize="large" />
            </button>
          </div>
        ))}
        <CloseButton type="button" onClick={onClose} />
      </Box>
    </div>
  );
}
