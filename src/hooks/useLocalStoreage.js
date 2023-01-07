import { useEffect, useState } from "react";


const useLocalStorage = () => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || {user: "", pass: "", token: ""});

    useEffect(() => {
        // console.log("useLocalStorage: " + JSON.stringify(auth));
    },[]);

    return auth;
};

export default useLocalStorage;