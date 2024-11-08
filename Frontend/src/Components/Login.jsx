import React from "react";
import backgroundImage from '../assets/Img/Fondo.jpeg'; 
import Logo from '../assets/Img/logo.png'; 

export const Login = () => {
  return (
    <>
      <div
        className="relative flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8"
        style={{
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        
        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6">
          <img
            alt="Your Company"
            src={Logo}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Iniciar Sesiòn
          </h2>

          <form action="#" method="POST" className="space-y-6 mt-8">
            <div>
              <label htmlFor="User" className="block text-sm font-medium text-gray-900">
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="User"
                  name="User"
                  type="text"
                  required
                  autoComplete="User"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue hover:text-indigo-500">
                    Mayúscula inicial
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No sabes tu usuario o contraseña?{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-blue">
              Pregunta al encargado
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
