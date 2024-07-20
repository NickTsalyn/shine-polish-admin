import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateView, StaticDatePicker } from "@mui/x-date-pickers";
import useFormStorage from "@/hooks/formStorage";
import { DateIcon } from "@/global/images";
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
  const { form, handleCustomChange } = useFormStorage(
    {
      selectedDate: dayjs().format("MM/DD/YYYY"),
      time: dayjs().format("h:mm A"),
    },
    "form"
  );
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
    handleCustomChange("selectedDate", date ? date.format("MM/DD/YYYY") : null);
    onChange(date);
    setIsDateCalendarOpen(false);
  };

  const handleDateButtonClick = () => {
    setIsDateCalendarOpen(!isDateCalendarOpen);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div ref={pickerRef} className="relative w-[100px] mr-5 ">
        <button
          type="button"
          onClick={handleDateButtonClick}
          className="flex flex-col items-center"
        >
          <DateIcon />
          <span className="text-secondary">Choose Date</span>
        </button>
        {isDateCalendarOpen && (
          <div className="absolute z-10 -left-[6px] md:-left-[200px]  bottom-[22px]  w-[300px] md:w-[320px">
            <StaticDatePicker
              value={dayjs(form.selectedDate, "MM/DD/YYYY")}
              onChange={handleDateChange}
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

                // ".MuiPickersToolbar-root": {
                //   color: "#bbdefb",
                //   borderRadius: "12px",
                //   // borderWidth: "1px",
                //   // borderColor: "#2196f3",
                //   // border: "1px solid",
                //   // backgroundColor: "#0d47a1",
                // },
              }}
            />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};
export default CustomDatePicker;
