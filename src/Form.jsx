import "./Form.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Form = ({ setUsername: setParentUsername }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [logusername, setLogUsername] = useState("");
  const [logpassword, setLogPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [formSwitch, setFormSwitch] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post(
        "https://tasty-gown-lion.cyclic.app/register",
        { username, password, email }
      );
      
      setParentUsername(username);
      localStorage.setItem("username", username);
      setMessageType("success");
      setMessage("User registered successfully.");
      setFormSwitch(false);
    } catch (e) {
      setMessageType("error");
      setMessage("Username already exists");
      setFormSwitch(false);
    }
  };
  const handleLogSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post("https://tasty-gown-lion.cyclic.app/login", {
        username,
        password,
      });
      if (res.data.message === "Login successful.") {
        setParentUsername(username);
        setMessage("Login successful 😊")
        localStorage.setItem("username", username);
        navigate("/openaikey");
       
      } else {
        setError(res.data.error);
      }
    } catch (e) {
      setMessageType("error");
      setMessage("Invalid credentials");
    }
  };

  return (
    <>
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true"></input>
        {formSwitch ? (
        <div className="signup">
          <form onSubmit={handleSubmit} id='signup'>
            <label for="chk"  aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required=""
            ></input>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required=""
            ></input>
            <input
              type="password"
              name="pswd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required=""
            ></input>
            <button>Sign up</button>
          </form>
        </div>
         ) : (
        <div className="login">
          <form onSubmit={handleLogSubmit}>
            <label for="chk" id='login' aria-hidden="true">
              Login
            </label>
            <input
              type="text"
              value={logusername}
              onChange={(e) => setLogUsername(e.target.value)}
              placeholder="Username"
              required=""
            ></input>
            <input
              type="password"
              value={logpassword}
              onChange={(e) => setLogPassword(e.target.value)}
              placeholder="Password"
              required=""
            ></input>
            <button>Login</button>
          </form>
        </div>
          )}
      </div>
    </>
  );
};

export default Form;
