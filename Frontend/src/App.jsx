import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Components/Login';
import Listado from './Components/Listado';

export default function App(){
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Listado" element={<Listado />} />

    </Routes>
</Router>
  );
}