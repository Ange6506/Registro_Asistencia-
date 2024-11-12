import React from "react";
import Logo from "../../../assets/Img/Logo.png";

const Navbar = () => {
  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
                  Clínica
                </p>
                <p className="text-lg font-medium font-serif text-violet">
                  Rafael Uribe Uribe
                </p>
              </div>
            </div>
          </div>

          {/* Notification Button */}
          <div className="flex items-center">
            <button
              type="button"
              className="relative p-1.5 rounded-full text-gray-500 hover:text-violet hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-bell-ring"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                <path d="M4 2C2.8 3.7 2 5.7 2 8" />
                <path d="M22 8c0-2.3-.8-4.3-2-6" />
              </svg>
              <span className="absolute bottom-6 right-0.5 w-1.5 h-1.5 rounded-full bg-Purple ring-1 ring-white"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
