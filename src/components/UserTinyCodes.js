import { useState, useEffect } from "react";
import useAxiosToken from "../api/useAxiosToken";


const UserTinyCodes = () => {
  const [userTinyCodes, setUserTinyCodes] = useState([]);
  const axios = useAxiosToken();
  // http://localhost:3001/tinyUrl/userCodes?email=Natanger97@gmail.com
  const CODES_URL = "tinyUrl/userCodes?email=Natanger97@gmail.com";

  useEffect(() => {
    const fetchUserTinyCodes = async () => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        withCredentials: true,
      };
      const res = await axios.get(CODES_URL);
      setUserTinyCodes(res.data.codes);
    };
    fetchUserTinyCodes();
  }, []);

  return (
    <div>
      <h1>My Tiny URLs</h1>
      {userTinyCodes?.length > 0 ? (
        <ul>
          {userTinyCodes.map((code, i) => (
            <li key={i}>{code}</li>
          ))}
        </ul>
      ) : (
        <p>No Tiny URLs found</p>
      )}
    </div>
  );
};

export default UserTinyCodes;
