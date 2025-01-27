import React, { useEffect, useState } from "react";

const AgregarPrograma = () => {
  const [user, setUser] = useState(""); // Para almacenar el usuario logueado
  const [newProgram, setNewProgram] = useState({
    programa: "",
    fecha_ingreso: "",
    hora_ingreso: "",
    usuario: "",
    estado: true,
  });
  const [error, setError] = useState(""); // Para manejar errores de validación

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toISOString().split("T")[1].split(".")[0];

    if (!newProgram.fecha_ingreso) {
      setNewProgram((prev) => ({ ...prev, fecha_ingreso: formattedDate }));
    }
    if (!newProgram.hora_ingreso) {
      setNewProgram((prev) => ({ ...prev, hora_ingreso: formattedTime }));
    }

    if (!user) {
      const loggedInUser = localStorage.getItem("username");
      if (loggedInUser) {
        setUser(loggedInUser);
        setNewProgram((prev) => ({ ...prev, usuario: loggedInUser }));
      }
    }
  }, [newProgram.fecha_ingreso, newProgram.hora_ingreso, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        estado: newProgram.estado,
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

        setNewProgram({
          programa: "",
          fecha_ingreso: "",
          hora_ingreso: "",
          usuario: "",
          estado: true,
        });
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

  return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-center mb-6">Agregar Programa</h3>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Programa</label>
            <input
              type="text"
              name="programa"
              value={newProgram.programa}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="Nombre del programa"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha Ingreso</label>
            <input
              type="date"
              name="fecha_ingreso"
              value={newProgram.fecha_ingreso}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hora Ingreso</label>
            <input
              type="time"
              name="hora_ingreso"
              value={newProgram.hora_ingreso}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
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

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddProgram}
              className="px-6 py-2 text-white bg-blue rounded-lg shadow-md hover:bg-green-600"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>

  );
};

export default AgregarPrograma;
