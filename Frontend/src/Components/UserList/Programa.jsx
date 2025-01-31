import React, { useState, useEffect } from "react";
import EditarProgramaModal from "../Dashboard_UserModal/EditarProgramaModal"; // Modal de edición

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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Estado para el modal de confirmación de eliminación
  const [programToDelete, setProgramToDelete] = useState(null); // Estado para guardar el programa a eliminar

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
    setNewProgram(program); // Asigna los valores del programa a editar
    setIsEditModalOpen(true); // Abre el modal de edición
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

  // Función para abrir el modal de confirmación de eliminación
  const deleteConfirmModal = (program) => {
    setProgramToDelete(program); // Guarda el programa a eliminar
    setIsDeleteConfirmOpen(true); // Abre el modal de confirmación
  };

  const handleDeleteProgram = () => {
    fetch(
      `http://localhost:5000/deletePrograma/${programToDelete.id_programa}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Programa eliminado exitosamente") {
          // Elimina el programa de la lista solo si la eliminación en la base de datos fue exitosa
          setProgramsData((prevData) =>
            prevData.filter(
              (program) => program.id_programa !== programToDelete.id_programa
            )
          );
          setFilteredPrograms((prevData) =>
            prevData.filter(
              (program) => program.id_programa !== programToDelete.id_programa
            )
          );
          setIsDeleteConfirmOpen(false); // Cierra el modal de confirmación
          setProgramToDelete(null); // Reinicia el programa a eliminar

          // Recargar la página
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el programa:", error);
        setIsDeleteConfirmOpen(false);
        setProgramToDelete(null);
      });
  };

  // Función para imprimir la tabla
  const printTable = () => {
    const tableContent = document.getElementById("table-to-print").outerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <style>
            body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: white; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border: 1px solid #ddd; font-size: 10px; }
            th { background-color: #f4f4f4; }
            h1 { font-size: 24px; text-align: center; margin-bottom: 20px; }

            /* Regla de impresión para ocultar la columna de acciones */
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h1>Lista de Asistencia</h1>
          ${tableContent}
        </body>
      </html>
    `);
    iframeDoc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
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
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={printTable}
              className="px-6 py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm flex items-center"
            >
              Imprimir
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle md:px-5 lg:px-4">
                  <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                    <table id="table-to-print" className="min-w-full divide-y divide-blue dark:divide-blue">
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
                          <th className="px-6 py-4 text-sm font-normal text-left text-white no-print">
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
                              <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-200 whitespace-nowrap no-print">
                    <button onClick={() => handleEditProgram(program)} className="mr-2">
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
                    <button onClick={() => deleteConfirmModal(program)} className="mr-2">
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

     

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold">
              ¿Estás seguro de eliminar este programa?
            </h3>
            <p className="mt-2">Este cambio no se puede deshacer.</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)} // Cierra el modal sin eliminar
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProgram} // Llama a la función de eliminación
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
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