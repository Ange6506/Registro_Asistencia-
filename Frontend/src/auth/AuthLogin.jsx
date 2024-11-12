import React from "react";

export const AuthLogin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-teal-500">
      <div className="h-2/3 w-2/3 bg-white rounded-3xl overflow-hidden">
        <div className="flex justify-between h-full">
          {/* Sección de la imagen */}
          <div className="flex-1">
            <img
              src="https://images.pexels.com/photos/18809793/pexels-photo-18809793/free-photo-of-mujer-uniforme-guantes-higiene.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Clinica Login"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Sección del formulario */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full flex items-center justify-center px-6 py-12">
              <div className="w-full max-w-md">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-black">
                    ¡Bienvenido de nuevo!
                  </h2>

                  <span className="text-md font-normal text-gray-500">
                    Ingresa tu nombre de usuario y contraseña
                  </span>
                </div>

                <form className="space-y-6">
                  <div>
                    <label for="email" class="block text-sm text-gray-500">
                      Nombre de Usuario
                    </label>

                    <div class="relative flex items-center mt-2 border border-gray-200 rounded-lg overflow-hidden">
                      <span class="absolute inset-y-0 left-0 flex items-center  border-r h-full px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>

                      <input
                        type="email"
                        placeholder="john@example.com"
                        class="block w-full py-3 text-gray-700 placeholder-gray-400/70 bg-white pl-14 pr-5 rtl:pr-12 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-500"
                    >
                      Contraseña
                    </label>

                    <div class="relative flex items-center mt-2 border border-gray-200 rounded-lg overflow-hidden">
                      <span class="absolute inset-y-0 left-0 flex items-center border-r h-full px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-lock-keyhole-open"
                        >
                          <circle cx="12" cy="16" r="1" />
                          <rect width="18" height="12" x="3" y="10" rx="2" />
                          <path d="M7 10V7a5 5 0 0 1 9.33-2.5" />
                        </svg>
                      </span>

                      <input
                        id="password"
                        name="password"
                        placeholder="**********"
                        type="password"
                        autoComplete="current-password"
                        class="block w-full py-3 text-gray-700 placeholder-gray-400/70 bg-white pl-14 pr-12 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />

                      <button
                        onclick="togglePasswordVisibility()"
                        class="absolute inset-y-0 right-0 flex items-center px-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
