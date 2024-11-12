import React from "react";

export const Sidebar = ({ contenido, setContenido }) => {
  // Función para cerrar sesión
  const handleLogout = () => {
    console.log("Sesión cerrada.");
  };

  // Función para cambiar contenido.
  const changeContent = (contenido) => {
    setContenido(contenido);
  };

  return (
    <>
      <ul className="flex flex-col gap-y-2">
        <li>
          <button
            className="flex items-center px-4 py-2 text-violet transition hover:bg-gray-100 hover:text-violet/90 rounded-md w-full"
            onClick={() => changeContent("Main")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>

            <span className="mx-4 text-md font-medium">Home</span>
          </button>
        </li>

        <li>
          <button
            className="flex items-center px-4 py-2 text-violet transition hover:bg-gray-100 hover:text-violet/90 rounded-md w-full"
            onClick={() => changeContent("Register_Users")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-user-round-plus"
            >
              <path d="M2 21a8 8 0 0 1 13.292-6" />
              <circle cx="10" cy="8" r="5" />
              <path d="M19 16v6" />
              <path d="M22 19h-6" />
            </svg>

            <span className="mx-4 text-md font-medium">Registrar Alumno</span>
          </button>
        </li>

        <li>
          <button
            className="flex items-center px-4 py-2 text-violet transition hover:bg-gray-100 hover:text-violet/90 rounded-md w-full"
            onClick={() => changeContent("List_Users")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-users-round"
            >
              <path d="M18 21a8 8 0 0 0-16 0" />
              <circle cx="10" cy="8" r="5" />
              <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
            </svg>

            <span className="mx-4 text-md font-medium">Lista de Alumnos</span>
          </button>
        </li>
      </ul>

      <ul className="p-4">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <img
              className="object-cover w-8 h-8 rounded-full ring ring-gray-300"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
              alt=""
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
          </div>

          <div className="px-2 border-x border-gray-300">
            <h1 className="text-base font-semibold text-gray-700 capitalize">
              Mia John
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              miajohn@merakiui.com
            </p>
          </div>

          <button
            className="text-gray-600 transition hover:text-violet"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </ul>
    </>
  );
};
