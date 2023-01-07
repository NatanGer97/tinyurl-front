
import axios from "axios";
import useToken from "../hooks/useToken";
const BASE_URL = "http://localhost:3001/";

const useAxiosToken = () => {
  
  const axiosToken = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useToken()}`,
    },
  });
  

    return axiosToken;
};

export default useAxiosToken;
