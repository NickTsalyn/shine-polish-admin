import axios from "axios";
import { Booking } from "@/interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = "https://shine-polish-server.onrender.com";


export const setAuthHeader = (token: string) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
	axios.defaults.headers.common["Authorization"] = "";
};

export const signin = async (user: any) => {
	try {
		const res = await axios.post(`${BASE_URL}/auth/signin`, user);
		const token = res.data.accessToken;
		setAuthHeader(token);
		return token;
	} catch (error) {
		throw error;
	}
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
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deletePhotos = async( id: string) => {
	try {
		const res = await axios.delete(`${BASE_URL}/admin/files/images/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
}

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
		return response.data;
	} catch (error) {
		console.error("Error getting bookings:", error);
		return [];
	}
};

export const getEmployees = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/admin/employees`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const addEmployee = async (data: FormData) => {
	try {
		const res = await axios.post(`${BASE_URL}/admin/employees`, data);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const deleteEmployee = async (id: string) => {
	try {
		const res = await axios.delete(`${BASE_URL}/admin/employees/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export const updateOptions = async (data: any) => {
	try {
		const res = await axios.patch(`${BASE_URL}/admin/bookings/areaOptions`, data);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const getPrice = async () => {
	try {
		const res = await axios.get(`${BASE_URL}/bookings/options`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

export const updatePrice = async (data: any) => {
	try {
		const res = await axios.patch(`${BASE_URL}/admin/bookings/pricing/edit`, data);
		return res;
	} catch (error) {
		console.log(error);
	}
}

export const editEmployee = async (id: string, data: FormData) => {
	try {
		const res = await axios.patch(`${BASE_URL}/admin/employees/${id}`, data);
		return res;
	} catch (error) {
		console.log(error);
	}
}