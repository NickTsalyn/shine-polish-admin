"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import {useContext} from "react";
import {useRouter} from "next/navigation";
import Button from "./UI/Button";
import Input from "./UI/Input";
import {signin} from "@/helpers/api";
import {AuthContext} from "@/components/AuthContext";
import {useSnackbar} from "notistack";

interface SignInInput {
 email: string;
 password: string;
}

export default function SignInForm() {
 const {enqueueSnackbar} = useSnackbar();
 const {login} = useContext(AuthContext);
 const router = useRouter();
 const {
  register,
  handleSubmit,
  setValue,
  reset,
  formState: {errors},
 } = useForm<SignInInput>();

 const onSubmit = async (data: SignInInput) => {
  try {
   const token = await signin(data);
   login(token);
   router.push("/home");
   enqueueSnackbar("Login Successful", {variant: "success"});
  } catch (error) {
   enqueueSnackbar("Invalid email or password", {variant: "error"});
   reset();
  }
 };

 const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue("email", event.target.value, {shouldValidate: true});
 };

 const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue("password", event.target.value, {shouldValidate: true});
 };

 return (
  <div className="flex flex-col items-center justify-center h-screen  lg:w-[calc(100vw-260px)]">
   <div className="mx-auto lg:items-center my-auto relative w-[300px] md:w-[500px] lg:w-[600px]  h-[380px] md:h-[420px] rounded-[50px] md:flex shadow-main-shadow">
    <div className="pt-4 mx-auto md:pt-16 lg:pt-20 pl-8 pr-8 flex flex-col md:items-center w-full md:h-[500px] rounded-b-xl">
     <h2 className="text-main text-[40px] lg:text-[48] text-center mb-4 md:mb-5 lg:mb-6 lg:font-normal">Sign in</h2>

     <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
     >
      <div className="flex flex-col justify-center items-center w-full ">
       <label className="mb-[10px]">
        <span className="text-text text-[14px] lg:text-[20px]  lg:font-thin">Please enter your E-Mail Address</span>
       </label>
       <Input
        {...register("email", {required: "It's Ok"})}
        style="sign-in-input"
        type="email"
        placeholder="Email*"
        onChange={handleEmailChange}
        width="100%"
       />
       <Input
        {...register("password", {
         required: "You're the best",
         minLength: {
          value: 6,
          message: "Min lenght is 6",
         },
        })}
        style="sign-in-input"
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        width="100%"
       />
       <p className="text-accent text-[14px] lg:text-[20px] mb-[18px] md:mb-[30px] lg:font-light">
        Forgot your password?
       </p>

       <Button
        style="auth-sign"
        type="submit"
       >
        <span className="text-white text-[20px] uppercase">Sing In</span>
       </Button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
}
