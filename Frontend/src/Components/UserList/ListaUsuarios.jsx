import React, { useState, useEffect } from "react";

export const ListUsuarios = () => {
  const [usersData, setUsersData] = useState([]); // Estado para los datos de los usuarios
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda por nombre o cédula
  const [filteredUsers, setFilteredUsers] = useState([]); // Lista filtrada de usuarios
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada
  const [selectedProgram, setSelectedProgram] = useState(""); // Estado para el programa seleccionado

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/getUser")
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => {
        // Verificamos si 'data' es un arreglo antes de usarlo
        if (Array.isArray(data)) {
          setUsersData(data); // Guarda los datos en el estado
          setFilteredUsers(data); // Inicializa la lista filtrada con todos los datos
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

  // Actualizar el programa seleccionado y realizar el filtrado
  const handleProgramChange = (event) => {
    const program = event.target.value;
    setSelectedProgram(program);
  };

  // Actualizar la fecha seleccionada y realizar el filtrado
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  // Filtrar usuarios según los filtros de búsqueda, fecha y programa
  useEffect(() => {
    const filtered = (Array.isArray(usersData) ? usersData : []).filter((user) => {
      // Filtro por nombre o cédula
      const nameMatch =
        user.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.id_usuario.includes(searchTerm);

      // Filtro por programa (si se seleccionó un programa específico)
      const programMatch = selectedProgram
        ? user.rol && user.rol.toLowerCase() === selectedProgram.toLowerCase()
        : true;

      // Filtro por fecha (si se seleccionó una fecha específica)
      const attendanceDateMatch = selectedDate
        ? formatDate(user.fecha_hora_entrada) === formatDate(selectedDate)
        : true;

      return nameMatch && programMatch && attendanceDateMatch;
    });

    setFilteredUsers(filtered);
  }, [searchTerm, selectedDate, selectedProgram, usersData]); // Se vuelve a ejecutar cuando cambian los filtros

  // Función para formatear la fecha a 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Devuelve la fecha en formato 'YYYY-MM-DD'
  };

  // Función para formatear la fecha y hora en el formato 'YYYY-MM-DD HH:MM'
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <section className="container p-4 mx-auto flex flex-col" style={{ minHeight: "87vh" }}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-3 text-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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
                  <table id="table-to-print" className="min-w-full divide-y divide-blue dark:divide-blue">
                    <thead className="bg-DarkSlate dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white">Nombre del Usuario</th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">Password</th>
                        <th className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white">ID del Usuario</th>
                        <th className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white">Rol</th>
                        <th className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={index}>
                            <td className="px-3 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.username}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.password}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.id_usuario}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.id_rol}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {user.estado}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-sm text-center text-gray-500 dark:text-gray-300">
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
    </section>
  );
};
