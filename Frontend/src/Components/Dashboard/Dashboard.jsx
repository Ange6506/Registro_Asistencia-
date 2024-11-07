import React, { useState } from "react";
import Navbar from "./DashboardComponents/Navbar";
import { Sidebar } from "./DashboardComponents/Sidebar";
import { Principal } from "./Principal/Principal";
import { RegisterUser } from "./RegisterPage/RegisterUser";
import { ListaAlumnos } from "./UserList/ListaAlumnos";

export const Dashboard = () => {
  const [contenido, setContenido] = useState("Principal");
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
              {contenido === "Principal" && <Principal />}
              {contenido === "Registro" && <RegisterUser />}
              {contenido === "Lista_Alumnos" && <ListaAlumnos />}

              {/* Renderiza otros contenidos según sea necesario */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
