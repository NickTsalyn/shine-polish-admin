import React, { useState, useEffect } from "react";
import useFormStorage from "@/hooks/formStorage";
import BasicSelect from "../UI/Select";
import Textarea from "../UI/Textarea";
import { aboutUs, homeAccess } from "@/data/booking-form/step_3";
import dayjs from "dayjs";
import Input from "../UI/Input";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IMaskInput } from "react-imask";
import Button from "../UI/Button";
import * as yup from "yup";

const ContactNumberMask = "(000)-000-0000";

const Step3 = () => {
  const { form, handleInputChange, handleRadioChange } = useFormStorage({
    areas: "",
    bedroom: 1,
    bathroom: 1,
    frequency: "",
    homeAccess: "",
    aboutUs: "",
    specialInstructions: "",
    extras: [],
    services: "",
    selectedDate: dayjs().format("MM/DD/YYYY"),
    time: dayjs().format("h:mm A"),
    address: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    remindersChecked: false,
  });

  const [localName, setLocalName] = useState("");
  const [localSurname, setLocalSurname] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [remindersChecked, setRemindersChecked] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedForm = localStorage.getItem("form");
    if (storedForm) {
      const parsedForm = JSON.parse(storedForm);
      setLocalName(parsedForm.name || "");
      setLocalSurname(parsedForm.surname || "");
      setLocalEmail(parsedForm.email || "");
      setLocalPhone(parsedForm.phone || "");
      setRemindersChecked(parsedForm.remindersChecked || false);
    }
  }, []);

  const handleCheckBoxChange = () => {
    setRemindersChecked(!remindersChecked);
    handleRadioChange("remindersChecked", !remindersChecked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schema = yup.object().shape({
      name: yup.string().required("First Name is required"),
      surname: yup.string().required("Last Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: yup
        .string()
        .matches(/^\(\d{3}\)-\d{3}-\d{4}$/, "Invalid phone number format")
        .required("Phone is required"),
    });

    try {
      await schema.validate(
        {
          name: localName,
          surname: localSurname,
          email: localEmail,
          phone: localPhone,
        },
        { abortEarly: false }
      );

      const updatedForm = {
        ...form,
        name: localName,
        surname: localSurname,
        email: localEmail,
        phone: localPhone,
        remindersChecked,
      };

      localStorage.setItem("form", JSON.stringify(updatedForm));
      alert("Form submitted successfully!");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {
          name: "",
          surname: "",
          email: "",
          phone: "",
        };

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof typeof validationErrors] =
              err.message;
          }
        });
        if (validationErrors.name !== localName)
          setErrors({ ...errors, name: "" });
        if (validationErrors.surname !== localSurname)
          setErrors({ ...errors, surname: "" });
        if (validationErrors.email !== localEmail)
          setErrors({ ...errors, email: "" });
        if (validationErrors.phone !== localPhone)
          setErrors({ ...errors, phone: "" });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 md:py-6 lg:py-9 xl:pl-[60px] xl:pr-[150px] flex flex-col gap-6"
    >
      <div className="py-4 md:py-6 lg:py-9">
        <h2 className="mb-4 md:mb-5 lg:mb-[26px] text-2xl md:text-4xl font-medium md:font-normal">
          Contact information
        </h2>
        <p className="text-subtext md:text-2xl mb-6 md:mb-8 lg:mb-5">
          This information will be used to contact you about service
        </p>
        <div className="flex flex-col gap-2 md:gap-5 lg:gap-10">
          <div className="md:flex md:flex-row gap-6  md:h-10 lg:gap-[60px] lg:h-[48px] lg:w-auto">
            <div className="md:w-1/2 md:h-[40px] lg:w-3/5 relative mb-4">
              <Input
                name="name"
                value={localName}
                type="text"
                onChange={(e) => {
                  setLocalName(e.target.value);
                  setErrors({ ...errors, name: "" });
                }}
                placeholder="First Name*"
                style="form-input"
              />
              {errors.name && (
                <p className="text-secondary text-xs  absolute left-2 bottom-[-15px]">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="md:w-1/2 lg:w-2/5 relative">
              <Input
                name="surname"
                value={localSurname}
                type="text"
                onChange={(e) => {
                  setLocalSurname(e.target.value);
                  setErrors({ ...errors, surname: "" });
                }}
                placeholder="Last Name*"
                style="form-input"
              />
              {errors.surname && (
                <p className="text-secondary text-xs  absolute left-2 bottom-[-15px]">
                  {errors.surname}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse gap-2 md:gap-5 lg:gap-[60px] lg:h-[48px]">
            <div className="lg:w-3/5 lg:h-[40px] relative">
              <Input
                name="email"
                value={localEmail}
                type="email"
                onChange={(e) => {
                  setLocalEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="Email*"
                style="form-input"
              />
              {errors.email && (
                <p className="text-secondary text-xs  absolute left-2 bottom-[-6px] lg:bottom-[-16px]">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="lg:w-2/5 lg:h-[40px] relative">
              <IMaskInput
                className="block mx-full mb-[10px] w-full hx-full h-full py-[8px] lg:py-[12px] px-[8px] lg:px-[16px] bg-transparent text-text border-solid border-2 focus:border-[3px] border-secondary rounded-[12px] focus:shadow-input-shadow outline-none xl:placeholder:text-[16px] placeholder:text-secondary-placeholder placeholder:opacity-50"
                mask={ContactNumberMask}
                placeholder="(470)-800-3249"
                value={localPhone}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setLocalPhone(target.value);
                  setErrors({ ...errors, phone: "" });
                }}
              />
              {errors.phone && (
                <p className="text-secondary text-xs  absolute left-2 bottom-[-6px] lg:bottom-[-16px]">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:relative">
        <div className="lg:flex lg:flex-row-reverse lg:gap-[60px]">
          <div className="flex flex-col lg:w-1/2">
            <h2 className="mb-6 md:mb-7 lg:mb-[26px] text-2xl md:text-4xl font-medium md:font-normal">
              Additional information
            </h2>
            <div className="mb-10 md:mb-[60px] flex flex-col gap-4 md:flex-row lg:flex-col md:gap-6 md:h-10">
              <div className="md:w-1/2 lg:w-full">
                <BasicSelect
                  name="homeAccess"
                  items={homeAccess}
                  value={form.homeAccess}
                  onChange={handleInputChange}
                  placeholder="How will access your home?* "
                />
              </div>
              <div className="md:w-1/2 lg:w-full">
                <BasicSelect
                  name="aboutUs"
                  items={aboutUs}
                  value={form.aboutUs}
                  onChange={handleInputChange}
                  placeholder="How did you hear about us?* "
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2">
            <h2 className="mb-4 md:mb-5 lg:mb-[26px] text-2xl md:text-4xl font-medium md:font-normal">
              Anything else we should know to provide the best and polish
              cleaning possible?
            </h2>
            <div className="h-[124px] md:h-[220px] lg:h-[250px]">
              <Textarea
                placeholder="Special Instructions*"
                value={form.specialInstructions}
                name="specialInstructions"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-5 lg:absolute lg:right-0 lg:top-[240px]">
          <button
            type="button"
            className="flex items-center justify-center p-0 w-4 md:w-6 h-4 md:h-6 rounded"
            onClick={handleCheckBoxChange}
          >
            {remindersChecked ? (
              <CheckBoxIcon className="w-full h-full fill-main" />
            ) : (
              <CheckBoxOutlineBlankIcon className="w-full h-full fill-main" />
            )}
          </button>
          <p className="text-secondary text-xs md:text-2xl">
            Send me reminders about my booking via email
          </p>
        </div>
        <div className="ml-auto relative hover:text-white lg:absolute lg:right-0 lg:bottom-0">
          <Button style="apply-btn-light-one" type="submit">
            CONFIRM
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Step3;