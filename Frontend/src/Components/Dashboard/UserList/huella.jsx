import React, { useState, useEffect } from "react";

export const Huella = ({ isModalOpen, onClose, student }) => {
  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setIsModalVisible] = useState(isModalOpen);

  // Sincronizar el estado de apertura del modal con el estado de la prop isModalOpen
  useEffect(() => {
    setIsModalVisible(isModalOpen);
  }, [isModalOpen]);

  // Verificar la información del estudiante cada vez que se actualice
  useEffect(() => {
    console.log("Información del estudiante:", student);
  }, [student]);

  // Función para registrar la huella digital
  const registerFingerprint = () => {
    const huella_estudiante = "123e4567-e89b-12h3-a456-426655440016"; // Aquí debería obtenerse la huella del dispositivo

    if (!huella_estudiante) {
      alert("Debe registrar una huella primero.");
      return;
    }

    fetch("http://localhost:5000/add_Huella", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ huella_estudiante }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Huella registrada exitosamente.") {
          alert("Huella registrada correctamente.");
        } else {
          alert("Error al registrar huella.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al registrar huella.");
      });
  };

  return (
    <div>
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={onClose}
        >
          <div
            className="bg-white p-8 rounded-lg w-96 shadow-lg transition-all transform scale-100 hover:scale-105"
            onClick={(e) => e.stopPropagation()} // Prevenir que el modal se cierre al hacer clic dentro
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-900 font-semibold">Registro de Huella</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="w-full bg-gray-100 border-2 border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-600"
                id="huella"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-14 w-14 text-indigo-600 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm text-gray-700 mb-4">
                  Por favor coloca tu dedo en el escáner.
                </p>
                <p className="text-xs text-gray-500">Esperando huella... </p>
                <p className="text-xs text-gray-500">{student?.nombre_estudiante || "Estudiante no encontrado"}</p>

              </div>

              <button
                type="button"
                id="registrar-huella"
                className="mt-6 py-2 px-6 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                onClick={registerFingerprint}
              >
                Registrar Huella
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Presiona el botón para registrar tu huella.
              </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
