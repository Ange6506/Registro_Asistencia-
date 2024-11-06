import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import RegisterPage from "./Pages/RegisterPage";
import Navbar from "./Components/Dashboard/DashboardComponents/Navbar";
import { LoginPage } from "./Pages/LoginPage";
import ListPage from "./Pages/ListPage";
import Home from "./Components/Home";
import { HomePage } from "./Pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ListPage" element={<ListPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
