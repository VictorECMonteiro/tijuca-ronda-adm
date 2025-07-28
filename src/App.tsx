import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users"
import Rota from "./pages/Rota";
import Local from "./pages/Local";
import Logs from "./pages/Logs";

const App: React.FC = () => {
  return (
    // <Rota />
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