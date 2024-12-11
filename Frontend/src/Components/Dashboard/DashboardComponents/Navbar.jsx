import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Logo from "../../../assets/Img/Logo.png";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Navbar = () => {
  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
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

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar los datos de autenticación del localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    // Redirigir al usuario a la página de login
    navigate("/"); // Asegúrate de que esta ruta esté configurada correctamente
  };

  return (
    <nav className="p-4 bg-white border-b border-gray-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-2 sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <img src={Logo} alt="Logo" />
            </div>

            {/* Title */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col">
                <p className="text-md font-medium font-serif text-violet">
                  Clínica Nueva
                </p>
                <p className="text-lg font-medium font-serif text-violet">
                  Rafael Uribe Uribe
                </p>
              </div>
            </div>
          </div>

          {/* Notification Button */}
          <div className="flex items-center">
            <div className="p-4">
              <div className="flex items-center gap-x-2">
                <div className="relative">
                  <img
                    className="object-cover w-8 h-8 rounded-full ring ring-gray-300"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                    alt="Perfil"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                </div>

                <div className="px-2 border-x border-gray-300">
                  <h1 className="text-base text-gray-700 capitalize">
                    Hola, <span className="text-violet">{username}</span>
                  </h1>
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
