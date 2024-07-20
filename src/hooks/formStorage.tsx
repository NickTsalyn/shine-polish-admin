"use client";

import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
interface Form {
  [key: string]: string | number | boolean | string[] | Dayjs | null | any;
}

interface HandlerReturn {
  form: Form;
  handleInputChange: (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>
      | FormEvent<HTMLFormElement>
  ) => void;
  handleRadioChange: (name: string, value: string | boolean) => void;
  handlePhoneChange: (value: string) => void;
  handleCheckboxChange: (name: string, value: string) => void;
  handleCustomChange: (name: string, value: any) => void;

  setForm: (form: Form) => void;
}

const useFormStorage = (initialForm: Form, formKey = "form"): HandlerReturn => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const savedForm = localStorage.getItem(formKey);
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, [formKey]);

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>
      | FormEvent<HTMLFormElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    const newValue = type === "checkbox" ? checked : value;
    const updatedForm = { ...form, [name]: newValue };
    setForm(updatedForm);
    localStorage.setItem(formKey, JSON.stringify(updatedForm));
  };

  const handleRadioChange = (name: string, value: string | boolean) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    localStorage.setItem(formKey, JSON.stringify(updatedForm));
  };

  const handleCustomChange = (name: string, value: any) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    localStorage.setItem(formKey, JSON.stringify(updatedForm));
  };

  const handlePhoneChange = (value: string) => {
    const updatedForm = { ...form, phone: value };
    localStorage.setItem(formKey, JSON.stringify(updatedForm));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    const currentValues = form[name] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    const updatedForm = { ...form, [name]: newValues };
    setForm(updatedForm);
    localStorage.setItem(formKey, JSON.stringify(updatedForm));
  };

  return {
    form,
    handleInputChange,
    handleRadioChange,
    handleCheckboxChange,
    setForm,
    handleCustomChange,
    handlePhoneChange,
  };
};
export default useFormStorage;