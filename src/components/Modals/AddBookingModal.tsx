'use client'

import BasicModal from "../UI/Modal"
import AddBookingForm from "../Forms/AddBookingForm"


type Props = {
    open: boolean
    onClose?: () => void
}

const AddBookingModal = ({open, onClose}: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
            <BasicModal open={open} onClose={handleClose}>
                <AddBookingForm onClose={handleClose}/>
            </BasicModal>
    )
}

export default AddBookingModal