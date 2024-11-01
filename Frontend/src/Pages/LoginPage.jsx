import React from "react";
import Login from "../Components/Login";
import Navbar from "../Components/Navbar";

export const LoginPage = () => {
  return (
    <>
      <div className="bg-gray-50 flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <div className="flex-1 flex justify-center py-20 mr-8">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};
