import React, { useEffect, useState } from "react";
import { Routes, Route, redirect, Router, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users"
import Rota from "./pages/Rota";
import Local from "./pages/Local";
import Logs from "./pages/Logs";
import getCookie from "./utils/getCookie";
import { api } from "./api/serviceapi";

const App: React.FC = () => {
  const navigate = useNavigate();


  return (    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Local" element={<Local />} />
      <Route path="/Rota" element={<Rota />} /> 
      <Route path="/Logs" element={<Logs />} /> 
    </Routes>
  );
};

export default App;