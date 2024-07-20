import React from "react";
import Input from "./UI/Input";

type Props = {};

const WorkWithUsForm = (props: Props) => {
  return (
    <div className="flex flex-col">
      <h3 className=" text-accent text-[24px] md:text-[36px] lg:text-[60px] mb-5 md:mb-[40px] lg:mb-[52px] lg-[56px] text-center">
        Do you want to work with us?
      </h3>
      <p className=" text-black  mb-5 md:mb-[40px] lg:mb-[52px] text-[12px] md:text-[20px] lg:text-2xl text-center font-normal leading-normal">
        Please leave a contact information
        <br />
        We will connect with you
      </p>
      <div className=" flex flex-col gap-4 lg:gap-5 w-[245px] md:w-[620px] lg:w-[820px] mb-[20px] md:mb-[40px]">
        <label className=" flex flex-col gap-1 lg:gap-2">
          <span className=" text-main text-4 md:text-[24px] lg:text-2xl ml-2">
            Name
          </span>
          <Input
            type="text"
            style="modal-input"
            placeholder="Enter your name"
          />
        </label>

        <label className=" flex flex-col gap-1 lg:gap-2">
          <span className=" text-main text-4 md:text-[24px] lg:text-2xl ml-2">
            Phone
          </span>
          <Input
            type="tel"
            style="modal-input"
            placeholder="Enter your phone number"
          />
        </label>
        <label className=" flex flex-col gap-1 lg:gap-2">
          <span className=" text-main text-4 md:text-[24px] lg:text-2xl ml-2">
            Email
          </span>
          <Input
            type="email"
            style="modal-input"
            placeholder="Enter your E-mail address"
          />
        </label>
      </div>
      <button className="flex items-center justify-center bg-accent  rounded-xl w-[180px] h-[40px] md:w-[340px] md:h-[60px] lg:w-[430px] lg:h-[80px] my-0 mx-auto">
        <span className="text-white text-center text-5 md:text-[36px] lg:text-5xl uppercase">
          Send
        </span>
      </button>
    </div>
  );
};

export default WorkWithUsForm;
