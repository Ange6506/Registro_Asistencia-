import React from "react";
import  Huellero  from "../../assets/Img/Huellero.webp"; // Import useNavigate

const InfoTools = () => {
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
                <img
                  className="object-cover w-full h-48 rounded-lg shadow-lg mt-6"
                  src="https://reactjs.org/logo-og.png" // Puedes cambiar esta imagen por algo más relacionado si lo deseas
                  alt="React"
                />
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
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
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
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
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
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
        El sistema de huella dactilar permite registrar de manera automática la asistencia de los estudiantes que se presentan en la clínica. Cada estudiante es identificado por su huella, lo que asegura precisión y rapidez en el proceso.
      </p>
    </div>
    <div class="relative min-h-[30rem] w-full grow">
      <div class="bg-white-900">
        <div class="flex bg-white-900 ring-white/5 flex-col items-center">
          <div class="w-full">
            <img src={Huellero} alt="Huellero" className="w-full h-auto rounded-t-lg" />
          </div>
          <div class="inline-block w-full mt-4">
            <a 
              href="https://www.hidglobal.com/es/products/4500-fingerprint-reader"
              target="_blank"
              rel="noopener noreferrer"
              class="block border-t border-l border-r border-b border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10 transition-colors rounded-b-lg shadow-md transform hover:scale-105 text-center"
            >
              Huellero HID
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div></div>
       </div>
      </div>
    </>
  );
};

export default InfoTools;
