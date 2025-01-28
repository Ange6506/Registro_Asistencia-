import React, { useState, useEffect } from "react";
import EditarProgramaModal from "../Dashboard_UserModal/EditarProgramaModal"; // Modal de edición

export const Programa = () => {
  // Estado
  const [programsData, setProgramsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    id_programa: "",
    programa: "",
    fecha_ingreso: "",
    hora_ingreso: "",
    usuario: "",
    estado: true, // Inicializa como 'activo'
  });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);

  // Obtener programas desde el backend
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
      .catch((error) => console.error("Error al obtener los programas:", error));
  }, []);

  // Filtro de búsqueda
  useEffect(() => {
    const filtered = programsData.filter((program) =>
      program.programa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, programsData]);

  // Manejo de cambios en el input de búsqueda
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // Manejo de cambios en el formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: name === "estado" ? value === "activo" : value,
    }));
  };

  // Abrir y cerrar el modal de agregar nuevo programa
  const openModal = () => setIsModalOpen(true);
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

  // Agregar nuevo programa
  const handleAddProgram = () => {
    fetch("http://localhost:5000/addPrograma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProgram),
    })
      .then((response) => response.json())
      .then((data) => {
        setProgramsData((prevData) => [...prevData, data]);
        setFilteredPrograms((prevData) => [...prevData, data]);
        closeModal();
      })
      .catch((error) => console.error("Error al agregar el programa:", error));
  };

  // Editar programa
  const handleEditProgram = (program) => {
    setNewProgram(program);
    setIsEditModalOpen(true);
  };

  // Cerrar modal de edición
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setNewProgram({
      id_programa: "",
      programa: "",
      fecha_ingreso: "",
      hora_ingreso: "",
      usuario: "",
      estado: true,
    });
  };

  // Guardar cambios en un programa editado
  const handleSaveEditedProgram = () => {
    fetch(`http://localhost:5000/editPrograma/${newProgram.id_programa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProgram),
    })
      .then((response) => response.json())
      .then((data) => {
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
        closeEditModal();
      })
      .catch((error) => console.error("Error al editar el programa:", error));
  };

  // Confirmación de eliminación de un programa
  const deleteConfirmModal = (program) => {
    setProgramToDelete(program);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteProgram = () => {
    fetch(`http://localhost:5000/deletePrograma/${programToDelete.id_programa}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Programa eliminado exitosamente") {
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
          setIsDeleteConfirmOpen(false);
          setProgramToDelete(null);
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

            @media print {
              .no-print { display: none; }
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
    <section className="container p-4 mx-auto flex flex-col" style={{ minHeight: "87vh" }}>
      <div className="p-8 rounded-lg shadow-lg w-full mx-auto bg-white">
        <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
          <h2 className="font-medium text-xl font-bold text-blue">Programas Disponibles</h2>

          <div className="w-full md:w-80">
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="Buscar Programa"
                className="w-full py-2.5 md:py-1 text-gray-700 bg-white border border-blue rounded-lg pl-11 pr-5 focus:outline-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 w-6 h-6 text-blue" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={printTable} className="px-6 py-2 text-gray-700 bg-white border border-blue rounded-lg text-sm">
            Imprimir
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table id="table-to-print" className="min-w-full table-auto border-collapse">
            <thead className="bg-DarkSlate text-white">
              <tr>
                <th className="px-3 py-3.5 text-sm">Programa</th>
                <th className="px-4 py-3.5 text-sm">Fecha Ingreso</th>
                <th className="px-4 py-3.5 text-sm">Hora Ingreso</th>
                <th className="px-6 py-4 text-sm">Usuario</th>
                <th className="px-4 py-4 text-sm">Estado</th>
                <th className="px-6 py-4 text-sm no-print">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <tr key={program.id_programa}>
                    <td className="px-3 py-4 text-sm">{program.programa}</td>
                    <td className="px-4 py-4 text-sm">{program.fecha_ingreso}</td>
                    <td className="px-4 py-4 text-sm">{program.hora_ingreso}</td>
                    <td className="px-6 py-4 text-sm">{program.usuario}</td>
                    <td className="px-4 py-4 text-sm">{program.estado ? "Activo" : "Inactivo"}</td>
                    <td className="px-6 py-4 text-sm no-print">
                      <button onClick={() => handleEditProgram(program)} className="mr-2">
                        {/* Edit Icon */}
                      </button>
                      <button onClick={() => deleteConfirmModal(program)} className="mr-2">
                        {/* Delete Icon */}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-sm text-center text-gray-500">No se encontraron programas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edición */}
      <EditarProgramaModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveEditedProgram}
        newProgram={newProgram}
        handleInputChange={handleInputChange}
      />

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold">¿Estás seguro de eliminar este programa?</h3>
            <p className="mt-2">Este cambio no se puede deshacer.</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>
              <button onClick={handleDeleteProgram} className="px-4 py-2 bg-red-600 text-white rounded-lg">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
