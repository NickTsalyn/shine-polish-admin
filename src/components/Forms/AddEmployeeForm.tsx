import { Box, TextField } from "@mui/material";
import CloseButton from "../UI/CloseButton";
import { useState } from "react";
import Button from "../UI/Button";
import UploadButton from "../UI/UploadButton";
import Image from "next/image";
import { styledTextField } from "@/styles/overrides";
import axios from "axios";
import { addEmployee } from "@/helpers/api";

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
  { id: "1", label: "Name", name: "name" },
  { id: "2", label: "Phone", name: "phone" },
  { id: "3", label: "Email", name: "email" },
  { id: "4", label: "Area", name: "area" },
];

const AddEmployeeForm = ({ onClose }: Props) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    name: "",
    phone: "",
    email: "",
    area: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("username", inputValues.name);
      formData.append("phone", inputValues.phone);
      formData.append("email", inputValues.email);
      formData.append("area", inputValues.area);
      if (image) {
        formData.append("avatar", image);
      }

     addEmployee(formData)
      setInputValues({
        name: "",
        phone: "",
        email: "",
        area: "",
      })
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <>
      <div className=" bg-white  flex flex-col gap-4 md:gap-6 overflow-y-auto">
        <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl ">
          Add Employee
        </h2>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="flex flex-col gap-4 md:gap-8 items-center text-secondary mb-4 md:mb-6 xl:md-8 "
          onSubmit={handleSubmit}
        >
          {inputFields.map((field) => (
            <TextField
              key={field.id}
              id={field.id}
              label={field.label}
              variant="outlined"
              size="small"
              value={inputValues[field.name]}
              name={field.name}
              onChange={handleChange}
              sx={{
                width: "100%",
                ...styledTextField,
              }}
            />
          ))}

          <div className=" flex flex-row justify-between items-center gap-8">
            {imagePreview && (
              <Image src={imagePreview} alt="Uploaded" width={75} height={50} />
            )}
            <UploadButton
              label="Upload Photo"
              onFileChange={handleFileChange}
            />
          </div>

          <Button style="confirm" type="submit">
            Add Employee
          </Button>
        </Box>
      </div>
      <CloseButton type="button" onClick={onClose} />
    </>
  );
};

export default AddEmployeeForm;
