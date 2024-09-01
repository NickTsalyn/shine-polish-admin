import axios from "axios";

interface Booking {
 id: number | string;
 name: string;
 surname: string;
 selectedDate: string;
 time: string;
 email: string;
 phone: string;
 address: {
  city: string;
  street: string;
  aptSuite: string;
  zip: string;
  state: string;
 };
 areas: string[];
 extras: string[];
}

export const getBookings = async (): Promise<Booking[]> => {
 try {
  const response = await axios.get<Booking[]>("https://shine-polish-server.onrender.com/admin/bookings");
  console.log("Bookings received:", response.data);
  return response.data;
 } catch (error) {
  console.error("Error getting bookings:", error);
  return [];
 }
};

export const deleteBooking = async (id: string): Promise<void> => {
 try {
  await axios.delete(`https://shine-polish-server.onrender.com/admin/bookings/${id}`);
 } catch (error) {
  console.error("Error deleting booking:", error);
 }
}