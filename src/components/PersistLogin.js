import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PersistsLogin = () => {
  const {auth} = useAuth();
  const authLocal = useLocalStorage();

  useEffect(() => {
    console.log("PersistsLogin: " + JSON.stringify(authLocal));
    if (!auth.token ){
        <Navigate to="/" replace />
    }
  }, []);
};

export default PersistsLogin;