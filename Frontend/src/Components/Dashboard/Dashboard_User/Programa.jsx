import React, { useState, useEffect } from "react";
import Modal from "./AgregarProgramaModal"; // Modal de agregar
import EditarProgramaModal from "./EditarProgramaModal"; // Modal de edición

export const Programa = () => {
  const [programsData, setProgramsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de agregar
  const [newProgram, setNewProgram] = useState({
    id_programa: "",
    programa: "",
    fecha_ingreso: "",
    hora_ingreso: "",
    usuario: "",
    estado: true, // Inicializa como 'activo'
  });

  useEffect(() => {
    fetch("http://localhost:5000/getPrograma")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProgramsData(data);
          setFilteredPrograms(data);
        } else {
          console.error("Error: La respuesta no es un arreglo", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los programas:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const filtered = programsData.filter((program) =>
      program.programa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, programsData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: name === "estado" ? value === "activo" : value,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProgram({
      programa: "",
      fecha_ingreso: "",
      hora_ingreso: "",
      usuario: "",
      estado: true, // Reiniciar a 'activo'
    });
  };

  const handleAddProgram = () => {
    const programToAdd = {
      ...newProgram,
    };

    fetch("http://localhost:5000/addPrograma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        setProgramsData((prevData) => [...prevData, data]);
        setFilteredPrograms((prevData) => [...prevData, data]);
        closeModal();
      })
      .catch((error) => {
        console.error("Error al agregar el programa:", error);
      });
  };

  // Lógica para abrir el modal de edición y pasar los datos correctos
  const handleEditProgram = (program) => {
    setNewProgram(program);  // Asigna los valores del programa a editar
    setIsEditModalOpen(true);  // Abre el modal de edición
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    // Restablece los valores del nuevo programa cuando se cierra el modal de edición
    setNewProgram({
      id_programa: "",
      programa: "",
      fecha_ingreso: "",
      hora_ingreso: "",
      usuario: "",
      estado: true, // Reinicia a 'activo'
    });
  };
  // Lógica para guardar los cambios en un programa editado
  const handleSaveEditedProgram = () => {
    const updatedProgram = {
      ...newProgram,
    };

    fetch(`http://localhost:5000/editPrograma/${newProgram.id_programa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProgram),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con el programa editado
        setProgramsData((prevData) =>
          prevData.map((program) =>
            program.id_programa === data.id_programa ? data : program
          )
        );
        setFilteredPrograms((prevData) =>
          prevData.map((program) =>
            program.id_programa === data.id_programa ? data : program
          )
        );
        setIsEditModalOpen(false); // Cierra el modal de edición
      })
      .catch((error) => {
        console.error("Error al editar el programa:", error);
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
                          <th className="px-6 py-4 text-sm font-normal text-left text-white">
                            Acción
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
                                {program.estado ? "Activo" : "Inactivo"}
                              </td>
                              <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-200 whitespace-nowrap">
                                <button
                                  onClick={() => handleEditProgram(program)} 
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
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={6}
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

      {/* Modal de edición */}
      <EditarProgramaModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal} 
        onSave={handleSaveEditedProgram} // Guarda la edición
        newProgram={newProgram} // Pasa los datos del programa a editar
        handleInputChange={handleInputChange}
      />

      {/* Modal de agregar programa */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddProgram={handleAddProgram}
        newProgram={newProgram}
        handleInputChange={handleInputChange}
      />
    </section>
  );
};
