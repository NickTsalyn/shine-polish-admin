" use client";
import { styledTextField } from "@/styles/overrides";
import { Employee } from "@/types/interfaces";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import UploadButton from "../UI/UploadButton";
import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";
import Image from "next/image";
import { editEmployee } from "@/helpers/api";

type Props = {
  onClose: () => void;
  employee: Employee;
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
  avatar: File | string;
};

const inputFields: InputField[] = [
  { id: "1", label: "Name", name: "name" },
  { id: "2", label: "Phone", name: "phone" },
  { id: "3", label: "Email", name: "email" },
  { id: "4", label: "Area", name: "area" },
];

const EditEmployeeForm = ({ onClose, employee }: Props) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    name: employee?.username,
    phone: employee?.phone,
    email: employee?.email,
    area: employee?.area,
    avatar: employee?.avatar,
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    inputValues.avatar ? inputValues.avatar.toString() : null
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (inputValues.name !== employee.username) formData.append("username", inputValues.name);
      if (inputValues.phone !== employee.phone) formData.append("phone", inputValues.phone);
      if (inputValues.email !== employee.email) formData.append("email", inputValues.email);
      if (inputValues.area !== employee.area) formData.append("area", inputValues.area);
      if (image) formData.append("avatar", image);

      if (
        formData.has("username") ||
        formData.has("phone") ||
        formData.has("email") ||
        formData.has("area") ||
        formData.has("avatar")
      ) {
        const updatedEmployee = await editEmployee(employee._id, formData);
        console.log("Updated Employee:", updatedEmployee);
      } else {
        console.log("No changes detected.");
      }
    } catch (error) {
      console.error("Error editing employee", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <div className=" bg-white  flex flex-col gap-4 md:gap-6 overflow-y-auto">
        <h2 className="text-accent text-2xl md:text-4xl lg:text-5xl ">Edit Employee</h2>
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
            {imagePreview && <Image src={imagePreview} alt="Uploaded" width={75} height={50} />}
            <UploadButton label="Upload Photo" onFileChange={handleFileChange} />
          </div>

          <Button style="confirm" type="submit">
            Adit
          </Button>
        </Box>
      </div>
      <CloseButton type="button" onClick={onClose} />
    </>
  );
};

export default EditEmployeeForm;
