import React, { useEffect, useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  onAddProgram,
  newProgram,
  handleInputChange,
}) => {
  const [user, setUser] = useState(""); // Para almacenar el usuario logueado
  const [error, setError] = useState(""); // Para manejar errores de validación

  useEffect(() => {
    if (isOpen) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      const formattedTime = currentDate
        .toISOString()
        .split("T")[1]
        .split(".")[0];

      if (!newProgram.fecha_ingreso) {
        handleInputChange({
          target: { name: "fecha_ingreso", value: formattedDate },
        });
      }
      if (!newProgram.hora_ingreso) {
        handleInputChange({
          target: { name: "hora_ingreso", value: formattedTime },
        });
      }

      if (!user) {
        const loggedInUser = localStorage.getItem("username");
        if (loggedInUser) {
          setUser(loggedInUser);
          handleInputChange({
            target: { name: "usuario", value: loggedInUser },
          });
        }
      }
    }
  }, [isOpen, handleInputChange, user, newProgram.fecha_ingreso, newProgram.hora_ingreso]);

  const handleAddProgram = async () => {
    try {
      if (
        !newProgram.programa ||
        !newProgram.fecha_ingreso ||
        !newProgram.hora_ingreso ||
        !newProgram.usuario
      ) {
        setError("Por favor, complete todos los campos.");
        return;
      } else {
        setError("");
      }

      const programaData = {
        programa: newProgram.programa,
        fecha_ingreso: newProgram.fecha_ingreso,
        hora_ingreso: newProgram.hora_ingreso,
        usuario: newProgram.usuario,
        estado: newProgram.estado, // Asegúrate de que sea un booleano
      };

      console.log("Datos a enviar:", programaData);

      const response = await fetch("http://localhost:5000/addPrograma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programaData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Programa agregado con éxito:", data);
        
        handleInputChange({ target: { name: "programa", value: "" } });
        handleInputChange({ target: { name: "fecha_ingreso", value: "" } });
        handleInputChange({ target: { name: "hora_ingreso", value: "" } });
        handleInputChange({ target: { name: "estado", value: true } }); // Reiniciar a "activo"
  
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        console.error("Error al agregar el programa:", data.message);
      }
    } catch (error) {
      console.error("Error al agregar el programa:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4">Agregar Programa</h3>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Programa
          </label>
          <input
            type="text"
            name="programa"
            value={newProgram.programa}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Fecha Ingreso
          </label>
          <input
            type="date"
            name="fecha_ingreso"
            value={newProgram.fecha_ingreso}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Hora Ingreso
          </label>
          <input
            type="time"
            name="hora_ingreso"
            value={newProgram.hora_ingreso}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            name="usuario"
            value={newProgram.usuario || user}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            disabled
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            name="estado"
            value={newProgram.estado ? "activo" : "inactivo"}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "estado",
                  value: e.target.value === "activo",
                },
              })
            }
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAddProgram}
            className="px-6 py-2 text-gray-700 bg-green-300 rounded-lg mr-4"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
