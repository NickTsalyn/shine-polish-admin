const COLOR = "#E6BA95";
const TEXT_COLOR = "#52260080";

export const styledTextField = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: `1px solid ${COLOR}`,
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      borderColor: COLOR,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLOR,
    },
  },
  "& .MuiInputLabel-root": {
    color: TEXT_COLOR,
    "&.Mui-focused": {
      color: COLOR,
    },
  },
  "& .MuiInputBase-input": {
    color: TEXT_COLOR,
  },
};

export const styledOutlinedInput = {
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${COLOR}`,
    borderRadius: "12px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: COLOR,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: COLOR,
  },
  "& .MuiInputLabel-root": {
    color: TEXT_COLOR,
  },
  "& .MuiOutlinedInput-input": {
    color: TEXT_COLOR,
  },
  "& .MuiSelect-icon": {
    color: COLOR,
  },
};

export const styledDateTimeInput = {
  "& .MuiInputBase-root": {
    "& fieldset": {
      border: `1px solid ${COLOR}`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: COLOR,
    },

    "& .MuiSvgIcon-root": {
      color: "#006778",
    },
  },
};
