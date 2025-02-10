import React, { useState, useEffect } from "react";
import Navbar from "./Dashboard/DashboardComponents/Navbar";
import Sidebar  from "./Dashboard/DashboardComponents/Sidebar";
import { ListaAlumnos } from "./UserList/ListaAlumnos";
import { Huellero } from "./Dashboard/Simulador_huellero/huellero";
import { ListAsistencia } from "./UserList/ListAsistencia";
import { Programa } from "./UserList/Programa";
import { FormularioAlumno } from "./DashboardRegister/FormularioAlumno";
import  AgregarPrograma  from "./DashboardRegister/AgregarPrograma";
import { ListUsuarios } from "./UserList/ListaUsuarios";
import About  from "./about us/About";
import AgregarUser  from "./DashboardRegister/agregarUser";
import InfoTools  from "./Tools/InfoTools";
import  imgen  from "../assets/Img/Diseños/Imagen.jpeg"; // Import useNavigate

export const Dashboard = () => {
  const [contenido, setContenido] = useState("");  // Estado para manejar el contenido
  const [username, setUsername] = useState("");  // Estado para manejar el nombre de usuario

  useEffect(() => {
    // Recuperamos el nombre de usuario desde localStorage
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);  // Establecer el nombre de usuario

      // Establecer el contenido inicial dependiendo del nombre de usuario
      if (storedUsername === "Administrador") {
        setContenido("Lista_Alumnos");  // Si es Administrador, muestra "Registro"
      } else if (storedUsername === "Usuario") {
        setContenido("Lista_Asistencia");  // Si es Usuario, muestra "Lista de Asistencia"
      }
    } else {
      // Si no hay usuario logueado, redirigir al login (opcional)
      window.location.href = "/";
    }
  }, []);  // Solo se ejecuta al montar el componente

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
              <div className="mt-4">
          <hr className="my-4 border-t border-gray-300" />
          <img src={imgen} alt="Imagen del menú" className="w-full h-auto rounded-md" />
        </div>
           </div>
          </div>
          <div className="bg-gray-200 w-5/6">
            <div className="p-8">
              {/* Renderizar contenido según el estado de "contenido" */}
              {contenido === "Lista_Alumnos" && <ListaAlumnos />}
              {contenido === "Huellero" && <Huellero />}
              {contenido === "Lista_Asistencia" && <ListAsistencia />}
              {contenido === "Programa" && <Programa />}
              {contenido === "FormularioAlumno" && <FormularioAlumno />}
              {contenido === "AgregarPrograma" && <AgregarPrograma />}
              {contenido === "ListUsuarios" && <ListUsuarios />}
              {contenido === "AgregarUser" && <AgregarUser />}
              {contenido === "InfoTools" && <InfoTools />}
              {contenido === "About" && <About />}

              </div>
          </div>
        </div>
      </div>
    </>
  );
};
