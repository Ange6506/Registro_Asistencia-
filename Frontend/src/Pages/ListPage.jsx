import React from "react";
import Listado from "../Components/Listado";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";


const ListPage = () => {
  return (
    <>
   <div className="bg-gray-50 flex flex-col min-h-screen w-full">
  <Navbar />
  <div className="flex flex-1 pt-24">
    <div className="w-36"> 
      <Sidebar />
    </div>
    <div className="flex w-auto "> 
      <div className="w-full "> 
        <Listado />
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default ListPage;
