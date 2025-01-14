import React, { useState, useEffect } from "react";

export const Programa = () => {
  const [programsData, setProgramsData] = useState([]); // Estado para los datos de los programas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda por nombre del programa
  const [filteredPrograms, setFilteredPrograms] = useState([]); // Lista filtrada de programas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const [newProgram, setNewProgram] = useState({
    programa: "",
    fecha_ingreso: "",
    hora_ingreso: "",
    usuario: "",
    estado: "",
  }); // Estado para los datos del nuevo programa

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/getProgramas") // Asegúrate de que este endpoint sea el correcto
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProgramsData(data);
          setFilteredPrograms(data); // Inicializa la lista filtrada con todos los programas
        } else {
          console.error("Error: La respuesta no es un arreglo", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  }, []);

  // Actualizar el término de búsqueda y realizar el filtrado
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Filtrar los programas según el término de búsqueda
  useEffect(() => {
    const filtered = programsData.filter((program) =>
      program.programa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, programsData]);

  // Manejar los cambios en los campos del modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };

  // Manejar la apertura del modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Manejar el cierre del modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewProgram({
      programa: "",
      fecha_ingreso: "",
      hora_ingreso: "",
      usuario: "",
      estado: "",
    });
  };

  // Agregar el nuevo programa
  const handleAddProgram = () => {
    // Aquí puedes hacer el POST a tu servidor para agregar el programa
    fetch("http://localhost:5000/addPrograma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProgram),
    })
      .then((response) => response.json())
      .then((data) => {
        setProgramsData((prevData) => [...prevData, data]); // Actualiza los programas con el nuevo programa
        setFilteredPrograms((prevData) => [...prevData, data]);
        closeModal(); // Cierra el modal después de agregar el programa
      })
      .catch((error) => {
        console.error("Error al agregar el programa:", error);
      });
  };

  return (
    <section className="container p-4 mx-auto flex flex-col" style={{ minHeight: "87vh" }}>
      <div className="p-8 rounded-lg shadow-lg w-full mx-auto bg-white">
        <div>
          <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center gap-x-3">
                <h2 className="font-medium py-2 text-xl font-medium font-serif font-bold text-blue">
                  Programas Disponibles
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
                  placeholder="Buscar Programa"
                  className="w-full py-2.5 md:py-1 text-gray-700 placeholder-gray-400/70 bg-white border border-blue rounded-lg pl-11 pr-5 focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Botón de Agregar Programa debajo del buscador */}
          <div className="flex justify-end mt-4">
            <button
              onClick={openModal}
              className="px-6 py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm"
            >
              Agregar Programa
            </button>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle md:px-5 lg:px-4">
                  <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                    <table className="min-w-full divide-y divide-blue dark:divide-blue">
                      <thead className="bg-DarkSlate dark:bg-gray-800">
                        <tr>
                          <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            Programa
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            Fecha Ingreso
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            Hora Ingreso
                          </th>
                          <th className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                            Usuario
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                        {filteredPrograms.length > 0 ? (
                          filteredPrograms.map((program, index) => (
                            <tr key={index}>
                              <td className="px-3 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {program.programa}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {program.fecha_ingreso}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {program.hora_ingreso}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {program.usuario}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {program.estado}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-6 py-4 text-sm text-center text-gray-500 dark:text-gray-300"
                            >
                              No se encontraron programas
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
      </div>

      {/* Modal para agregar un nuevo programa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Agregar Programa</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Programa</label>
              <input
                type="text"
                name="programa"
                value={newProgram.programa}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Fecha Ingreso</label>
              <input
                type="date"
                name="fecha_ingreso"
                value={newProgram.fecha_ingreso}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Hora Ingreso</label>
              <input
                type="time"
                name="hora_ingreso"
                value={newProgram.hora_ingreso}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                name="usuario"
                value={newProgram.usuario}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                name="estado"
                value={newProgram.estado}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-700 bg-gray-300 rounded-lg mr-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddProgram}
                className="px-6 py-2 text-white bg-blue-600 rounded-lg"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
