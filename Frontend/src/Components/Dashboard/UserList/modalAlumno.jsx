import React, { useState, useEffect } from "react";

export const ModalAlumno = ({ ModalOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre_del_estudiante: "",
    identificacion: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

    if (!formData.nombre_del_estudiante || !formData.identificacion) {
      setError("Todos los campos deben estar llenos.");
      return;
    }

    fetch("http://localhost:5000/addAlumno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setError("Error: " + error.message);
      });
  };

  if (!ModalOpen) return null;

  return (
    <>
      {/* Mostrar el mensaje de éxito */}
      {successMessage && (
        <div
          className="fixed top-4 right-4 bg-white dark:bg-blue-800 p-4 shadow-lg rounded-md z-50 flex items-center text-blue-800 dark:text-blue-400 border-t-4 border-blue dark:border-blue-800"
          role="alert"
        >
          <p>{successMessage}</p>
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8"
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
          className="bg-white p-3 rounded-lg shadow-xl max-w-lg w-full mx-auto"
        >
          <div className="space-y-6">
            <div className="border-b border-gray-900/1 pb-11">
              <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
                <div className="flex flex-col justify-center items-start">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    Agregar Nuevo Estudiante
                  </h2>
                  <p className="text-sm text-gray-500 m-0 p-0">
                    Agrega la información del nuevo estudiante.
                  </p>
                </div>
                <div className="w-10">
                  <button type="button" onClick={onClose}>
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
            </div>
            <div className="mt-6">
              {/* Campo de Nombre del Estudiante */}
              <div className="mb-6">
                <label
                  htmlFor="nombre_del_estudiante"
                  className="block text-sm font-medium text-gray-900"
                >
                  Nombre del Estudiante
                </label>
                <input
                  type="text"
                  name="nombre_del_estudiante"
                  id="nombre_del_estudiante"
                  value={formData.nombre_del_estudiante}
                  onChange={handleChange}
                  className="block w-full mt-2 rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Nombre del Estudiante"
                />
              </div>

              {/* Campo de Identificación */}
              <div className="mb-6">
                <label
                  htmlFor="identificacion"
                  className="block text-sm font-medium text-gray-900"
                >
                  Identificación
                </label>
                <input
                  type="text"
                  name="identificacion"
                  id="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}
                  className="block w-full mt-2 rounded-md border border-gray-300 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Identificación"
                />
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
                <p>Agregar Estudiante</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
