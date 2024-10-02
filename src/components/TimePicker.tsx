import * as React from "react";
import {DigitalClock, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useEffect} from "react";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {Box} from "@mui/material";

interface CustomTimePickerProps {
 value: Dayjs | string | number | any | null;
 onChange: (time: Dayjs | null) => void;
}

export default function CustomTimePicker({onChange, value}: CustomTimePickerProps) {
 const [isTimeCalendarOpen, setIsTimeCalendarOpen] = React.useState(false);

 const handleTimeChange = (time: Dayjs | null) => {
  if (time) {
   onChange(time);
   setIsTimeCalendarOpen(false);
  }
 };

 const handleTimeButtonClick = () => {
  setIsTimeCalendarOpen(!isTimeCalendarOpen);
 };
 useEffect(() => {
  const handleClick = (event: MouseEvent) => {
   if (
    isTimeCalendarOpen &&
    !(event.target as Element).closest(`[class*="absolute"][class*="right-0"][class*="bottom-22px"]`)
   ) {
    setIsTimeCalendarOpen(false);
   }
  };

  document.addEventListener("click", handleClick);
  return () => {
   document.removeEventListener("click", handleClick);
  };
 }, [isTimeCalendarOpen]);

 return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div className=" relative">
    <button
     type="button"
     onClick={handleTimeButtonClick}
     className="flex flex-col items-center"
    >
     <AccessTimeRoundedIcon className="text-main size-6" />
     {/* <span className="text-secondary">Choose Time</span> */}
    </button>
    {isTimeCalendarOpen && (
     <Box
      sx={{
       width: 100,

       borderRadius: 12,
       bgcolor: "#fff",
      }}
     >
      <div className="absolute right-0 bottom-[22px] ">
       <DigitalClock
        value={dayjs("22-00", "h:mm A")}
        onChange={handleTimeChange}
        skipDisabled
        minTime={dayjs("2022-04-17T08:00")}
        maxTime={dayjs("2022-04-17T16:30")}
        timeStep={30}
        // shouldDisableTime={shouldDisableTime}
       />
      </div>
     </Box>
    )}
   </div>
  </LocalizationProvider>
 );
}
