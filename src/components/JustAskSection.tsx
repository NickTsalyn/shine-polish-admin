"use client";

import Textarea from "./UI/Textarea";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { FriendsIcon } from "@/global/images";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  email: string;
  question: string;
}

const SectionJustAsk: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormValues>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", event.target.value, { shouldValidate: true });
  };
  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue("question", event.target.value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <section
      id="just-ask"
      className="mb-[60px] md:mb-20 lg:mb-[120px] xl:mb-40"
    >
      <div className="container relative flex flex-col lg:flex-row mx-auto lg:gap-12 xl:gap-10 items-center justify-center lg:items-start lg:justify-normal lg:max-w-[1156px] xl:max-w-[1516px]">
        <div className="mb-3">
          <h3 className="h3 text-main text-center lg:text-left mb-10 xl:mb-[60px]">
            Not sure? Just ask!
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 lg:mb-10 w-auto md:w-[512px] h-[36px] md:h-[52px] lg:w-[600px] lg:h-[52px] xl:w-[890px] xl:h-[60px] xl:placeholder:text-[16px]">
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                style="form-input"
                type="email"
                placeholder="Email*"
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="error" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-auto lg:w-[400px] xl:w-[630px] h-[102px] md:h-[180px] lg:h-[240px] xl:h-[324px] mb-5 lg:mb-10">
              <Textarea
                {...register("question", { required: "Question is required" })}
                placeholder="Your question"
                onChange={handleQuestionChange}
              />
              {errors.question && (
                <p className="error" role="alert">
                  {errors.question.message}
                </p>
              )}
            </div>
            <div className="flex justify-end lg:justify-start">
              <Button style="send" type="submit">
                <span className="text-white text-5 md:text-6 lg:text-[32px] font-bold hover:text-accent">
                  Send
                </span>
              </Button>
            </div>
          </form>
        </div>
        <div className="flex justify-self-center relative lg:absolute top-0 lg:right-0 w-[335px] h-[268px] md:w-[529px] md:h-[501px] lg:w-[747px] lg:h-[511px] xl:w-[906px] xl:h-[667px]">
          <FriendsIcon />
        </div>
      </div>
    </section>
  );
};

export default SectionJustAsk;
