import React, { useEffect, useState } from "react";

const EditarProgramaModal = ({
  isOpen,
  onClose,
  newProgram = {},
  handleInputChange,
}) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [initialProgram, setInitialProgram] = useState({});

  useEffect(() => {
    if (isOpen) {
      const programCopy = JSON.parse(JSON.stringify(newProgram));
      setInitialProgram(programCopy);

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
  }, [isOpen]);

  const handleUpdateProgram = async () => {
    if (
      !newProgram.programa ||
      !newProgram.fecha_ingreso ||
      !newProgram.hora_ingreso ||
      !newProgram.usuario
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Verificar si ha habido cambios en algún campo
    const isChanged = 
      (initialProgram.programa !== newProgram.programa) ||
      (initialProgram.fecha_ingreso !== newProgram.fecha_ingreso) ||
      (initialProgram.hora_ingreso !== newProgram.hora_ingreso) ||
      (initialProgram.usuario !== newProgram.usuario) ||
      (initialProgram.estado !== newProgram.estado);

    if (!isChanged) {
      setError("No ha realizado ningún cambio. Por favor, actualice algún dato.");
      return;
    }

    try {
      setError(""); // Limpiar el error si todo está bien

      const programaData = {
        id_programa: newProgram.id_programa,
        programa: newProgram.programa,
        fecha_ingreso: newProgram.fecha_ingreso,
        hora_ingreso: newProgram.hora_ingreso,
        usuario: newProgram.usuario,
        estado: newProgram.estado,
      };

      console.log("Datos a enviar:", programaData);

      const response = await fetch(
        `http://localhost:5000/update_programa/${newProgram.id_programa}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programaData),
        }
      );

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response:', responseText);
        throw new Error(`Error en la respuesta del servidor: ${responseText.substring(0, 100)}...`);
      }

      if (response.ok) {
        console.log("Programa actualizado con éxito:", data);
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        const errorMessage = data?.message || 'Error desconocido al actualizar el programa';
        console.error("Error al actualizar el programa:", errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error completo:", error);
      setError(`Error al actualizar el programa: ${error.message}`);
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

        <h3 className="text-lg font-bold mb-4">Editar Programa</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Programa</label>
          <input
            type="text"
            name="programa"
            value={newProgram.programa || ""}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Fecha Ingreso</label>
          <input
            type="date"
            name="fecha_ingreso"
            value={newProgram.fecha_ingreso || ""}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Hora Ingreso</label>
          <input
            type="time"
            name="hora_ingreso"
            value={newProgram.hora_ingreso || ""}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
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
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
  name="estado"
  value={newProgram.estado === "activo" ? "activo" : "inactivo"}
  onChange={(e) =>
    handleInputChange({
      target: {
        name: "estado",
        value: e.target.value,
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
