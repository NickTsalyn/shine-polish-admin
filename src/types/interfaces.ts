export interface Employee {
  _id: string;
  username: string;
  phone: string;
  area: string;
  email: string;
  avatar: File | string;
}
export interface FormValues {
  area: string;
  bedroom: number;
  bathroom: number;
  frequency: string;
  homeAccess: string;
  aboutUs: string;
  specialInstructions: string;
  extras: string[];
  service: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  remindersChecked: boolean;
  selectedDate: string;
  endDate: string;
  time: string;
  endTime: string;
  address: Record<string, never>;
  question: string;
  discountCode: string;
  tips: string;
  totalPrice: number;
}