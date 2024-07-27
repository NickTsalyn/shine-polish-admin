'use client'

import { useState } from "react"
import BasicModal from "./UI/Modal"
import AreasForm from "./AreasForm"


type Props = {
    open?: boolean
    onClose?: () => void
}

const AreasModal = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="mb-[60px] md:mb-[80px] lg:mb-[120px] xl:mb-[160px] flex justify-center">
            <button onClick={handleOpen}>Areas</button>
            <BasicModal open={open} onClose={handleClose}>
                <AreasForm onClose={handleClose}/>
            </BasicModal>
        </div>
    )
}

export default AreasModal