import axios from "axios";

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
	localStorage.setItem("user", JSON.stringify(res.data.accessToken));
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
