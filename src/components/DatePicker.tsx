import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { DateView, StaticDatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";

import useFormStorage from "@/hooks/formStorage";

import EditCalendarIcon from "@mui/icons-material/EditCalendar";

interface CustomDatePickerProps {
  value: Dayjs | string | number | any | null;
  onChange: (date: Dayjs | null) => void;
  disablePast?: boolean;
  views?: readonly DateView[];
  orientation?: "portrait" | "landscape";
  openTo?: "day" | "month" | "year";
  slots?: { actionBar: () => null };
  autoFocus?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  disablePast = false,
  views = ["year", "month", "day"],
  orientation = "portrait",
  openTo = "day",
  autoFocus = true,
}) => {
  const [isDateCalendarOpen, setIsDateCalendarOpen] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsDateCalendarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleDateChange = (date: Dayjs | null) => {
    //   handleCustomChange("selectedDate", date ? date.format("MM/DD/YYYY") : null);
    onChange(date);
    setIsDateCalendarOpen(false);
  };

  const handleDateButtonClick = () => {
    setIsDateCalendarOpen(!isDateCalendarOpen);
  };

  const shouldDisableDate = (date: Dayjs) => {
    return date.isSame(dayjs(), "day");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div ref={pickerRef} className="relative">
        <button
          type="button"
          onClick={handleDateButtonClick}
          className="flex flex-col items-center"
        >
          <EditCalendarIcon className="text-main size-6 md:size-8" />
          {/* <span className="text-secondary">Choose Date</span> */}
        </button>
        {isDateCalendarOpen && (
          <Box>
            <div className="absolute z-10 -left-[6px] md:-left-[200px]  bottom-[22px]  w-[300px] md:w-[320px">
              <StaticDatePicker
                value={dayjs("01-01-2024", "MM/DD/YYYY")}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
                disablePast
                views={views}
                orientation="portrait"
                openTo="day"
                autoFocus
                slots={{
                  actionBar: () => null,
                }}
                sx={{
                  width: "100%",
                  "@media (max-width: 600px)": {
                    width: "100%",
                  },
                }}
              />
            </div>
          </Box>
        )}
      </div>
    </LocalizationProvider>
  );
};
export default CustomDatePicker;
