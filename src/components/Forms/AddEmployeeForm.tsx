import {Box, TextField} from "@mui/material";
import CloseButton from "../UI/CloseButton";
import {useState} from "react";
import Button from "../UI/Button";
import UploadButton from "../UI/UploadButton";
import Image from "next/image";
import {styledTextField} from "@/styles/overrides";
import {addEmployee} from "@/helpers/api";
import {useSnackbar} from "notistack";

type Props = {
 onClose: () => void;
};

type InputField = {
 id: string;
 label: string;
 name: keyof InputValues;
};

type InputValues = {
 name: string;
 phone: string;
 email: string;
 area: string;
};

const inputFields: InputField[] = [
 {id: "1", label: "Name", name: "name"},
 {id: "2", label: "Phone", name: "phone"},
 {id: "3", label: "Email", name: "email"},
 {id: "4", label: "Area", name: "area"},
];

const AddEmployeeForm = ({onClose}: Props) => {
 const {enqueueSnackbar} = useSnackbar();
 const [inputValues, setInputValues] = useState<InputValues>({
  name: "",
  phone: "",
  email: "",
  area: "",
 });
 const [image, setImage] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);

 const handleFileChange = (file: File | null) => {
  setImage(file);
  setImagePreview(file ? URL.createObjectURL(file) : null);
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setInputValues((prevValues) => ({
   ...prevValues,
   [name]: value,
  }));
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const formData = new FormData();
   formData.append("username", inputValues.name);
   formData.append("phone", inputValues.phone);
   formData.append("email", inputValues.email);
   formData.append("area", inputValues.area);
   if (image) {
    formData.append("avatar", image);
   }

   addEmployee(formData);
   setInputValues({
    name: "",
    phone: "",
    email: "",
    area: "",
   });
   setImagePreview(null);
   enqueueSnackbar("Employee added successfully", {variant: "success"});
  } catch (error) {
   enqueueSnackbar("Error adding employee", {variant: "error"});
  } finally {
   setIsLoading(false);
   onClose();
  }
 };

 return (
  <>
   <div className=" bg-white  flex flex-col gap-4 md:gap-6 overflow-y-auto">
    <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl text-center">Add Employee</h2>
    <Box
     component="form"
     noValidate
     autoComplete="off"
     className="flex flex-col gap-4 md:gap-6 items-center text-secondary  "
     onSubmit={handleSubmit}
    >
     {inputFields.map((field) => (
      <TextField
       key={field.id}
       id={field.id}
       label={field.label}
       variant="outlined"
       // size="small"
       value={inputValues[field.name]}
       name={field.name}
       onChange={handleChange}
       sx={{
        width: "100%",
        height: "56px",
        ...styledTextField,
       }}
      />
     ))}

     <div className=" flex flex-row justify-between items-center gap-8">
      {imagePreview && (
       <Image
        src={imagePreview}
        alt="Uploaded"
        width={75}
        height={50}
       />
      )}
      <UploadButton
       label="Upload Photo"
       onFileChange={handleFileChange}
      />
     </div>

     <Button
      style="confirm"
      type="submit"
     >
      {isLoading ? "Adding..." : "Add Employee"}
     </Button>
    </Box>
   </div>
   <CloseButton
    type="button"
    onClick={onClose}
   />
  </>
 );
};

export default AddEmployeeForm;
