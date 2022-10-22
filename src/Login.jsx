import './App.css';
import React, { useState } from 'react';
import { Input } from 'antd';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import GoogleLogin from "./components/GoogleLogin";

const Login = ({token, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {!token ? (
        <form onSubmit={handleSubmit} className='containerLogin'>
          <div className='form'>
            <header>Login</header>
            <h3>Email Address</h3>
            <Input
              className='inputlogin'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h3 className='spasiPass'>Password</h3>
            <Input.Password
              className='inputpass'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br></br>
            <button className='buttonLogin' type='submit'>Login</button>
            <GoogleLogin setToken={setToken} label="Login with Google" />
            <div className='registerText'>
              <h3>Don't have an account?</h3>
              <a href='/register'><h3 className='registerText1'>Register here</h3></a>
            </div>
          </div>
        </form>
      ) : (
        navigate('/')
      )}
      
    </div>
  );
}

export default Login;