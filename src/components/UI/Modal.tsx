import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Employee } from "@/types/interfaces";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  employee?: Employee;  
};

export default function BasicModal({
  children,
  open,
  onClose,
}: Props) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    "@media(max-width:767px)": {
      p: 2,
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className=" flex justify-center items-center  w-full h-full bg-backdrop bg-opacity-50"
      >
        <Box sx={style}>
          <div className="w-[280px] md:w-[400px] lg:w-[572px] xl:w-[672px] rounded-xl">
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
