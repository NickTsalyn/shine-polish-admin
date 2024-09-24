"use client";
import React, {useState} from "react";
import Button from "./UI/Button";
import TextField from "@mui/material";
import {useSnackbar} from "notistack";
import {discountCodesNames} from "./Arrays";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export const DiscounteField = ({
 label,
 discount,
 sale,
 onDelete,
}: {
 label: string;
 discount: string;
 sale: number;
 onDelete: () => void;
}) => {
 const [discountData, setDiscountData] = useState<{label: string; discount: string; sale: number}[]>([]);

 const {enqueueSnackbar} = useSnackbar();

 const copyToClipboard = (text: any) => {
  navigator.clipboard
   .writeText(text)
   .then(() => {
    enqueueSnackbar("Copied to clipboard", {variant: "success"});
   })
   .catch(() => {
    enqueueSnackbar("Failed to copy", {variant: "error"});
   });
 };
 const shareViaEmail = (discount: any) => {
  const subject = encodeURIComponent("Your Discount Code");
  const body = encodeURIComponent(`Here is your discount code: ${discount}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
 };

 return (
  <div className="flex gap-2 md:gap-3 w-full items-center">
   <Button
    style="transparent-button-form"
    type="button"
   >
    <DeleteForeverRoundedIcon className="text-secjndary hover:text-accent-light text-3xl" />
   </Button>
   <div className="relative w-[75%] lg:w-[85%] h-[56px] border-[1px] rounded-xl border-secondary flex items-center px-3">
    <p className="md:hidden text-secondary text-base ">
     <span className="text-secondary-placeholder ">{label}: </span> <br />
     {discount}
     {sale}
    </p>
    <p className="hidden md:block text-secondary text-base">
     <span className="text-secondary-placeholder ">{label}: </span>
     {discount}
     {sale}
    </p>
    <div className="absolute right-[8px] md:right-0 top-[10px]">
     <Button
      style="transparent-button-form"
      type="button"
      onClick={copyToClipboard}
     >
      <ContentCopyRoundedIcon className="hover:text-main " />
     </Button>
    </div>

    <div className="absolute right-[-24px] md:right-[-40px] top-[20%]">
     <Button
      style="transparent-button-form"
      type="button"
      onClick={() => shareViaEmail(discount)}
     >
      <ShareRoundedIcon className="hover:text-main " />
     </Button>
    </div>
   </div>
  </div>
 );
};
