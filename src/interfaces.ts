export interface Booking {
    _id: any;
    id: number | string;
    name: string;
    surname: string;
    selectedDate: string;
    time: string;
    email: string;
    phone: string;
    address: string;
    area: string[];
    service: string;
    frequency: string;
    specialInstructions: string;
    extras: string[];
    bedroom: number;
    bathroom: number;
    totalPrice: number
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
    open: boolean;
    onClose: () => void;
    event: any;
    onSave: (updateEvent: any) => void;
    onDelete: (eventId: number) => void;
   }
   
export interface ClientCardProps {
    booking: any;
   }   