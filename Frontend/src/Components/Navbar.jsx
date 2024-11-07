import React from "react";
import Logo from "../assets/Img/Logo.png";

const Navbar = () => {
  return (
      <nav className="bg-white rounded-2xl shadow-lg transition-transform transform mx-auto max-w-10xl border border-gray-200 fixed top-2 left-5 right-5 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img src={Logo} alt="Logo" className="h-10 w-auto" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-1">
                  <p className="py-2 text-xl font-medium font-serif font-bold text-blue">
                    Clinica Nueva Rafael Uribe Uribe
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-xl bg-white p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
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

