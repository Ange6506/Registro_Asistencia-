import React, { useState } from "react";
import HomeImg from "../assets/Img/Home.svg";
import coty from "../assets/Img/coty.svg";
import react from "../assets/Img/react.svg";
import nodejs from "../assets/Img/nodejs.svg";
import tailwind from "../assets/Img/tailwind.svg";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send email)
    console.log("Email submitted:", email);
  };

  return (
    <div className="pt-32 md:py-12 xl:container m-auto px-6 md:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 my-auto w-96 h-32 rotate-45 bg-gradient-to-r from-primaryLight to-secondaryLight blur-3xl opacity-50 dark:opacity-20"
      ></div>
      <div className="relative lg:flex lg:items-center lg:gap-12">
        <div className="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
          <h1 className="text-gray-900 font-bold text-4xl md:text-6xl lg:text-5xl xl:text-6xl dark:text-white">
            Control de Asistencia para Estudiantes{" "}
          </h1>
          <p className="mt-8 text-gray-600 dark:text-gray-300">
            Este sistema de software libre está diseñado específicamente para la
            Universidad en la Clínica Nueva Rafael Uribe Uribe, ofreciendo
            seguridad y facilidad en el control de asistencia.
          </p>
          <div>
            <form onSubmit={handleSubmit} className="w-full mt-12">
              <div className="relative flex items-center px-2 p-1 rounded-full bg-white dark:bg-gray-900 border dark:border-gray-700 border-primary/10 shadow-md md:p-2 lg:pr-3">
                <div className="pl-6 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 m-auto fill-blue-900/60 dark:fill-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  autocomplete="email"
                  placeholder="Your mail address"
                  className="w-full p-4 rounded-full placeholder-gray-600 dark:placeholder-white bg-transparent"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="md:pr-1.5 lg:pr-0">
                  <button
                    type="submit"
                    title="Start buying"
                    className="relative h-12 w-20 sm:w-auto ml-auto sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative hidden w-max text-white dark:text-gray-900 font-semibold md:block">
                      Get Started
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-6 w-6 mx-auto text-white dark:text-gray-900 md:hidden"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-between items-center">
            <img
              src={tailwind}
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              alt="Tailwind Logo"
            />
            <img
              src={react}
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              alt="React Logo"
            />
            <img
              src={coty}
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              alt="Coty Logo"
            />
            <img
              src={nodejs}
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              alt="Node.js Logo"
            />
          </div>
        </div>
        <div className="overflow-hidden w-full lg:w-7/12 lg:-mr-16">
          <img src={HomeImg} alt="HomeImg" height="" width="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
