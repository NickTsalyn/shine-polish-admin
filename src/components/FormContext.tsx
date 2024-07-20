"use client";
import React, { createContext, useState, ReactNode } from "react";
// import { areas } from "@/data/areas";

type FormContextValue = {
	form: any;
	setForm: React.Dispatch<React.SetStateAction<any>>;
};

export const FormContext = createContext<FormContextValue>({} as FormContextValue);

export const FormProvider = ({ children }: { children: ReactNode }) => {
	const [form, setForm] = useState({
		areas: "",
		bedrooms: "",
		bathrooms: "",
	});

	return <FormContext.Provider value={{ form, setForm }}>{children}</FormContext.Provider>;
};
