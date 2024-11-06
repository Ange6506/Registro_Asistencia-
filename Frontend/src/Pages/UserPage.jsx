import React from "react";
import Register from '../Components/Register';
import Navbar from '../Components/Navbar';
import Sidebar from "../Components/Sidebar";
import User from "../Components/User";

const UserPage = () => {
  return (
    <div className="bg-gray-50 flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1"> 
        <div className="w-36"> 
          <Sidebar />
        </div>
        <div className="flex-1 flex justify-center mr-8"> 
          <User />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
