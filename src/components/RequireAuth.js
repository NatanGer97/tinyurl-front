import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStoreage";
import jwt_decoded from "jwt-decode";



const RequireAuth = (props) => {
    // const {auth} = useAuth();
    
    const localAuth = useLocalStorage();
    const location = useLocation();

    const isTokenExpired = (token) => {
        let decodedToken = jwt_decoded(token);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            localStorage.clear();
            alert("Token expired. Please login again.");
            return false;
            
          } else {
            console.log("Valid token");   
            return true;
          }
       }
    

    return (
        localAuth.token  &&  isTokenExpired(localAuth.token) ? 
        <Outlet /> 
        :   <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;