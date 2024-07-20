import { Tooltip, TooltipProps } from "@mui/material";

export const CustomTooltip = (
  props: JSX.IntrinsicAttributes & TooltipProps
) => (
  <Tooltip
    {...props}
    classes={{
      tooltip:
        " bg-[#E6BA95CC] text-white text-center text-xs md:text-sm lg:text-base rounded-xl w-20 md:w-28 lg:w-36 p-2 lg:p-3",
    }}
  />
);

export const kitchenIcons = [
  { title: "Clear Clutter", top: "70%", left: "58%" },
  { title: "Wash Dishes and Utensils", top: "53%", left: "42%" },
  { title: "Wipe Down Surfaces", top: "40%", left: "50%" },
  { title: "Clean Appliances", top: "55%", left: "65%" },
  { title: "Sanitize the Sink", top: "58%", left: "36%" },
  { title: "Clean and Degrease Stovetop", top: "50%", left: "55%" },
  { title: "Empty and Clean the Trash Can", top: "53%", left: "24%" },
  { title: "Wipe Down Cabinet Exteriors", top: "38%", left: "38%" },
  { title: "Clean and Disinfect High-Touch Areas", top: "50%", left: "78%" },
  { title: "Sweep and Mop Floors", top: "80%", left: "80%" },
  { title: "Clean Refrigerator", top: "50%", left: "7%" },
];

export const livingroomIcons = [
  { title: "Clean Furniture", top: "48%", left: "13%" },
  { title: "Dust and wipe down electronics", top: "24%", left: "36%" },
  { title: "Clean Furniture", top: "56%", left: "38%" },
  { title: "Clean Light Fixtures", top: "3%", left: "54%" },
  { title: "Declutter", top: "60%", left: "56%" },
  { title: "Address Pet Hair", top: "50%", left: "68%" },
  { title: "Vacuum and Sweep", top: "88%", left: "80%" },
];

export const bathroomIcons = [
  { title: "Clean Floors", top: "90%", left: "23%" },
  { title: "Clean Toilet", top: "51%", left: "7%" },
  { title: "Clean Shower or Tub", top: "63%", left: "37%" },
  { title: "Empty Trash", top: "77%", left: "44%" },
  { title: "Clean Countertops and Sinks", top: "57%", left: "50%" },
  { title: "Declutter", top: "40%", left: "46%" },
  { title: "Clean Mirrors", top: "50%", left: "70%" },
  { title: "Clean and Disinfect High-Touch Areas", top: "80%", left: "71%" },
  { title: "Pre-Treat Surfaces", top: "76%", left: "11%" },
  { title: "Dust and Sweep", top: "24%", left: "32%" },
];

export const bedroomIcons = [
  { title: "Freshen Up", top: "41%", left: "55%" },
  { title: "Dusting", top: "25%", left: "34%" },
  { title: "Bedding", top: "57%", left: "37%" },
  { title: "Clean Window Treatments", top: "38%", left: "92%" },
  { title: "Clean Furniture", top: "52%", left: "66%" },
  { title: "Clean Light Fixtures", top: "5%", left: "53%" },
  { title: "Vacuum and Clean Floors", top: "82%", left: "10%" },
];

export const diningroomIcons = [
  { title: "Clean Light Fixtures", top: "10%", left: "35%" },
  { title: "Check and Clean Air Vents", top: "46%", left: "7%" },
  { title: "Dusting", top: "81%", left: "42%" },
  { title: "Decorative Elements", top: "37%", left: "82%" },
  { title: "Clean Furniture", top: "38%", left: "58%" },
  { title: "Declutter", top: "53%", left: "81%" },
  { title: "Vacuum and Sweep", top: "87%", left: "90%" },
];
