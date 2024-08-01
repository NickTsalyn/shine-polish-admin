'use client'

import { useState } from "react"
import BasicModal from "./UI/Modal"
import PhotoForm from "./PhotoForm"



type Props = {
    open?: boolean
    onClose?: () => void
}

const PhotoModal = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="mb-[60px] md:mb-[80px] lg:mb-[120px] xl:mb-[160px] flex justify-center">
            <button onClick={handleOpen}>Upload Photos</button>
            <BasicModal open={open} onClose={handleClose}>
                <PhotoForm onClose={handleClose}/>
            </BasicModal>
        </div>
    )
}

export default PhotoModal