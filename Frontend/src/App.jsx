import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Components/Login';
import RegisterPage from './Pages/RegisterPage';

export default function App(){
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
    </Routes>
</Router>
  );
}