import axios from "axios";

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

const BASE_URL = "https://shine-polish-server.onrender.com";



export const signin = async (user: any) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signin`, user);
    setAuthHeader(data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
    
  } catch (error) {
    return error
  }
  };