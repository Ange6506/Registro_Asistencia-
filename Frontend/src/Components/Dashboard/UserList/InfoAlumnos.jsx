import React, { useState, useEffect } from 'react';

export const InfoAlumnos = ({ showModal, onClose, student }) => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    primer_apellido : '',
    segundo_apellido: '',
    tipo_documento: '',
    num_documento: '',
    programa: '',
    fecha_inicial: '',
    fecha_final: ''
  });

  // Cuando se recibe el estudiante, actualizamos el estado del formulario
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.nombre_completo || '',
        lastName: student.primer_apellido || '',
        secondLastName: student.segundo_apellido || '',
        documentType:  student.tipo_documento || '',
        documentNumber: student.num_documento || '',
        program: student.programa || '',
        startDate: student.fecha_inicial || '',
        endDate: student.fecha_final || ''
      });
    }
  }, [student]); // Esto se ejecuta cada vez que `student` cambia

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para actualizar los datos del estudiante
    console.log('Formulario enviado con los datos:', formData);
  };

  if (!student) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ${showModal ? 'block' : 'hidden'}`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mx-auto"
        >
          <div className="space-y-11">
            <div className="border-b border-gray-900/10 pb-11">
              <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
                <div className="flex flex-col justify-center items-start">
                  <div className="flex flex-row items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                      Editar Información
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 m-0 p-0">
                    Edita la información que deseas.
                  </p>
                </div>

                <div className="w-10">
                  <button onClick={onClose}>
                    <div className="flex items-center">
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
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Grid para los campos */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                {/* Campo de Nombres */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Nombres
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Nombres completos"
                    />
                  </div>
                </div>

                {/* Primer Apellido */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Primer Apellido
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Primer apellido"
                    />
                  </div>
                </div>

                {/* Segundo Apellido */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="secondLastName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Segundo Apellido
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="secondLastName"
                      id="secondLastName"
                      value={formData.secondLastName}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Segundo apellido"
                    />
                  </div>
                </div>

                {/* Tipo de documento */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="documentType"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Tipo de documento
                  </label>
                  <div className="mt-2">
                    <select
                      id="documentType"
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    >
                      <option value="" disabled>
                        Seleccione tipo de documento
                      </option>
                      <option value="cedula">Cédula de ciudadanía</option>
                      <option value="dni">DNI</option>
                      <option value="passport">Pasaporte</option>
                      <option value="carnet_extranjeria">Carné de extranjería</option>
                      <option value="licencia_conducir">Licencia de conducir</option>
                    </select>
                  </div>
                </div>

                {/* Número de documento */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="documentNumber"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Número de documento
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="documentNumber"
                      id="documentNumber"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Número de documento"
                    />
                  </div>
                </div>

                {/* Programa */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="program"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Programa
                  </label>
                  <div className="mt-2">
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 pr-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    >
                      <option value="" disabled>
                        Seleccione un programa
                      </option>
                      <option value="enfermeria">Enfermería</option>
                      <option value="psicologia">Psicología</option>
                      <option value="medicina">Medicina</option>
                    </select>
                  </div>
                </div>

                {/* Fecha de Inicio */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Fecha de Inicio
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 px-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Fecha Final */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Fecha Final
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 px-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

               
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="flex justify-center items-center gap-x-2 bg-blue text-white text-sm py-2 px-4 rounded hover:bg-blue"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.4}
                  stroke="currentColor"
                  className="w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <p>Actualizar Información</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
