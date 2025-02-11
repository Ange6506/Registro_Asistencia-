import React, { useState, useEffect } from "react";

const AgregarUsuario = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    id_rol: "",
    estado: true,
  });
  const [error, setError] = useState(""); // Para manejar errores de validación
  const [success, setSuccess] = useState(""); // Para manejar el mensaje de éxito
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [loading, setLoading] = useState(false); // Estado para manejar la carga de los roles

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/getRoles");
        const data = await response.json();
        console.log("Roles data:", data); // Log the roles array here
        if (response.ok) {
          setRoles(data);
        } else {
          setError("No se pudieron cargar los roles.");
        }
      } catch (error) {
        console.error("Error al cargar los roles:", error);
        setError("Hubo un error al cargar los roles.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      if (
        !newUser.username ||
        !newUser.password ||
        !newUser.id_rol ||
        !newUser.estado
      ) {
        setError("Por favor, complete todos los campos.");
        return;
      } else {
        setError("");
      }

      const userData = {
        username: newUser.username,
        password: newUser.password,
        id_rol: newUser.id_rol,
        estado: newUser.estado,
      };

      console.log("Datos a enviar:", userData);

      const response = await fetch("http://localhost:5000/add_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario agregado con éxito:", data);
        setSuccess("Usuario agregado con éxito.");
        setNewUser({
          username: "",
          password: "",
          id_rol: "",
          estado: true,
        });
      } else {
        setError(data.message || "Hubo un error al agregar el usuario.");
      }
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      setError("Hubo un error inesperado. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-center mb-6">Registrar Usuario</h3>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Nombre de usuario"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Contraseña"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <select
            name="id_rol"
            value={newUser.id_rol}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role, index) => (
              <option key={`${role.id}-${index}`} value={role.id}>
                {role.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            name="estado"
            value={newUser.estado ? "activo" : "inactivo"}
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
            onClick={handleAddUser}
            className="px-6 py-2 text-white bg-blue rounded-lg shadow-md hover:bg-green-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarUsuario;
