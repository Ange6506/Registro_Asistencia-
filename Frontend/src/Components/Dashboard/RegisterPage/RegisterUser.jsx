import React from "react";

export const RegisterUser = () => {
  return <form className="bg-white p-8 rounded-lg shadow-lg w-full mx-auto ">
  <div className="space-y-11">
    <div className="border-b border-gray-900/10 pb-11">
      <h2 className="text-base font-semibold text-gray-900">Registro de Estudiantes</h2>
      <p className="mt-1 text-sm text-gray-600">Asegúrate de que la información sea precisa</p>

      {/* Grid para los campos */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        {/* Campo de Nombres */}
        <div className="sm:col-span-1">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">Nombres</label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="first-name"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              placeholder="Nombres completos"
            />
          </div>
        </div>

        {/* Primer Apellido */}
        <div className="sm:col-span-1">
          <label htmlFor="first-last-name" className="block text-sm font-medium text-gray-900">Primer Apellido</label>
          <div className="mt-2">
            <input
              type="text"
              name="first-last-name"
              id="first-last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              placeholder="Primer apellido"
            />
          </div>
        </div>

        {/* Segundo Apellido */}
        <div className="sm:col-span-1">
          <label htmlFor="second-last-name" className="block text-sm font-medium text-gray-900">Segundo Apellido</label>
          <div className="mt-2">
            <input
              type="text"
              name="second-last-name"
              id="second-last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              placeholder="Segundo apellido"
            />
          </div>
        </div>

        {/* Tipo de documento */}
        <div className="sm:col-span-1">
          <label htmlFor="document-type" className="block text-sm font-medium text-gray-900">Tipo de documento</label>
          <div className="mt-2">
            <select
              id="document-type"
              name="document-type"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            >
              <option value="" disabled selected>Seleccione tipo de documento</option>
              <option value="licencia_conducir">Cédula de ciudadanía</option>
              <option value="dni">DNI</option>
              <option value="passport">Pasaporte</option>
              <option value="carnet_extranjeria">Carné de extranjería</option>
              <option value="licencia_conducir">Licencia de conducir</option>
            </select>
          </div>
        </div>

        {/* Número de documento */}
        <div className="sm:col-span-1">
          <label htmlFor="document-number" className="block text-sm font-medium text-gray-900">Número de documento</label>
          <div className="mt-2">
            <input
              type="text"
              name="document-number"
              id="document-number"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              placeholder="Número de documento"
            />
          </div>
        </div>

        {/* Programa */}
        <div className="sm:col-span-1">
          <label htmlFor="program" className="block text-sm font-medium text-gray-900">Programa</label>
          <div className="mt-2">
            <select
              id="program"
              name="program"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            >
              <option value="" disabled selected>Seleccione un programa</option>
              <option value="enfermeria">Enfermería</option>
              <option value="psicologia">Psicología</option>
              <option value="medicina">Medicina</option>
              <option value="medicina_internos">Medicina - Internos</option>
              <option value="medicina_residentes">Medicina - Residentes</option>
            </select>
          </div>
        </div>

        {/* Fecha de Inicio */}
        <div className="sm:col-span-1">
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-900">Fecha de Inicio</label>
          <div className="mt-2">
            <input
              type="date"
              name="start-date"
              id="start-date"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Fecha Final */}
        <div className="sm:col-span-1">
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-900">Fecha Final</label>
          <div className="mt-2">
            <input
              type="date"
              name="end-date"
              id="end-date"
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Campo de huella digital */}
        <div className="col-span-full">
          <label htmlFor="fingerprint" className="block text-sm font-medium text-gray-900">Registro de Huella Digital</label>
          <div className="mt-4 flex flex-col items-center">
            {/* Área de huella */}
            <div
              className="w-full bg-gray-100 border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-600"
              id="fingerprint-area"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-12 w-12 text-indigo-600 mb-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-sm text-gray-700 mb-2">Por favor coloca tu dedo en el escáner.</p>
              <p className="text-xs text-gray-500">Esperando huella...</p>
            </div>

            {/* Botón para registrar huella */}
            <button
              type="button"
              id="register-fingerprint"
              className="mt-4 py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => registerFingerprint()}
            >
              Registrar Huella
            </button>

            <p className="mt-2 text-xs text-gray-500">Presiona el botón para registrar tu huella.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</form>;
};
