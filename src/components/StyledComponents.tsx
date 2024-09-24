import {styled} from "@mui/system";
import ListItem from "@mui/material/ListItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import MenuIcon from "@mui/icons-material/Menu";

export const StyledMenuIcon = styled(MenuRoundedIcon)(() => ({
 color: "#006778",
 fontSize: 42,
 "@media (min-width: 768px)": {
  fontSize: 52,
 },
}));

export const DrawerContent = styled("div")(() => ({
 display: "flex",
 flexDirection: "column",
 backgroundColor: "#FFF",
 width: "280px",
 height: "598px",
 padding: "16px",
 borderRadius: "12px",
 "@media (min-width: 768px)": {
  width: "400px",
  padding: "28px",
  height: "820px",
 },
}));

export const StyledItem = styled(ListItem)(() => ({
 color: "#006778",
 padding: "0px",
 fontFamily: "Lato",
}));
