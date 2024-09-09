import axios from "axios";
import { Form } from "@/types/types";
import { UpdateEventPayload } from "@/interfaces";
import dayjs from "dayjs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const signin = async (user: any) => {
    const res = await axios.post(`${BASE_URL}/auth/signin`, user);
    const token = res.data.accessToken;
    setAuthHeader(token);
    return token;
};

// export const getExtras = async () => {
// 	try {
// 	 const response = await axios.get(`${BASE_URL}/admin/bookings`);
// 	 return response.data;
// 	} catch (error) {
// 	 console.error("Error getting extras:", error);
// 	 return [];
// 	}
// }

export const updateEvent = async (id: string | number, eventData: UpdateEventPayload): Promise<void> => {
	try {
	  await axios.put(`${BASE_URL}/admin/bookings/${id}`, eventData);
	} catch (error: any) {
	  console.error('Error updating event:', error.response?.data || error.message);
	}
  }

  // export const updateEvent = async (id: string | number, eventData: UpdateEventPayload): Promise<void>  => {
  //   const res = await axios.put(`${BASE_URL}/admin/bookings/${id}`, eventData);
  //   return res.data;
  //   }
// export const updateEvent = async (id: string | number, eventData: UpdateEventPayload): Promise<void> => {
//   try {
//     const updatedEventData = {
//       ...eventData,
//       selectedDate: dayjs(eventData.selectedDate).format("MM/DD/YYYY"),
//       endDate: dayjs(eventData.endDate).format("MM/DD/YYYY"),
//       time: dayjs(eventData.time).format("h:mm A"),
//       endTime: dayjs(eventData.endTime).format("h:mm A"),
//     };
//     await axios.put(`${BASE_URL}/admin/bookings/${id}`, updatedEventData);
//   } catch (error: any) {
//     console.error('Error updating event:', error.response?.data || error.message);
//   }
// }
  // export const deleteEvent = async (id: string): Promise<void> => {
	// try {
	//   await axios.delete(`${BASE_URL}/admin/bookings/${id}`);
	//   console.log('Event deleted successfully');
	// } catch (error) {
	//   console.error('Error deleting event:', error);
	// }
  // }
  export const deleteEvent = async (id: string) => {
     const res = await axios.delete(`${BASE_URL}/admin/bookings/${id}`);
    return res;
  }
    

// export const addEvent = async (event: any): Promise<void> => {
// 	try {
// 	  await axios.post(`${BASE_URL}/admin/bookings`, event);
// 	} catch (error) {
// 	  console.error('Error adding event:', error);
// 	}
// }
export const addEvent = async (event: any) => {
	const res =  await axios.post(`${BASE_URL}/admin/bookings`, event);
	return res
}
export const getPhotos = async () => {
  const res = await axios.get(`${BASE_URL}/files/images`);
  return res.data;
};

export const addPhotos = async (data: FormData) => {
  const res = await axios.post(`${BASE_URL}/admin/files/images/upload`, data);
  return res;
};

export const deletePhotos = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/admin/files/images/${id}`);
  return res;
};

export const getOptions = async () => {
  const response = await axios.get(`${BASE_URL}/bookings/options`);
  return response;
};

export const updateOptions = async (data: any) => {
  const res = await axios.patch(`${BASE_URL}/admin/bookings/areaOptions`, data);
  return res;
};

export const deleteOption = async (optionType: string, data: string) => {
  const res = await axios.delete(`${BASE_URL}/admin/bookings/${optionType}/${data}`);
  return res;
};

export const getBookings = async () => {
  const res = await axios.get(`${BASE_URL}/admin/bookings`);
  return res.data;
};

export const addBooking = async (data: Form) => {
  const res = await axios.post(`${BASE_URL}/bookings`, data);
  return res;
};

export const getEmployees = async () => {
  const res = await axios.get(`${BASE_URL}/admin/employees`);
  return res.data;
};

export const addEmployee = async (data: FormData) => {
  const res = await axios.post(`${BASE_URL}/admin/employees`, data);
  return res;
};

export const editEmployee = async (id: string, data: FormData) => {
  const res = await axios.patch(`${BASE_URL}/admin/employees/${id}`, data);
  return res;
};

export const deleteEmployee = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/admin/employees/${id}`);
  return res;
};

export const getPrice = async () => {
  const res = await axios.get(`${BASE_URL}/bookings/options`);
  return res.data;
};

export const updatePrice = async (data: any) => {
  const res = await axios.put(`${BASE_URL}/admin/bookings/pricing/edit`, data);
  return res;
};
