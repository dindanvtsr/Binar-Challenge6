import './App.css';
import React, { useState } from 'react';
import { Input, Space } from 'antd';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import GoogleLogin from "./components/GoogleLogin";

const Register = ({ token, setToken }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName === "") {
      alert("First name is required");
      return;
    }
    if (lastName === "") {
      alert("Last name is required");
      return;
    }
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (passwordConfirm === "") {
      alert("Confirm password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        name: `${firstName} + ${lastName}`,
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
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
  }

  return (
    <div>
      {!token ? (
        <form onSubmit={handleSubmit} className='containerLogin'>
          <div className='form'>
            <header>Register</header>
            <Space direction="horizontal">
              <h3>First Name</h3>
              <h3 className='lastNameText'>Last Name</h3>
            </Space>
            <Space direction="horizontal">
              <Input
                className='inputName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                className='inputName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Space>
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
            <h3 className='spasiPass'>Confirm Password</h3>
            <Input.Password
              className='inputpass'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <br></br>
            <button type="submit" className='buttonLogin'>Register</button>
            <GoogleLogin setToken={setToken} label="Register with Google"/>
            <div className='loginText'>
              <h3>Already have an account?</h3>
              <a href='/login'><h3 className='loginText1'>Login</h3></a>
            </div>
          </div>
        </form>
      ) : (
        navigate('/')
      )}
      
    </div>
  );
}

export default Register;