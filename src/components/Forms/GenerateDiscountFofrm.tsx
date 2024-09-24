import React, {useState} from "react";
import {useSnackbar} from "notistack";
import CloseButton from "../UI/CloseButton";
import Button from "../UI/Button";
import {Box, CircularProgress, SelectChangeEvent, TextField} from "@mui/material";
import {discountCodesNames} from "../Arrays";
import {DiscounteField} from "../DiscountField";
import BasicSelect from "../UI/Select";
import {styled} from "@mui/material/styles";

interface DiscountFofrmProps {
 onClose: () => void;

 isLoading: boolean;
}

const DiscountForm: React.FC<DiscountFofrmProps> = ({onClose, isLoading}) => {
 const [discountData, setDiscountData] = useState<{label: string; discount: string; sale: number}[]>([]);
 const [sale, setSale] = useState<number | null>(null);
 const [discount, setDiscount] = useState<string>("");
 const [selectedDiscount, setSelectedDiscount] = useState<string>("");
 const {enqueueSnackbar} = useSnackbar();
 const [errorMessages, setErrorMessages] = useState<{discount: string; sale: string; selectedDiscount: string}>({
  discount: "",
  sale: "",
  selectedDiscount: "",
 });

 const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  if (discount && selectedDiscount && sale !== null) {
   const newDiscount = {label: selectedDiscount, discount, sale};
   setDiscountData((prevState) => {
    const existingIndex = prevState.findIndex((item) => item.label === selectedDiscount);
    if (existingIndex !== -1) {
     const updatedData = [...prevState];
     updatedData[existingIndex] = newDiscount;
     return updatedData;
    } else {
     return [...prevState, newDiscount];
    }
   });
   enqueueSnackbar("Discount generated successfully", {variant: "success"});
   setDiscount("");
   setSale(null);
   setSelectedDiscount("");
   setErrorMessages({discount: "", sale: "", selectedDiscount: ""});
   console.log("Discount data:", discountData);
  } else {
   enqueueSnackbar("Please fill all fields correctly", {variant: "error"});
  }
 };

 //  const handleSubmit = (event: React.FormEvent) => {
 //   event.preventDefault();
 //   let hasError = false;
 //   const errors = {discount: "", sale: "", selectedDiscount: ""};

 //   if (!discount) {
 //    errors.discount = "Discount code is required";
 //    hasError = true;
 //   }

 //   if (sale === null) {
 //    errors.sale = "Sale percentage is required";
 //    hasError = true;
 //   }

 //   if (selectedDiscount.length === 0) {
 //    errors.selectedDiscount = "Please select a discount type";
 //    hasError = true;
 //   }

 //   setErrorMessages(errors);

 //   if (!hasError) {
 //    if (discount && selectedDiscount.length > 0 && sale !== null) {
 //     setDiscountData((prevState) => {
 //      const updatedData = [
 //       ...prevState.filter((item) => item.label !== selectedDiscount),
 //       {label: selectedDiscount, discount, sale},
 //      ];
 //      return updatedData;
 //     });
 //     enqueueSnackbar("Discount generated successfully", {variant: "success"});
 //    } else {
 //     enqueueSnackbar("Please try again", {variant: "error"});
 //    }
 //   }
 //  };

 const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
  const value = event.target.value.toString();
  setSelectedDiscount(value);
  console.log("selectedDiscount:", value);
  setErrorMessages((prev) => ({...prev, selectedDiscount: ""}));
 };

 const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setDiscount(event.target.value);
  console.log("discount:", event.target.value);
  setErrorMessages((prev) => ({...prev, discount: ""}));
 };

 const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSale(Number(event.target.value));
  console.log("sale:", event.target.value);
  setErrorMessages((prev) => ({...prev, sale: ""}));
 };

 const handleDeleteDiscount = (label: string) => {
  setDiscountData((prevState) => prevState.filter((item) => item.label !== label));
  enqueueSnackbar("Discount removed successfully", {variant: "success"});
 };

 return (
  <div className="flex flex-col gap-4 md:gap-6">
   <h2 className="text-accent text-xl md:text-2xl text-center">Generate Discount Code</h2>
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
    <div>
     <form
      className="pt-2 pb-5 flex flex-col gap-4 text-sand overflow-y-auto"
      onSubmit={handleSubmit}
      onReset={onClose}
     >
      <div className="flex flex-col md:flex-row gap-4 w-full">
       <TextField
        type="text"
        value={discount || ""}
        onChange={handleDiscountChange}
        label="Discount Code"
        className=" w-full md:w-[50%] hover:border-[3px] hover:shadow-input-shadow rounded-xl"
        placeholder="Enter discount code"
        sx={{
         "& input::placeholder": {
          color: "#52260080",
         },
         label: {
          color: "#52260080",
         },
        }}
       />
       <TextField
        type="number"
        value={sale || ""}
        onChange={handleSaleChange}
        label="Sale"
        placeholder="%"
        sx={{
         "& input::placeholder": {
          color: "#52260080",
         },
         label: {
          color: "#52260080",
         },
        }}
        className="w-full md:w-[50%] color-sand hover:border-[3px] hover:shadow-input-shadow rounded-xl"
       />
      </div>
      <BasicSelect
       placeholder="Discount type"
       value={selectedDiscount}
       items={discountCodesNames}
       onChange={handleSelectChange}
      />

      <Button
       type="submit"
       style="confirm"
       onClick={handleSubmit}
       disabled={!discount || !sale || !selectedDiscount}
      >
       Generate the code
      </Button>
     </form>

     <ul className="flex flex-col gap-4">
      {discountCodesNames.map((label) => {
       const data = discountData.find((item) => item.label === label.label) || {
        discount: "",
        sale: 0,
       };
       return (
        <li
         key={label.value}
         className="flex gap-2 md:gap-3 w-full items-center text-secondary "
        >
         <DiscounteField
          label={label.label}
          discount={data.discount}
          sale={data.sale}
          onDelete={() => handleDeleteDiscount(label.value)}
         />
        </li>
       );
      })}
     </ul>
    </div>
   )}

   <CloseButton
    type="button"
    onClick={onClose}
   />
  </div>
 );
};

export default DiscountForm;
