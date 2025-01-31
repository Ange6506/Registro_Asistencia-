import React, { useState, useEffect } from "react";
import EditarUser from "../Dashboard_UserModal/EditarUser";

export const ListUsuarios = () => {
  const [usersData, setUsersData] = useState([]); // Estado para los datos de los usuarios
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda por nombre o cédula
  const [filteredUsers, setFilteredUsers] = useState([]); // Lista filtrada de usuarios
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado para editar
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/getUser")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsersData(data);
          setFilteredUsers(data);
        } else {
          console.error("Error: La respuesta no es un arreglo", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  // Actualizar el término de búsqueda y realizar el filtrado
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Función para abrir el modal de confirmación de eliminación
  const handleDeleteUser = (user) => {
    setUserToDelete(user); // Guardamos el usuario que se va a eliminar
    setShowDeleteModal(true); // Mostramos el modal de confirmación
  };

  // Filtrar usuarios según el filtro de búsqueda
  useEffect(() => {
    if (showModal) return; // No hacer el filtrado cuando el modal está abierto

    const filtered = (Array.isArray(usersData) ? usersData : []).filter(
      (user) => {
        const nameMatch =
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id_usuario.toString().includes(searchTerm);
        return nameMatch;
      }
    );

    setFilteredUsers(filtered);
  }, [searchTerm, usersData, showModal]); // Dependemos de showModal para evitar el filtrado cuando está abierto

  // Función para mostrar "Activo" o "Inactivo" dependiendo del valor de 'estado'
  const getStatusText = (status) => {
    return status ? "Activo" : "Inactivo";
  };

  // Función para abrir el modal y pasar el usuario seleccionado
  const handleEditUser = (user) => {
    const userWithName = { ...user, name: user.username };
    delete userWithName.username; // Eliminamos 'username' si no lo necesitamos

    setSelectedUser(userWithName); // Establecer el usuario con 'name'
    setShowModal(true); // Mostrar el modal
  };

  // Función para cerrar los modales
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Función para eliminar al usuario
  const deleteUser = async () => {
    try {
      // Usamos `userToDelete` en lugar de `newUser`
      const response = await fetch(
        `http://localhost:5000/deleteUser/${userToDelete.id_usuario}`, 
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error al parsear la respuesta:", responseText);
        throw new Error(`Error en la respuesta del servidor: ${responseText.substring(0, 100)}...`);
      }
    
      if (response.ok) {
        console.log("Usuario eliminado con éxito:", data);
        closeModal(); // Cerramos el modal
        window.location.reload(); // Recargamos la página para reflejar los cambios
      } else {
        const errorMessage = data?.message || 'Error desconocido al eliminar el usuario';
        console.error("Error al eliminar el usuario:", errorMessage);
        setError(errorMessage); // Muestra el error si no se pudo eliminar
      }
    } catch (error) {
      console.error("Error completo:", error);
      setError(`Error al eliminar el usuario: ${error.message}`);
    }
  };  
  
  return (
    <section
      className="container p-4  flex flex-col"
      style={{ minHeight: "80vh" }}
    >
      <div className="p-8 rounded-lg shadow-lg w-full mx-auto bg-white">
        <div>
          <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center gap-x-3">
                <h2 className="font-medium py-2 text-xl font-medium font-serif font-bold text-blue">
                  Lista de usuarios
                </h2>
              </div>
            </div>

            <div className="w-full md:w-80">
              <div className="flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mx-3 text-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Búsqueda por Nombre o Cédula"
                  className="w-full py-2.5 md:py-1 text-gray-700 placeholder-gray-400/70 bg-white border border-blue rounded-lg pl-11 pr-5 focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-2 align-middle md:px-5 lg:px-4">
                <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                  <table
                    id="table-to-print"
                    className="min-w-full divide-y divide-blue dark:divide-blue"
                  >
                    <thead className="bg-DarkSlate dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                          ID del Usuario
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                          Nombre del Usuario
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                          Password
                        </th>
                        <th className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white">
                          Rol
                        </th>
                        <th className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                          Estado
                        </th>
                        <th className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={index}>
                            <td className="px-3 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.id_usuario}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.username}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.password}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.rol_descripcion}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {getStatusText(user.estado)}
                            </td>
                            <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-200 whitespace-nowrap">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="mr-2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487a2.6 2.6 0 1 0-3.673 3.673l-7.252 7.253a2.25 2.25 0 0 0-.57.92l-1.565 4.687a2.25 2.25 0 0 0 2.729 2.73l4.687-1.565a2.25 2.25 0 0 0 .92-.57l7.253-7.252a2.6 2.6 0 1 0-3.672-3.673l-4.687 4.688"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="mr-2"
                              >
                                 <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="red"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-4 text-sm text-center text-gray-500 dark:text-gray-300"
                          >
                            No se encontraron resultados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {showModal && selectedUser && (
        <EditarUser
          isOpen={showModal}
          onClose={closeModal}
          newUser={selectedUser}
        />
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">
              ¿Estás seguro de eliminar este usuario?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
