import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="p-4">
      <nav className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg transition-transform transform mx-auto max-w-7xl border border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200/50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src="/api/placeholder/32/32" alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a href="#" className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</a>
                  <a href="#" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50">Team</a>
                  <a href="#" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50">Projects</a>
                  <a href="#" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/50">Calendar</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="relative rounded-xl bg-white p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
              <div className="relative ml-3">
                <div>
                  <button type="button" className="relative flex rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-xl" src="/api/placeholder/32/32" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="block rounded-xl bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
            <a href="#" className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100/50">Team</a>
            <a href="#" className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100/50">Projects</a>
            <a href="#" className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100/50">Calendar</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;