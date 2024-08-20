const COLOR = "#E6BA95";
const TEXT_COLOR = "#52260080";
export const styledTextField = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: `2px solid ${COLOR}`,
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
    color: COLOR,
    "&.Mui-focused": {
      color: COLOR,
    },
  },
  "& .MuiInputBase-input": {
    color: TEXT_COLOR
  },
};
export const styledOutlinedInput = {
  "& .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${COLOR}`, 
    borderRadius: "12px", 
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: COLOR, 
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: COLOR, 
  },
  "& .MuiInputLabel-root": {
    color: COLOR, 
  },
  "& .MuiOutlinedInput-input": {
    color: TEXT_COLOR,
  },
  "& .MuiSelect-icon": {
    color: COLOR, 
  },
};
