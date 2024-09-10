import {Dayjs} from "dayjs";

export type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
    aptSuite?: string;
  };

export type Form = {
    _id?: string | number;
   
    area: string;
    bedroom: string | number;
    bathroom: string | number;
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
    endDate: string;
    time: string;
    endTime: string;
    aboutUs: string;
    specialInstructions: string;
    homeAccess: string;
    totalPrice: number;
    tips?: string;
    discountCode?: string;
  
  };

 export type InputField = {
    id: string;
    label: string;
    name: keyof InputValues;
    width: string;
  };
  
export  type InputValues = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  export type EditEventModalProps = {
    end: string | number | Date | Dayjs | null | undefined;
    start: string | number | Date | Dayjs | null | undefined;
    open: boolean;
    onClose: () => void;
    event: any;
    onSave: (updateEvent: any) => void;
    onDelete: (eventId: string) => void;
   }