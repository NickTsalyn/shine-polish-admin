import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

type DialogAgreeProps = {
 open: boolean;
 onClose: () => void;
 onConfirm: () => void;
};

export default function DialogAgree({open, onClose, onConfirm}: DialogAgreeProps) {
 const theme = useTheme();
 //   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
 const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

 return (
  <Dialog
   open={open}
   onClose={onClose}
   aria-labelledby="responsive-dialog-title"
   maxWidth={isLargeScreen ? "md" : "xs"}
   fullWidth={!isLargeScreen}
   PaperProps={{
    style: {
     boxShadow: "none",
     borderRadius: "12px",
    },
   }}
   BackdropProps={{
    style: {
     backgroundColor: "rgba(22, 21, 21, 0.1)",
    },
   }}
  >
   <DialogContent>
    <DialogContentText className="text-text">Are you sure you want to delete ?</DialogContentText>
   </DialogContent>
   <DialogActions>
    <Button
     autoFocus
     onClick={onClose}
     className="text-main"
    >
     Cancel
    </Button>
    <Button
     onClick={() => {onConfirm(); onClose()}}
     autoFocus
     className="text-accent-light "
    >
     Delete
    </Button>
   </DialogActions>
  </Dialog>
 );
}
