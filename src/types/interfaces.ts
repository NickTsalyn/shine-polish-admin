
import dayjs, {Dayjs} from "dayjs";
import { Form } from "./types";
// import { updateEvent } from '@/helpers/api';
export interface Employee {
  _id: string;
  username: string;
  phone: string;
  area: string;
  email: string;
  avatar: File | string;
}

export interface Booking {
    _id: string | number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    areas: string[];
    selectedDate: string | Dayjs |null;
    endDate: string |  Dayjs | null;
    time: string | Dayjs | null;
    frequency: string;
    spesialInstructions: string;
    extras: string[];
    bedrooms: number;
    bathrooms: number;
    [key: string]: any;

}

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    email: string;
    phone: string;
    address: string;
    areas: string[];
    bedrooms: number;
    bathrooms: number;
    extras: string[];
    backgroundColor: string;
    textColor: string;
    spesialInstructions: string;
  }

  export interface UpdateEventPayload {
    _id?: string | number;
    email: string;
    name: string;
    surname: string;
    phone: string;
    address: Address;
    area: string;
    selectedDate: string; 
    endDate: string; 
    time: string; 
    endTime: string;
    bedroom: number;
    bathroom: number;
    extras: string[];
    service: string;
    frequency: string;
    aboutUs: string;
    specialInstructions: string;
    homeAccess: string;
    tips: string; 
    totalPrice: number; 
    discountCode?: string;
  }
  
  export interface Address {
    city: string;
    street: string;
    aptSuite?: string; 
    zip: string;
    state: string;
  }

export interface CalendarComponentProps {
  events: (Booking & CalendarEvent)[];
    // event: any;
    defaultDate?: Date;
    // defaultView?: string;
    minDate?: Date;
    maxDate?: Date;
    // onUpdateEvent?: (eventId: string) => void;
    // onDeleteEvent?: (eventId: string) => void;
    onSave?: (eventData: Form) => void;
   }
   export interface CalendarFieldProps {
    event: any;
    events: any;
    onSave: (updatedEvent: any) => void;
    
   }

   export type EditEventModalProps = {
    end: string | number | Date | Dayjs | null | undefined;
    start: string | number | Date | Dayjs | null | undefined;
    open: boolean;
    onClose: () => void;
    event: any;
    onSave: (updateEvent: any) => void;
    onDelete: (eventId: string) => void;
   }

   export interface ClientCardProps {
    booking: Booking; // Booking object passed as a prop
  }