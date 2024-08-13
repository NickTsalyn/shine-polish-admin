'use client'

import { useState } from "react"
import BasicModal from "../UI/Modal"
import PriceForm from "../Forms/PriceForm"



type Props = {
    open: boolean
    onClose?: () => void
}

const PriceModal = ({open, onClose}: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
            <BasicModal open={open} onClose={handleClose}>
                <PriceForm onClose={handleClose}/>
            </BasicModal>
    )
}

export default PriceModal