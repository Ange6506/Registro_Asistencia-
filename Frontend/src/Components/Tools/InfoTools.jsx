import React from "react";

const InfoTools = () => {
  return (
    <>
      <div className="bg-gray-50 py-24 sm:py-32 rounded-lg">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">Tecnologías utilizadas</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            Implementación de un sistema de asistencia por huella dactilar
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* React Section */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">React.js</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    React es una biblioteca de JavaScript que permite crear interfaces de usuario interactivas. Usamos React para construir la interfaz de usuario del sistema de asistencia por huella, permitiendo que los usuarios interactúen de manera intuitiva y eficiente.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className="object-cover w-full h-full"
                      src="https://reactjs.org/logo-og.png" // Puedes cambiar esta imagen por algo más relacionado si lo deseas
                      alt="React"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>

            {/* Tailwind CSS Section */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Tailwind CSS</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Tailwind CSS es un framework de diseño que permite crear interfaces personalizadas de manera rápida y eficiente. Utilizamos Tailwind para darle un diseño limpio, moderno y totalmente responsivo al sistema de asistencia.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    className="w-full max-lg:max-w-xs"
                    src="https://tailwindcss.com/_next/static/media/logo.5d2d6e5c8f3b6b41fb8f47b0c97d1154.svg"
                    alt="Tailwind CSS"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>

            {/* JavaScript Section */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">JavaScript</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    JavaScript es el lenguaje de programación que usamos para manejar la lógica de nuestro sistema. Permite interactuar con la huella dactilar de los estudiantes y registrar la asistencia de manera eficiente y precisa.
                  </p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    className="h-[min(152px,40cqw)] object-cover"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a2/JavaScript-logo.png"
                    alt="JavaScript"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>

            {/* Huellero Section */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Sistema de Huella Dactilar</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    El sistema de huella dactilar permite registrar de manera automática la asistencia de los estudiantes que se presentan en la clínica. Cada estudiante es identificado por su huella, lo que asegura precisión y rapidez en el proceso.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          Registro Huella
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">Aplicación de Asistencia</div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14"></div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoTools;
