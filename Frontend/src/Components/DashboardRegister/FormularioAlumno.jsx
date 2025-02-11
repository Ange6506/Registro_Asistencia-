import React, { useState, useEffect } from "react";

export const FormularioAlumno = ({ onClose }) => {
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
  const [huellaEstudiante, setHuellaEstudiante] = useState(""); // Para almacenar la huella
  const [programas, setProgramas] = useState([]); // Para almacenar los programas obtenidos del servidor
  const handleChange = (e) => {
    const { name, value } = e.target;

    // No aplicar trim() a los campos donde los espacios internos son importantes, como:
    // - nombre_del_estudiante
    // - asignatura
    // - especialidad
    // - semestre_academico
    const fieldsWithoutTrim = [
      "nombre_del_estudiante",
      "asignatura",
      "especialidad",
      "semestre_academico",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: fieldsWithoutTrim.includes(name) ? value : value.trim(),
    }));
  };

  useEffect(() => {
    // Realizamos la solicitud al servidor para obtener los programas desde la tabla 'programa'
    fetch("http://localhost:5000/getPrograma") // Cambia esta URL si el endpoint es diferente
      .then((response) => response.json())
      .then((data) => {
        setProgramas(data); // Guardamos los programas en el estado
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  }, []);

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
    // Validar que la fecha de inicio no sea posterior a la fecha de terminación
    const fechaInicio = new Date(formData.fecha_inicio);
    const fechaTermino = new Date(formData.fecha_terminacion);

    if (fechaInicio > fechaTermino) {
      alert(
        "La fecha de inicio no puede ser posterior a la fecha de terminación."
      );
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
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error desconocido");
          });
        }
        return response.json();
      })
      .then(() => {
        alert("Estudiante agregado correctamente.");
        setTimeout(() => window.location.reload(), 1000); // Recargar después de 1.5 segundos
      })
      .catch((error) => {
        alert(error.message); // Aquí se muestra el mensaje de error
      });
  };

  const registerFingerprint = () => {
    // Aquí se debería usar la lógica real para capturar la huella, pero por ahora simulamos.
    const huella = "6"; // Aquí obtendrías la huella desde el escáner.

    if (!huella) {
      alert("Debe registrar una huella primero.");
      return;
    }

    setHuellaEstudiante(huella); // Guardar la huella en el estado
    alert("Huella registrada correctamente.");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xlmx-auto  w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center pb-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800">
              Agregar Nuevo Estudiante
            </h2>
            <p className="text-sm text-gray-500">
              Agrega la información del estudiante.
            </p>
          </div>
        </div>

        {/* Formulario en tres columnas */}
        <div className="grid grid-cols-3 gap-6">
          {/* Nombre del Estudiante */}
          <div>
            <label
              htmlFor="nombre_del_estudiante"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del Estudiante
            </label>
            <input
              type="text"
              name="nombre_del_estudiante"
              id="nombre_del_estudiante"
              value={formData.nombre_del_estudiante}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nombre del Estudiante"
            />
          </div>

          {/* Identificación */}
          <div>
            <label
              htmlFor="identificacion"
              className="block text-sm font-medium text-gray-700"
            >
              Identificación
            </label>
            <input
              type="text"
              name="identificacion"
              id="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Identificación"
            />
          </div>

          {/* Programa */}
          <div>
            <label
              htmlFor="programa"
              className="block text-sm font-medium text-gray-700"
            >
              Programa
            </label>
            <select
  name="programa"
  id="programa"
  value={formData.programa}
  onChange={handleChange}
  className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
>
  <option value="">Selecciona un programa</option>
  {programas.map((programa, index) => (
    <option key={programa.id || index} value={programa.nombre}>
      {programa.programa}
    </option>
  ))}
</select>

          </div>
          {/* Asignatura */}
          <div>
            <label
              htmlFor="asignatura"
              className="block text-sm font-medium text-gray-700"
            >
              Asignatura
            </label>
            <input
              type="text"
              name="asignatura"
              id="asignatura"
              value={formData.asignatura}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Asignatura"
            />
          </div>

          {/* Especialidad */}
          <div>
            <label
              htmlFor="especialidad"
              className="block text-sm font-medium text-gray-700"
            >
              Especialidad
            </label>
            <input
              type="text"
              name="especialidad"
              id="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Especialidad"
            />
          </div>

          {/* Fecha de Inicio */}
          <div>
            <label
              htmlFor="fecha_inicio"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="fecha_inicio"
              id="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Fecha de Terminación */}
          <div>
            <label
              htmlFor="fecha_terminacion"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Terminación
            </label>
            <input
              type="date"
              name="fecha_terminacion"
              id="fecha_terminacion"
              value={formData.fecha_terminacion}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Días de la Semana */}
          <div>
            <label
              htmlFor="dias_semana"
              className="block text-sm font-medium text-gray-700"
            >
              Días de la Semana
            </label>
            <input
              type="text"
              name="dias_semana"
              id="dias_semana"
              value={formData.dias_semana}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Días de la semana"
            />
          </div>

          {/* Horas por Día */}
          <div>
            <label
              htmlFor="horas_por_dia"
              className="block text-sm font-medium text-gray-700"
            >
              Horas por Día
            </label>
            <input
              type="number"
              name="horas_por_dia"
              id="horas_por_dia"
              value={formData.horas_por_dia}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Horas por Día"
            />
          </div>

          {/* Semanas de Rotación */}
          <div>
            <label
              htmlFor="semanas_de_rotacion"
              className="block text-sm font-medium text-gray-700"
            >
              Semanas de Rotación
            </label>
            <input
              type="number"
              name="semanas_de_rotacion"
              id="semanas_de_rotacion"
              value={formData.semanas_de_rotacion}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Semanas de Rotación"
            />
          </div>

          {/* Número de Horas Semanales */}
          <div>
            <label
              htmlFor="numero_horas_semanales"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Horas Semanales
            </label>
            <input
              type="number"
              name="numero_horas_semanales"
              id="numero_horas_semanales"
              value={formData.numero_horas_semanales}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Número de Horas Semanales"
            />
          </div>

          {/* Semestre Académico */}
          <div>
            <label
              htmlFor="semestre_academico"
              className="block text-sm font-medium text-gray-700"
            >
              Semestre Académico
            </label>
            <input
              type="text"
              name="semestre_academico"
              id="semestre_academico"
              value={formData.semestre_academico}
              onChange={handleChange}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Semestre Académico"
            />
          </div>
        </div>

        {/* Huella */}
        <div className="mt-6">
          <h3 className="block text-sm font-medium text-gray-700">
            Registrar Huella
          </h3>
          <div className="w-full bg-gray-100 border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-600 mx-auto max-w-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-10 w-10 text-indigo-600 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
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
      </form>
    </div>
  );
};
