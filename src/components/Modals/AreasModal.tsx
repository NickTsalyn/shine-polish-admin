'use client'

import { useState } from "react"
import BasicModal from "../UI/Modal"
import AreasForm from "../Forms/AreasForm"
import axios from "axios";

export const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };


type Props = {
    open: boolean
    onClose?: () => void
}

const AreasModal = ({open, onClose}: Props) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
            <BasicModal open={open} onClose={handleClose}>
                <AreasForm onClose={handleClose}/>
            </BasicModal>
    )
}

export default AreasModal