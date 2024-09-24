import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {useEffect, useState} from "react";
import CloseButton from "../UI/CloseButton";
import {styledTextField} from "../../styles/overrides";
import {getPrice, updatePrice} from "@/helpers/api";
import {useSnackbar} from "notistack";

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
 {id: "1", name: "base", label: "Base price"},
 {id: "2", name: "coff", label: "Coff price"},
 {id: "3", name: "bathPrice", label: "Bath price"},
];

export default function PriceForm({onClose}: Props) {
 const {enqueueSnackbar} = useSnackbar();
 const [inputValues, setInputValues] = useState<InputValues>({
  base: "",
  coff: "",
  bathPrice: "",
 });
 const [result, setResult] = useState<{
  base: number;
  coff: number;
  bathPrice: number;
 } | null>(null);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const data = await getPrice();
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
  const {name, value} = event.target;
  if (/^\d*\.?\d*$/.test(value)) {
   setInputValues((prev) => ({
    ...prev,
    [name]: value,
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
   const {data} = await updatePrice(updatedPricing);
   setResult(data);
   enqueueSnackbar("Data updated successfully", {variant: "success"});
  } catch (error) {
   enqueueSnackbar("Error updating Data", {variant: "error"});
  } finally {
   onClose();
  }
 };

 return (
  <>
   <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6 xl:mb-8 text-center">Change Price</h2>
   <Box
    component="form"
    noValidate
    autoComplete="off"
    className="flex flex-col gap-4 md:gap-8 items-center text-secondary mb-4 md:mb-6 xl:md-8"
    onSubmit={handleSubmit}
   >
    {inputFields.map((field) => (
     <div
      key={field.id}
      className="flex flex-row justify-between items-center w-full"
     >
      <TextField
       label={field.label}
       variant="outlined"
       // size="small"
       value={inputValues[field.name]}
       name={field.name}
       onChange={handleChange}
       sx={{
        width: "75%",
        height: "56px",
        ...styledTextField,
       }}
      />
      <button className="w-1/4 text-main">
       <EditRoundedIcon className="size-6 lg:size-9" />
      </button>
     </div>
    ))}
    <CloseButton
     type="button"
     onClick={onClose}
    />
   </Box>
  </>
 );
}
