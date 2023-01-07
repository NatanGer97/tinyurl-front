import React from "react";
import { useRef, useState, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/useAxios";

const USER_REGEX =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;
const REGISTER_URL = "auth/register";
const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pass, setPass] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [matchPass, setMatchPass] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const results = USER_REGEX.test(user);
    console.log(results);
    console.log(user);
    setValidName(results);
  }, [user]);

  useEffect(() => {
    const results = PASS_REGEX.test(pass);
    console.log(results);
    console.log(pass);
    setValidPass(results);
    const match = pass === matchPass;
    setValidMatch(match);
  }, [pass, matchPass]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pass, matchPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PASS_REGEX.test(pass);
    if (!v1 || !v2) {
      setErrMsg("Please check your username and password");
      return;
    }
    try {
      const registerPayload = JSON.stringify({
        email: user,
        password: pass,
        firstName: "test",
        lastName: "test",
      });
      const response = await axios.post(REGISTER_URL, registerPayload, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      //   console.log(response.data);
      setSuccess(true);
      // clear input fields
      setUser('');
      setPass('');
      setMatchPass('');
    } catch (err) {
        
        console.log('catch');
      if (!err?.response) {
        setErrMsg("No response from server");
      } else if (err.response.status === 409) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Registration failed");
      }

      errRef.current.focus();
    }
    console.log(user, pass);
    
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscrean"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby={"uidnote"}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              id="uinote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />4 to 16 characters, must
              start with a letter, and can only contain letters, numbers,
              dashes, and underscores.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPass ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPass || !pass ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type="password"
              id="password"
              onChange={(e) => setPass(e.target.value)}
              required
              aria-invalid={validPass ? "false" : "true"}
              aria-describedby={"pwdnote"}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
            />
            <p
              id="pwdnote"
              className={passFocus && !validPass ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 characters, at least one uppercase letter, one lowercase letter,
              one number, and one special character. <br />
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
            </p>

            <label htmlFor="confirm_pass">
              Confirm Password:
              <span className={validMatch && matchPass ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPass ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pass"
              onChange={(e) => setMatchPass(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby={"confirmnote"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords must match.
            </p>

            <button disabled={!validName || !validMatch || !validName}>
              Register
            </button>
          </form>
          <p>
            Already have an account? <br />
            {/* put router link here */}
            <span className="line">
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
