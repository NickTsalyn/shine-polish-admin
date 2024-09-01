import axios from "axios";
import { Form } from "@/types/types";

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
