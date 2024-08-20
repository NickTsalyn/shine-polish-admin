export type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
  };

export type Form = {
    area: string;
    bedroom: string;
    bathroom: string;
    frequency: string;
    service: string;
    extras: string[];
    additionalInfo?: string;
    name: string;
    surname: string;
    email: string;
    phone: number | string;
    address: Address;
    selectedDate: string;
    time: string;
    aboutUs: string;
    specialInstructions: string;
    homeAccess: string;
    totalPrice: number;
  };

 export type InputField = {
    id: string;
    label: string;
    name: keyof InputValues;
    width: string;
  };
  
export  type InputValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };