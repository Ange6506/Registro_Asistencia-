import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./views/Main";
import { RegisterUser } from "./views/RegisterUser";
import { UserList } from "./views/UserList";

export const Dashboard = () => {
  const [contenido, setContenido] = useState("Main");
  console.log(contenido);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-1 h-screen">
          {/* Sidebar */}
          <div className="bg-white w-1/6">
            <div className="flex flex-col justify-between py-8 px-6 h-full">
              {/* Enviar estado del contenido al componente Sidebar */}
              <Sidebar contenido={contenido} setContenido={setContenido} />
            </div>
          </div>
          <div className="bg-gray-200 w-5/6">
            <div className="p-8">
              {contenido === "Main" && <Main />}
              {contenido === "Register_Users" && <RegisterUser />}
              {contenido === "List_Users" && <UserList />}

              {/* Renderiza otros contenidos según sea necesario */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
