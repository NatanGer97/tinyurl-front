import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "./api/useAxios";
import useAuth from "./hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const LOGIN_URL = "auth/login";

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pass]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        LOGIN_URL,
        JSON.stringify(
          { email: user, password: pass },),
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      console.log(JSON.stringify(res?.data));
      const token = res?.data?.accessToken;
      //const roles = res?.data?.roles;
      // saves into global context
      setAuth({user, pass, token});
      localStorage.setItem("auth", JSON.stringify({user, pass, token}));
      setUser("");
      setPass("");
      navigate(from, { replace: true });
      // setSuccess(true);
    } catch (err) {
        if (!err.response) {
            setErrMsg("No response from server");
        } else if (err.response.status === 400) {
            setErrMsg("Missing username or password");
        } else if (err.response.status === 401) {
            setErrMsg("Unauthorized - Invalid username or password");
        } else 
            setErrMsg("Login failed " + JSON.stringify(err.response?.data?.message));
        errRef.current.focus();

    }
  };

  return (
    <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              required
            />
            <button>Login</button>
          </form>
          <p>
            Don't have an account?
            <span className="line">
              {/* put router link in */}
              <a href="/#">Register</a>
            </span>
          </p>
        </section>
  );
};

export default Login;
