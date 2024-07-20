import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: "12px",
  boxShadow: 24,
  p: 5,
};

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function BasicModal({ children, open, onClose }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" flex justify-center items-center w-full h-full bg-backdrop bg-opacity-50"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
