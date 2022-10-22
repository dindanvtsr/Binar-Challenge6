import './App.css';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import Login from './Login';
import Register from './Register';
import Protected from "./components/Protected";

function App() {
  // Get token from local storage
  const tokenLocalStorage = localStorage.getItem("token");
  // So we will pas token from local storage to this state
  // This is global state
  const [token, setToken] = useState(tokenLocalStorage);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/detail"
        element={
          <Protected token={token} setToken={setToken}>
            {<Detail />}
          </Protected>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <Protected token={token} setToken={setToken}>
            {<Detail />}
          </Protected>
        }
      />
      <Route
        path="/login"
        element={<Login token={token} setToken={setToken}/>}
      />
      <Route path="/register" element={<Register token={token} setToken={setToken}/>} />
    </Routes>
  );
}

export default App;
