import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Components/Login';
import RegisterPage from './Pages/RegisterPage';
import Navbar from './Components/Navbar';
import { LoginPage } from './Pages/LoginPage'
import ListPage from './Pages/ListPage'

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