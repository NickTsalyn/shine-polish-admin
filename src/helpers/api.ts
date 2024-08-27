import axios from "axios";
import { Booking, UpdateEventPayload } from "@/interfaces";

const setAuthHeader = (token: string) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

const clearAuthHeader = () => {
	axios.defaults.headers.common["Authorization"] = "";
};
// console.log(axios.defaults.headers.common.Authorization);
const BASE_URL = "https://shine-polish-server.onrender.com";

export const signin = async (user: any) => {
	const res = await axios.post(`${BASE_URL}/auth/signin`, user);
	setAuthHeader(res.data.accessToken);
	return res;
  };

export const getPhotos = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/files/images`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const addPhotos = async (data: FormData) => {
	try {
		const res = await axios.post(`${BASE_URL}/admin/files/images/upload`, data);
		return res
	} catch (error) {
		console.log(error);
	}
};

export const getAreas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bookings/options`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookings = async (): Promise<Booking[]> => {
	try {
	 const response = await axios.get<Booking[]>(`${BASE_URL}/admin/bookings`);
	 console.log("Bookings received:", response.data);
	 return response.data;
	} catch (error) {
	 console.error("Error getting bookings:", error);
	 return [];
	}
   };
export const getExtras = async () => {
	try {
	 const response = await axios.get(`${BASE_URL}/admin/bookings`);
	 return response.data;
	} catch (error) {
	 console.error("Error getting extras:", error);
	 return [];
	}
}

// export const fetchData = async (): Promise<Booking[]> => {
// 	try {
// 	  const response = await axios.get(`${BASE_URL}/admin/bookings`); 
// 		return response.data;
// 	} catch (error) {
// 	  console.error('Error fetching events:', error);
// 	  return [];
// 	}
//   };

//   export const fetchData = async () => {
// 	try {
// 	  const response = await fetch(`${BASE_URL}/admin/bookings`); // URL вашого API
// 	  if (!response.ok) {
// 		throw new Error('Network response was not ok');
// 	  }
// 	  const data = await response.json();
// 	  return data; // Очікується, що це масив букінгів
// 	} catch (error) {
// 	  console.error('Failed to fetch data:', error);
// 	  throw error; // Перенаправляє помилку до handleSaveEvent
// 	}
//   };
export const updateEvent = async (id: string | number, eventData: UpdateEventPayload): Promise<void> => {
	try {
	  await axios.put(`${BASE_URL}/admin/bookings/${id}`, eventData);
	} catch (error: any) {
	  console.error('Error updating event:', error.response?.data || error.message);
	}
  }
//   export const updateEvent = async (id: string | number, EventData: any): Promise<void> => {
// 	try {
// 	  await axios.put(`${BASE_URL}/admin/bookings/${id}`, EventData);
// 	} catch (error: any) {
// 	  console.error('Error updating event:', error.response?.data || error.message);
// 	}
//   }
  export const deleteEvent = async (id: string): Promise<void> => {
	try {
	  await axios.delete(`${BASE_URL}/admin/bookings/${id}`);
	  console.log('Event deleted successfully');
	} catch (error) {
	  console.error('Error deleting event:', error);
	}
  }

export const addEvent = async (event: any): Promise<void> => {
	try {
	  await axios.post(`${BASE_URL}/admin/bookings`, event);
	} catch (error) {
	  console.error('Error adding event:', error);
	}
}


  