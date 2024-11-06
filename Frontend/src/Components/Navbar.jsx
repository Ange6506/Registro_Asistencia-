import React from "react";
import Logo from "../assets/Img/Logo.png";

const Navbar = () => {
  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="p-4 bg-white border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-2 sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col">
                <p className="text-md font-medium font-serif text-violet">
                  Clínica
                </p>
                <p className="text-lg font-medium font-serif text-violet">
                  Rafael Uribe Uribe
                </p>
              </div>
            </div>
          </div>

          {/* User Icon and Notification Button */}
          <div className="flex items-center">
            <button
              type="button"
              className="relative p-1.5 rounded-full text-gray-500 hover:text-violet hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>

              <span class="absolute bottom-6 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-1 ring-white"></span>
            </button>
            {/* User Icon */}
            {/* <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
