import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type DateTimeProps = {
  onStartTime: (date: Dayjs | string | number | any | null) => void;
  onEndTime: (date: Dayjs | string | number | any | null) => void;
};

export default function DateTime({ onStartTime, onEndTime }: DateTimeProps) {
  const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs());

  const handleStart = (newValue: Dayjs | null) => {
    setStartTime(newValue);
    onStartTime(newValue); // Pass the new value back to the parent
  };

  const handleEnd = (newValue: Dayjs | null) => {
    setEndTime(newValue);
    onEndTime(newValue); // Pass the new value back to the parent
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       {/* <DemoContainer components={["DateTimePicker"]}> */}

   
      <DemoItem label="Start Time">
        <DateTimePicker
          value={dayjs(startTime, "MM/DD/YYYY h:mm A")}
          onChange={handleStart}
          disablePast
          views={["year", "month", "day", "hours", "minutes"]}
        />
      </DemoItem>
      <DemoItem label="End Time">
        <DateTimePicker
          value={dayjs(endTime, "MM/DD/YYYY")}
          onChange={handleEnd}
          disablePast
          views={["year", "month", "day"]}
        />
      </DemoItem>
  
    {/* </DemoContainer> */}
     </LocalizationProvider>
  );
}
