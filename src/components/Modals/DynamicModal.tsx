import { Employee } from "@/types/interfaces";
import AddBookingForm from "../Forms/AddBookingForm";
import AddEmployeeForm from "../Forms/AddEmployeeForm";
import AreasForm from "../Forms/AreasForm";
import EditEmployeeForm from "../Forms/EditEmployeeForm";
import PhotoForm from "../Forms/PhotoForm";
import PriceForm from "../Forms/PriceForm";
import BasicModal from "../UI/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  formType: string;
  formProps?: any;
  employee?: Employee;
};
const DynamicModal = ({ open, onClose, formType, formProps, employee }: Props) => {
  const renderContent = () => {
    switch (formType) {
      case "AddBookingForm":
        return <AddBookingForm {...formProps} onClose={onClose} />;
      case "AddEmployeeForm":
        return <AddEmployeeForm {...formProps} onClose={onClose} />;
      case "EditEmployeeForm":
        return <EditEmployeeForm {...formProps} employee={employee} onClose={onClose} />;
      case "AreasForm":
        return <AreasForm {...formProps} onClose={onClose} />;
      case "PriceForm":
        return <PriceForm {...formProps} onClose={onClose} />;
      case "PhotoForm":
        return <PhotoForm {...formProps} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <BasicModal open={open} onClose={onClose}>
      {renderContent()}
    </BasicModal>
  );
};

export default DynamicModal;
