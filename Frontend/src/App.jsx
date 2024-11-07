import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterPage from "./Pages/RegisterPage";
import { LoginPage } from "./Pages/LoginPage";
import { HomePage } from "./Pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
