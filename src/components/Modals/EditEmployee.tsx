"use client";

import { Employee } from "@/types/interfaces";
import EditEmployeeForm from "../Forms/EditEmployeeForm";
import BasicModal from "../UI/Modal";

type Props = {
  open: boolean;
  onClose?: () => void;
  employee: Employee;
};

const EditEmployee = ({ open, onClose, employee}: Props) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <BasicModal open={open} onClose={handleClose} employee={employee} >
      <EditEmployeeForm onClose={handleClose} employee={employee}  />
    </BasicModal>
  );
};

export default EditEmployee;
