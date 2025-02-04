import React, { useState } from "react"; // Import useState
import Huellero from "../../assets/Img/Logos/Huellero.webp"; // Import useNavigate
import React_img from "../../assets/Img/logos/React.png"; // Import useNavigate
import tailwindcss from "../../assets/Img/Logos/tailwindcss.png"; // Import useNavigate
import JavaScript from "../../assets/Img/Logos/javascript.svg"; // Import useNavigate

import { FaHeart, FaShareAlt } from "react-icons/fa";

const InfoTools = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="bg-gray-50 py-24 sm:py-32 rounded-lg">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            Tecnologías utilizadas
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            Implementación de un sistema de asistencia por huella dactilar
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* React Section */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    React.js
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    React es una biblioteca de JavaScript que permite crear
                    interfaces de usuario interactivas. Usamos React para
                    construir la interfaz de usuario del sistema de asistencia
                    por huella, permitiendo que los usuarios interactúen de
                    manera intuitiva y eficiente.
                  </p>
                </div>
                <div class="relative min-h-[30rem] w-full grow">
                  <div class="bg-white-900">
                    <div class="flex bg-white-900 ring-white/5 flex-col items-center">
                      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
                        <div className="flex items-center p-4">
                          <div className="ml-4 flex-1">
                            <div className="font-semibold text-lg">React </div>
                            <div className="text-sm text-gray-500">
                              Biblioteca de JavaScript
                            </div>
                          </div>
                          <button className="text-gray-500">
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
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex justify-center">
                          <a
                            href="https://es.react.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={React_img}
                              alt="React_img"
                              className="w-40 h-auto rounded-t-lg"
                            />
                          </a>
                        </div>

                        <div className="p-4">
                          <p className="text-sm text-gray-700">
                            React permite construir interfaces de usuario
                            interactivas y dinámicas de manera eficiente,
                            dividiendo la UI en componentes reutilizables.
                          </p>
                        </div>

                        <div className="flex items-center p-4 space-x-2">
                          <button className="text-gray-500">
                            <FaHeart />
                          </button>
                          <button className="text-gray-500">
                            <FaShareAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tailwind CSS Section */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Tailwind CSS
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Tailwind CSS es un framework de diseño que permite crear
                    interfaces personalizadas de manera rápida y eficiente.
                    Utilizamos Tailwind para darle un diseño limpio, moderno y
                    totalmente responsivo al sistema de asistencia.
                  </p>
                </div>

                {/* Contenedor para centrar la tarjeta horizontalmente */}
                <div className="flex justify-center w-full">
                  <div className="flex flex-col sm:flex-row items-center border rounded-lg p-4 max-w-[350px] w-full space-x-0 sm:space-x-4">
                    {/* Contenido de la tarjeta */}
                    <div className="flex flex-col flex-1 space-y-2 sm:space-y-0 sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <h5 className="text-xl font-semibold">Tailwind</h5>
                        <p className="text-gray-600">CSS</p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Imagen de la tarjeta */}
                    <a
                      href="https://tailwindcss.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={tailwindcss}
                        alt="tailwindcss"
                        className="w-[100px] rounded-lg mt-4 sm:mt-0 sm:ml-4"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* JavaScript Section */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    JavaScript
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    JavaScript es el lenguaje de programación que usamos para
                    manejar la lógica de nuestro sistema. Permite interactuar
                    con la huella dactilar de los estudiantes y registrar la
                    asistencia de manera eficiente y precisa.
                  </p>
                </div>
                 {/* Contenedor para centrar la tarjeta horizontalmente */}
                 <div className="flex justify-center w-full">
                  <div className="flex flex-col sm:flex-row items-center border rounded-lg p-4 max-w-[350px] w-full space-x-0 sm:space-x-4">
                    {/* Contenido de la tarjeta */}
                    <div className="flex flex-col flex-1 space-y-2 sm:space-y-0 sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <h5 className="text-xl font-semibold">JavaScript</h5>
                        <p className="text-gray-600">JS</p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Imagen de la tarjeta */}
                    <a
                      href="https://lenguajejs.com//"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={JavaScript}
                        alt="JavaScript"
                        className="w-[70px] rounded-lg mt-4 sm:mt-0 sm:ml-4"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Huellero Section */}
            <div class="relative lg:row-span-2">
              <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Sistema de Huella Dactilar
                  </p>
                  <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    El sistema de huella dactilar permite registrar de manera
                    automática la asistencia de los estudiantes que se presentan
                    en la clínica. Cada estudiante es identificado por su
                    huella, lo que asegura precisión y rapidez en el proceso.
                  </p>
                </div>
                <div class="relative min-h-[30rem] w-full grow">
                  <div class="bg-white-900">
                    <div class="flex bg-white-900 ring-white/5 flex-col items-center">
                      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
                        <div className="flex items-center p-4">
                          <div className="ml-4 flex-1">
                            <div className="font-semibold text-lg">
                              Lector de huellas dactilares{" "}
                            </div>
                            <div className="text-sm text-gray-500">
                              HID® DigitalPersona® 4500
                            </div>
                          </div>
                          <button className="text-gray-500">
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
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex justify-center">
                          <a
                            href="https://www.hidglobal.com/es/products/4500-fingerprint-reader"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={Huellero}
                              alt="Huellero"
                              className="max-w-xs h-auto rounded-t-lg"
                            />
                          </a>
                        </div>

                        <div className="p-4">
                          <p className="text-sm text-gray-700">
                            Es un lector USB compacto que captura y cifra
                            huellas dactilares para verificación biométrica
                            segura, compatible con software y SDK de
                            DigitalPersona.
                          </p>
                        </div>

                        <div className="flex items-center p-4 space-x-2">
                          <button className="text-gray-500">
                            <FaHeart />
                          </button>
                          <button className="text-gray-500">
                            <FaShareAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoTools;
