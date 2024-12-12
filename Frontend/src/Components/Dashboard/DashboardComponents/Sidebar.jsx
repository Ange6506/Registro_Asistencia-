import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = ({ contenido, setContenido }) => {
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const navigate = useNavigate(); // useNavigate para redirección

  useEffect(() => {
    // Recuperamos el nombre de usuario desde localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Establecer el nombre de usuario
    } else {
      // Si no hay nombre de usuario en localStorage, redirigimos al login
      navigate("/"); // Asegúrate de tener configurada la ruta en React Router
    }
  }, [navigate]);

  // Reusable button component for list items
  const SidebarButton = ({ onClick, icon, text }) => (
    <button
      className="flex items-center px-4 py-2 text-violet transition hover:bg-gray-100 hover:text-Purple rounded-md w-full"
      onClick={onClick}
    >
      {icon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          {icon}
        </svg>
      )}
      <span className="mx-4 text-md font-medium">{text}</span>
    </button>
  );

  return (
    <ul className="flex flex-col gap-y-2">
      {/* Si el usuario es Administrador, mostramos estas opciones */}
      {username === "Administrador" && (
        <>
          <li>
            <SidebarButton
              onClick={() => setContenido("Lista_Alumnos")}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              }
              text="Lista de Alumnos"
            />
          </li>

          <li>
            <SidebarButton
              onClick={() => setContenido("Huellero")}
              text="Huellero"
            />
          </li>
        </>
      )}

      {/* Si el usuario es Usuario, mostramos estas opciones */}
      {username === "Usuario" && (
        <>
          <li>
            <SidebarButton
              onClick={() => setContenido("Lista_Asistencia")}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              }
              text="Lista de Asistencia"
            />
          </li>

          <li>
            <SidebarButton
              onClick={() => setContenido("Lista_Alumnos")}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              }
              text="Lista de Alumnos"
            />
          </li>
        </>
      )}
    </ul>
  );
};

export default Sidebar;
