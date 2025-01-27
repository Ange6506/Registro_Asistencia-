import React, { useEffect, useState } from "react";

const EditarUser = ({
  isOpen,
  onClose,
  newUser = {}, // Aseguramos que el componente reciba el usuario seleccionado como prop
}) => {
  const [roles, setRoles] = useState([]); // Estado para los roles
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({}); // Estado local para los datos del usuario

  useEffect(() => {
    if (isOpen) {
      const userCopy = { ...newUser }; // Copiamos el nuevo usuario
      setUserData(userCopy); // Establecemos el estado local

      // Cargar los roles desde la base de datos
      fetchRoles();

      // También verificar si el usuario está en el localStorage y configurar el campo de usuario
      const loggedInUser = localStorage.getItem("name");
      if (loggedInUser) {
        userCopy["usuario"] = loggedInUser;
        setUserData((prevData) => ({ ...prevData, name: loggedInUser })); // Actualizamos el nombre
      }
    }
  }, [isOpen, newUser]);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:5000/getRoles");
      const data = await response.json();
      console.log('Roles recibidos:', data);
      if (response.ok) {
        setRoles(data);
      } else {
        setError("No se pudieron cargar los roles.");
      }
    } catch (error) {
      console.error("Error al cargar los roles:", error);
      setError("Hubo un error al cargar los roles.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value })); // Actualizamos el estado local
  };

  const handleUpdateUser = async () => {
    if (
      !userData.name ||
      !userData.password ||
      !userData.id_rol ||
      !userData.estado
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }
  
    try {
      setError(""); // Clear previous error messages
  
      const userUpdateData = {
        id_usuario: newUser.id_usuario, // ID is not editable
        name: userData.name,
        password: userData.password,
        id_rol: userData.id_rol,
        estado: userData.estado,
      };
  
      console.log("Datos a enviar:", userUpdateData);
  
      const response = await fetch(
        `http://localhost:5000/updateUser/${newUser.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userUpdateData),
        }
      );
  
      const responseText = await response.text(); // Get raw response text
  
      let data;
      try {
        data = JSON.parse(responseText); // Try to parse JSON response
      } catch (parseError) {
        console.error("Error parsing response:", responseText);
        throw new Error(`Error en la respuesta del servidor: ${responseText.substring(0, 100)}...`);
      }
  
      if (response.ok) {
        console.log("Usuario actualizado con éxito:", data);
        onClose();
      } else {
        const errorMessage = data?.message || 'Error desconocido al actualizar el usuario';
        console.error("Error al actualizar el usuario:", errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error completo:", error);
      setError(`Error al actualizar el usuario: ${error.message}`);
    }
  };
  
  if (!isOpen) return null; // Esto asegura que el modal no se renderice si no está abierto

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h3 className="text-lg font-bold mb-4">Editar Usuario</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Usuario</label>
          <input
            type="text"
            name="id_usuario"
            value={newUser.id_usuario || ""}
            disabled
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            name="name"
            value={userData.name || ""}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="text" // Cambiado a "text" para que la contraseña se vea
            name="password"
            value={userData.password || ""}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <select
            name="id_rol"
            value={userData.id_rol || ""}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione un rol</option>
            {roles.length === 0 ? (
              <option value="">No hay roles disponibles</option>
            ) : (
              roles.map((role) => (
                <option key={role.id_rol} value={role.id_rol}>
                  {role.descripcion}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={userData.estado || "inactivo"}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpdateUser}
            className="px-6 py-2 text-gray-700 bg-green-300 rounded-lg mr-4"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarUser;
