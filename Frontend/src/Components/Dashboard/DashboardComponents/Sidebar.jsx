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
            className="flex items-center px-4 py-2 text-violet transition hover:bg-gray-100 hover:text-Purple rounded-md w-full"
            onClick={() => changeContent("Registro")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>

            <span className="mx-4 text-md font-medium">Registrar Alumno</span>
          </button>
        </li>

        <li>
          <button
            className="flex items-center px-4 py-2 text-violet transition hover:bg-gray-100 hover:text-Purple rounded-md w-full"
            onClick={() => changeContent("Lista_Alumnos")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
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

          <button onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
          </button>
        </div>
      </ul>
    </>
  );
};
