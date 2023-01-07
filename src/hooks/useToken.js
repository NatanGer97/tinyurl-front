import { useEffect, useState} from "react";
import { json, Navigate } from "react-router-dom";
import useLocalStorage from "./useLocalStoreage";
import jwt_decoded from "jwt-decode";

const useToken = () => {
  const getToken = () => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    return token;
  };
  const [token, setToken] = useState(getToken());
  const isTokenExpired = (token) => {
    let decodedToken = jwt_decoded(token);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      localStorage.clear();
      alert("Token expired. Please login again.");
      return true;
    } else {
      console.log("Valid token");
      return false;
    }
  };

  useEffect(() => {
    if (isTokenExpired(token)) {
        <Navigate to="/login" replace />;
    }
  }, []);

  return token;
};

export default useToken;
