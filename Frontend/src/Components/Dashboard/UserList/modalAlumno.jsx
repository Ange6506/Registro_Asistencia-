import React, { useState, useEffect } from "react";

export const ModalAlumno = ({ ModalOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre_del_estudiante: "",
    identificacion: "",
    programa: "",
    asignatura: "",
    especialidad: "",
    fecha_inicio: "",
    fecha_terminacion: "",
    dias_semana: "",
    horas_por_dia: "",
    semanas_de_rotacion: "",
    numero_horas_semanales: "",
    semestre_academico: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [huellaEstudiante, setHuellaEstudiante] = useState(""); // Para almacenar la huella

  useEffect(() => {
    // Si estás editando un estudiante, podrías establecer estos valores aquí.
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (
      !formData.nombre_del_estudiante ||
      !formData.identificacion ||
      !huellaEstudiante ||
      !formData.programa ||
      !formData.asignatura ||
      !formData.especialidad ||
      !formData.fecha_inicio ||
      !formData.fecha_terminacion ||
      !formData.dias_semana ||
      !formData.horas_por_dia ||
      !formData.semanas_de_rotacion ||
      !formData.numero_horas_semanales ||
      !formData.semestre_academico
    ) {
      setError("Todos los campos deben estar llenos.");
      return;
    }

     
   // Enviar los datos al backend
   fetch("http://localhost:5000/addEstudiante", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      huella: huellaEstudiante, // Agregar la huella al cuerpo de la solicitud
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al agregar el estudiante.");
      }
      return response.json();
    })
    .then(() => {
      setSuccessMessage("Estudiante agregado correctamente.");
      onClose(); // Cerrar el modal después de agregar
      window.location.reload(); // Recargar la página al instante
    })
    .catch((error) => {
      setError("Error: " + error.message);
    });
};

const registerFingerprint = () => {
  // Aquí se debería usar la lógica real para capturar la huella, pero por ahora simulamos.
  const huella = "2"; // Aquí obtendrías la huella desde el escáner.

  if (!huella) {
    alert("Debe registrar una huella primero.");
    return;
  }

  setHuellaEstudiante(huella); // Guardar la huella en el estado
  alert("Huella registrada correctamente.");
};

if (!ModalOpen) return null;

  return (
    <>
      {/* Mostrar el mensaje de éxito */}
      {successMessage && (
        <div
          className="fixed top-4 right-4 bg-green-500 text-white p-4 shadow-lg rounded-md z-50 flex items-center border-t-4 border-green-700"
          role="alert"
        >
          <p>{successMessage}</p>
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-green-500 rounded-lg p-1.5 hover:bg-green-100 inline-flex items-center justify-center h-8 w-8"
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

      {/* Modal */}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ${
          ModalOpen ? "block" : "hidden"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-auto"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-300 pb-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">
                  Agregar Nuevo Estudiante
                </h2>
                <p className="text-sm text-gray-500">Agrega la información del estudiante.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Formulario en tres columnas */}
            <div className="grid grid-cols-3 gap-6">
             {/* Nombre del Estudiante */}
<div>
  <label
    htmlFor="nombre_del_estudiante"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Nombre del Estudiante
  </label>
  <input
    type="text"
    name="nombre_del_estudiante"
    id="nombre_del_estudiante"
    value={formData.nombre_del_estudiante}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Nombre del Estudiante"
  />
</div>

{/* Identificación */}
<div>
  <label
    htmlFor="identificacion"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Identificación
  </label>
  <input
    type="text"
    name="identificacion"
    id="identificacion"
    value={formData.identificacion}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Identificación"
  />
</div>

{/* Programa */}
<div>
  <label
    htmlFor="programa"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Programa
  </label>
  <input
    type="text"
    name="programa"
    id="programa"
    value={formData.programa}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Programa"
  />
</div>

{/* Asignatura */}
<div>
  <label
    htmlFor="asignatura"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Asignatura
  </label>
  <input
    type="text"
    name="asignatura"
    id="asignatura"
    value={formData.asignatura}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Asignatura"
  />
</div>

{/* Especialidad */}
<div>
  <label
    htmlFor="especialidad"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Especialidad
  </label>
  <input
    type="text"
    name="especialidad"
    id="especialidad"
    value={formData.especialidad}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Especialidad"
  />
</div>

{/* Fecha de Inicio */}
<div>
  <label
    htmlFor="fecha_inicio"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Fecha de Inicio
  </label>
  <input
    type="date"
    name="fecha_inicio"
    id="fecha_inicio"
    value={formData.fecha_inicio}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
  />
</div>

{/* Fecha de Terminación */}
<div>
  <label
    htmlFor="fecha_terminacion"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Fecha de Terminación
  </label>
  <input
    type="date"
    name="fecha_terminacion"
    id="fecha_terminacion"
    value={formData.fecha_terminacion}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
  />
</div>

{/* Días de la Semana */}
<div>
  <label
    htmlFor="dias_semana"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Días de la Semana
  </label>
  <input
    type="text"
    name="dias_semana"
    id="dias_semana"
    value={formData.dias_semana}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Días de la semana"
  />
</div>

{/* Horas por Día */}
<div>
  <label
    htmlFor="horas_por_dia"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Horas por Día
  </label>
  <input
    type="number"
    name="horas_por_dia"
    id="horas_por_dia"
    value={formData.horas_por_dia}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Horas por Día"
  />
</div>

{/* Semanas de Rotación */}
<div>
  <label
    htmlFor="semanas_de_rotacion"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Semanas de Rotación
  </label>
  <input
    type="number"
    name="semanas_de_rotacion"
    id="semanas_de_rotacion"
    value={formData.semanas_de_rotacion}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Semanas de Rotación"
  />
</div>

{/* Número de Horas Semanales */}
<div>
  <label
    htmlFor="numero_horas_semanales"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Número de Horas Semanales
  </label>
  <input
    type="number"
    name="numero_horas_semanales"
    id="numero_horas_semanales"
    value={formData.numero_horas_semanales}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Número de Horas Semanales"
  />
</div>

{/* Semestre Académico */}
<div>
  <label
    htmlFor="semestre_academico"
    className="block text-sm font-medium text-gray-700"  // Cambié de text-xs a text-sm
  >
    Semestre Académico
  </label>
  <input
    type="text"
    name="semestre_academico"
    id="semestre_academico"
    value={formData.semestre_academico}
    onChange={handleChange}
    className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"  // Cambié p-3 a p-2 para hacerlo más pequeño
    placeholder="Semestre Académico"
  />
</div>


            </div>

            {/* Huella */}
            <div className="mt-6">
  <h3 className="block text-sm font-medium text-gray-700">Registrar Huella</h3>
  <div className="w-full bg-gray-100 border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-600 mx-auto max-w-xs">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-10 w-10 text-indigo-600 mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>

    <button
      type="button"
      onClick={registerFingerprint}
      className="py-2 px-4 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
    >
      Registrar Huella
    </button>
    <p className="text-sm text-gray-700 mb-2 mt-3">
      Por favor coloca tu dedo en el escáner.
    </p>
    <p className="text-xs text-gray-500">
      {huellaEstudiante ? "Huella registrada." : "Esperando huella..."}
    </p>
  </div>
</div>


            {/* Botón para agregar el estudiante */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="py-2 px-6 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Agregar Estudiante
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
