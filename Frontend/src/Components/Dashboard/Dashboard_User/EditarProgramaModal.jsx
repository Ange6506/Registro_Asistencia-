import React, { useEffect, useState } from "react";

const EditarProgramaModal = ({
  isOpen,
  onClose,
  newProgram = {}, // Asegúrate de que newProgram tenga un valor predeterminado vacío
  handleInputChange,
}) => {
  const [user, setUser] = useState(""); // Para almacenar el usuario logueado
  const [error, setError] = useState(""); // Para manejar errores de validación
  const [initialProgram, setInitialProgram] = useState(newProgram); // Guardar los datos iniciales para compararlos
  const [localProgram, setLocalProgram] = useState(newProgram); // Estado local para controlar los cambios en los campos

  useEffect(() => {
    if (isOpen) {
      setInitialProgram(newProgram); // Actualiza initialProgram al abrir el modal
      setLocalProgram(newProgram); // Asegúrate de que el formulario tenga los datos correctos cuando se abra
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      const formattedTime = currentDate.toISOString().split("T")[1].split(".")[0];

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
  }, [isOpen, handleInputChange, user, newProgram]);

  // Reset the form when modal is closed
  const handleClose = () => {
    setLocalProgram(initialProgram); // Reset the local program state
    onClose(); // Close the modal
  };

  const handleUpdateProgram = async () => {
    if (
      !localProgram.programa ||
      !localProgram.fecha_ingreso ||
      !localProgram.hora_ingreso ||
      !localProgram.usuario
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Check if the fields have actually changed
    const isChanged =
      initialProgram.programa !== localProgram.programa ||
      initialProgram.fecha_ingreso !== localProgram.fecha_ingreso ||
      initialProgram.hora_ingreso !== localProgram.hora_ingreso ||
      initialProgram.usuario !== localProgram.usuario ||
      initialProgram.estado !== localProgram.estado;

    if (!isChanged) {
      setError("No ha realizado ningún cambio. Por favor, actualice algún dato.");
      return;
    }

    try {
      setError(""); // Limpiar errores

      const programaData = {
        id_programa: localProgram.id_programa,
        programa: localProgram.programa,
        fecha_ingreso: localProgram.fecha_ingreso,
        hora_ingreso: localProgram.hora_ingreso,
        usuario: localProgram.usuario,
        estado: localProgram.estado,
      };

      console.log("Datos a enviar:", programaData);

      const response = await fetch(`http://localhost:5000/updatePrograma/${localProgram.id_programa}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programaData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Programa actualizado con éxito:", data);

        handleClose(); // Cierra el modal y restablece los campos
        setTimeout(() => {
          window.location.reload(); // Recarga la página
        }, 300);
      } else {
        console.error("Error al actualizar el programa:", data.message);
      }
    } catch (error) {
      console.error("Error al actualizar el programa:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h3 className="text-lg font-bold mb-4">Editar Programa</h3>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Programa</label>
          <input
            type="text"
            name="programa"
            value={localProgram.programa || ""} // Usar el valor del estado local
            onChange={e => handleInputChange(e, setLocalProgram)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Fecha Ingreso</label>
          <input
            type="date"
            name="fecha_ingreso"
            value={localProgram.fecha_ingreso || ""}
            onChange={e => handleInputChange(e, setLocalProgram)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Hora Ingreso</label>
          <input
            type="time"
            name="hora_ingreso"
            value={localProgram.hora_ingreso || ""}
            onChange={e => handleInputChange(e, setLocalProgram)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={localProgram.usuario || user} // Usar el valor del estado local o el usuario logueado
            onChange={e => handleInputChange(e, setLocalProgram)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={localProgram.estado ? "activo" : "inactivo"}
            onChange={e => handleInputChange(e, setLocalProgram)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpdateProgram}
            className="px-6 py-2 text-gray-700 bg-green-300 rounded-lg mr-4"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarProgramaModal;
