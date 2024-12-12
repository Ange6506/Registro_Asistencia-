import React, { useState, useEffect } from "react";

export const InfoAlumnos = ({ showModal, onClose, student }) => {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    num_documento: "",
    programa: "",
    fecha_inicial: "",
    fecha_final: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // Estado para manejar la visibilidad del mensaje

  // Actualizamos el estado de formData cuando cambia el estudiante
  useEffect(() => {
    if (student) {
      setFormData({
        clinica: student.clinica || "",
        programa: student.programa || "", // Usamos trim aquí
        semestre_academico: student.semestre_academico || "",
        asignatura: student.asignatura || "",
        especialidad: student.especialidad || "",
        nombre_estudiante: student.nombre_estudiante || "",
        identificacion: student.identificacion || "",
        semanas_rotacion: student.semanas_rotacion || "",
        horas_por_dia: student.horas_por_dia || "",
        dias_semana: student.dias_semana || "",
        numero_horas_semanales: student.numero_horas_semanales || "",
        fecha_inicio: student.fecha_inicio
        ? student.fecha_inicio.split("T")[0]
        : "",
      fecha_terminacion: student.fecha_terminacion
        ? student.fecha_terminacion.split("T")[0]
        : "",
      
      });
    }
  }, [student]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = name === "programa" ? value.trim() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de los campos requeridos
    if (
      !formData.nombre_completo ||
      !formData.primer_apellido ||
      !formData.segundo_apellido ||
      !formData.tipo_documento ||
      !formData.num_documento ||
      !formData.fecha_inicial ||
      !formData.fecha_final ||
      !formData.programa
    ) {
      setError("Todos los campos deben estar llenos.");
      return;
    }

    // Validación de fechas
    const fechaInicial = new Date(formData.fecha_inicial);
    const fechaFinal = new Date(formData.fecha_final);

    if (isNaN(fechaInicial.getTime()) || isNaN(fechaFinal.getTime())) {
      setError("Las fechas proporcionadas no son válidas.");
      return;
    }

    // Asegurarnos de que el id del estudiante esté presente antes de enviar
    if (!student.id_estudiante) {
      setError("ID del estudiante no disponible");
      return;
    }

    // Realizamos la solicitud PUT al backend
    fetch(`http://localhost:5000/updateEstudiantes/${student.id_estudiante}`, {
      method: "PUT", // Enviamos los datos en una solicitud PUT
      headers: {
        "Content-Type": "application/json", // Asegúrate de que el backend espera JSON
      },
      body: JSON.stringify(formData), // Convierte el objeto formData en una cadena JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar los datos.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados:", data);
        setSuccessMessage("Actualización exitosa!"); // Establecemos el mensaje de éxito
        setError(""); // Limpiamos el mensaje de error si existe
        setIsSuccessVisible(true); // Mostramos el mensaje emergente
        setTimeout(() => {
          setIsSuccessVisible(false); // Cerramos el mensaje después de 4 segundos
        }, 4000);
        onClose(); // Cerramos el modal al recibir respuesta exitosa
      })
      .catch((error) => {
        setError(`Error al actualizar los datos: ${error.message}`);
        setSuccessMessage(""); // Limpiamos el mensaje de éxito si ocurre un error
      });
  };

  if (!student) return null;
  return (
    <>
      {isSuccessVisible && (
        <div
          className="fixed top-4 right-4 bg-white dark:bg-blue-800 p-4 shadow-lg shadow-blue rounded-md shadow-lg z-50 flex items-center text-blue-800 dark:text-blue-400 border-t-4 border-blue dark:border-blue-800"
          role="alert"
        >
          <p>{successMessage}</p>

          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-1"
            aria-label="Close"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ${
          showModal ? "block" : "hidden"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 rounded-lg shadow-xl max-w-6xl w-full mx-auto"
        >
          <div className="space-y-11">
            <div className="border-b border-gray-900/10 p-8 pb-11">
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>


              {/* Campos del formulario */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                {/* Campo de Clinica */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor=" Clinica"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Clinica
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="clinica"
                      id="clinica"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Clinica"
                    />
                  </div>
                </div>
                {/* Programa */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="programa"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Programa
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="clinica"
                      id="clinica"
                      value={formData.programa}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Clinica"
                    />
                  </div>
                </div>
                {/* Campo de  Semenestre academico */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="semestre_academico"
                    className="block text-sm font-medium text-gray-900"
                  >
                   Semenestre academico
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="semestre_academico"
                      id="semestre_academico"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder=" Semenestre academico"
                    />
                  </div>
                </div>
                {/* Campo de Asignatura */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="asignatura"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Asignatura
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="asignatura"
                      id="asignatura"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Asignatura"
                    />
                  </div>
                </div>
                {/* Campo de Especialidad */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="especialidad"
                    className="block text-sm font-medium text-gray-900"
                  >
                   Especialidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="especialidad"
                      id="especialidad"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Especialidad"
                    />
                  </div>
                </div>
                {/* Campo de Nombres */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="nombre_estudiante"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Nombre Completo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="nombre_estudiante"
                      id="nombre_estudiante"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Nombres completos"
                    />
                  </div>
                </div>


                {/* Número de documento */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="identificacion"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Número de documento
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="identificacion"
                      id="identificacion"
                      value={formData.num_documento}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Número de documento"
                    />
                  </div>
                </div>
                {/* Campo de Semana de Rotación */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="semanas_rotacion"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Semana de Rotación
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="semanas_rotacion"
                      id="semanas_rotacion"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder=" Semana de Rotación"
                    />
                  </div>
                </div>
                
                {/* Campo de Hora por Día */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="horas_por_dia"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Hora por Día
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="horas_por_dia"
                      id="horas_por_dia"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="horas_por_dia"
                    />
                  </div>
                </div>
                {/* Campo de Día Semana */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="dias_semana"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Día Semana
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="dias_semana"
                      id="dias_semana"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="dias_semana"
                    />
                  </div>
                </div>
                {/* Campo de Numero de horas semanales */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="numero_horas_semanales"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Numero de horas semanales
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="numero_horas_semanales"
                      id="numero_horas_semanales"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                      placeholder="numero_horas_semanales"
                    />
                  </div>
                </div>
                {/* Fecha de Inicio */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="fecha_inicio"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Fecha de Inicio
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      value={formData.fecha_inicial}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 bg-transparent py-2 px-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Fecha Final */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="fecha_terminacion"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Fecha Terminación
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="fecha_terminacion"
                      id="fecha_terminacion"
                      value={formData.fecha_final}
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
