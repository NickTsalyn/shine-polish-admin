'use client'

import BasicModal from "../UI/Modal"
import PhotoForm from "../Forms/PhotoForm"



type Props = {
    open: boolean
    onClose?: () => void
}

const PhotoModal = ({open, onClose}: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
            <BasicModal open={open} onClose={handleClose}>
                <PhotoForm onClose={handleClose}/>
            </BasicModal>
    )
}

export default PhotoModal