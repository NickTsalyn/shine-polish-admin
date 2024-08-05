import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const ThemeSwitch = styled(Switch)(() => ({
  width: 36,
  height: 20,
  padding: 0,
  margin: 0,
  "& .MuiSwitch-switchBase": {
    padding: 1,
    "&.Mui-checked": {
      transform: "translateX(19px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#006778",
        opacity: 1,
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    width: 38,
    height: 18,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    opacity: 1,
  },
  "@media (min-width: 1440px)": {
    width: 44,
    height: 22,
    "& .MuiSwitch-switchBase": {
      padding: 2,

      "&.Mui-checked": {
        transform: "translateX(22px)",
      },
    },
    "& .MuiSwitch-thumb": {
      width: 18,
      height: 18,
    },
    "& .MuiSwitch-track": {
      width: 44,
      height: 22,
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
  },
}));

export default ThemeSwitch;
