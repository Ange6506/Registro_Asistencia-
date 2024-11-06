import React from "react";
import Listado from "../Components/Listado";
import Navbar from "../Components/Dashboard/DashboardComponents/Navbar";
import Sidebar from "../Components/Sidebar";

const ListPage = () => {
  return (
    <>
      <div className="bg-gray-50 flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <div className="w-36">
            <Sidebar />
          </div>
          <div className="flex-1 flex justify-center mr-8">
            <Listado />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
