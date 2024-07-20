import * as React from "react";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeIcon } from "@/global/images";
import useFormStorage from "@/hooks/formStorage";
import { useEffect } from "react";

interface CustomTimePickerProps {
  value: Dayjs | string | number | any | null;
  onChange: (time: Dayjs | null) => void;
}

export default function TimePickerComponent({
  onChange,
  value,
}: CustomTimePickerProps) {
  const { form, handleCustomChange } = useFormStorage(
    {
      selectedDate: dayjs().format("MM/DD/YYYY"),
      time: dayjs().format("h:mm A"),
    },
    "form"
  );
  const [isTimeCalendarOpen, setIsTimeCalendarOpen] = React.useState(false);

  const handleTimeChange = (time: Dayjs | null) => {
    if (time) {
      handleCustomChange("time", time.format("h:mm A"));
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
        !(event.target as Element).closest(
          `[class*="absolute"][class*="right-0"][class*="bottom-22px"]`
        )
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
      <div className="w-[100px] relative">
        <button
          type="button"
          onClick={handleTimeButtonClick}
          className="flex flex-col items-center"
        >
          <TimeIcon />
          <span className="text-secondary">Choose Time</span>
        </button>
        {isTimeCalendarOpen && (
          <div className="absolute right-0 bottom-[22px] ">
            <DigitalClock
              value={dayjs(form.time, "h:mm A")}
              onChange={handleTimeChange}
              skipDisabled
              minTime={dayjs("2022-04-17T08:00")}
              maxTime={dayjs("2022-04-17T16:30")}
              timeStep={30}
              // shouldDisableTime={shouldDisableTime}
            />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}
