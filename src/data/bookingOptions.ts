import { InputField } from "@/types/types";

export const bedroomOptions = [
	{ value: 1, label: "1 bedroom" },
	{ value: 2, label: "2 bedroom" },
	{ value: 3, label: "3 bedroom" },
	{ value: 4, label: "4 bedroom" },
	{ value: 5, label: "5 bedroom" },
	{ value: 6, label: "6 bedroom" },
	{ value: 7, label: "7 bedroom" },
	{ value: 8, label: "8 bedroom" },
	{ value: 9, label: "9 bedroom" },
];

export const bathroomOptions = [
	{ value: 1, label: "1 bathroom" },
	{ value: 2, label: "2 bathroom" },
	{ value: 3, label: "3 bathroom" },
	{ value: 4, label: "4 bathroom" },
	{ value: 5, label: "5 bathroom" },
	{ value: 6, label: "6 bathroom" },
	{ value: 7, label: "7 bathroom" },
	{ value: 8, label: "8 bathroom" },
	{ value: 9, label: "9 bathroom" },
];

export const inputFields: InputField[] = [
	{ id: "1", label: "First Name", name: "firstName", width: "90%" },
	{ id: "2", label: "Last Name", name: "lastName", width: "90%" },
	{ id: "3", label: "Email", name: "email", width: "80%" },
	{ id: "4", label: "Area", name: "phone", width: "56%" },
  ];
  
export const inputAddressFields: InputField[] = [
	{ id: "1", label: "Address", name: "street", width: "100%" },
	{ id: "2", label: "City", name: "city", width: "50%" },
	{ id: "3", label: "State", name: "state", width: "20%" },
	{ id: "4", label: "ZIP", name: "zip", width: "20%" },
  ];