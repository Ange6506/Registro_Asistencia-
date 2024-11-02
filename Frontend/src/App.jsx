import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Components/Login';
import RegisterPage from './Pages/RegisterPage';
import Navbar from './Components/Navbar';

export default function App(){
  return (
    <Router>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ListPage" element={<ListPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
    </Routes>
</Router>
  );
}