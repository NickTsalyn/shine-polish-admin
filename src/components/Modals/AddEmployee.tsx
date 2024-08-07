'use client'

import BasicModal from "../UI/Modal"
import AreasForm from "../Forms/AreasForm"
import AddEmployeeForm from "../Forms/AddEmployeeForm"


type Props = {
    open: boolean
    onClose?: () => void
}

const AddEmployee = ({open, onClose}: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
            <BasicModal open={open} onClose={handleClose}>
                <AddEmployeeForm onClose={handleClose}/>
            </BasicModal>
    )
}

export default AddEmployee