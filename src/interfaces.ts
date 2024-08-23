export interface Booking {
    [x: string]: any;
    clientName: any;
    _id: any;
    id: number | string;
    name: string;
    surname: string;
    selectedDate: string;
    time: string;
    email: string;
    phone: string;
    address: string;
    areas: string[];
    service: string;
    frequency: string;
    specialInstructions: string;
    extras: string[];
    bedrooms: number;
    bathrooms: number;
}

export interface BookingEvent {
    id: number | string;
    title: string;
    start: Date;
    end: Date;
    email: string;
    phone: string;
    address: string;
    areas: string[];
    selectedDate: string;
    time: string;
}
export interface CalendarComponentProps {
    events: Array<any>;
    defaultDate?: Date;
    defaultView?: string;
    minDate?: Date;
    maxDate?: Date;
    onUpdateEvent?: (updateEvent: any) => void;
    onDeleteEvent?: (eventId: number) => void;
   }

export interface EditEventModalProps {
    // _id: string;
    open: boolean;
    // onChange: () => void;
    onClose: () => void;
    event: any;
    onSave: (updateEvent: any) => void;
    onDelete: (eventId: string) => void;
   }
   
export interface ClientCardProps {
    booking: any;
   }   

 export  interface EventType {
    id: string;
    title: string;
    start: Date;
    end: Date;
    // Додаткові поля подій
  }