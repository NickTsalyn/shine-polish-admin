import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  padding: "0",
  fontFamily: "Lato",
  fontSize: "20px",
  fontWeight: "400",
  lineHeight: "24px",
  textAlign: "start",
  "@media (min-width: 1439px) and (max-width: 1919px)": {
    fontSize: "18px",
    lineHeight: "21.6px",
  },
}));

export default CustomButton;
