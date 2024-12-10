import React, { useState, useEffect } from "react";
import { InfoAlumnos } from "./InfoAlumnos";

export const ListaAlumnos = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedStudent, setSelectedStudent] = useState(null); // Estado para almacenar el estudiante seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredStudents, setFilteredStudents] = useState([]); // Lista de estudiantes filtrados
  const [studentsData, setStudentsData] = useState([]); // Lista de todos los estudiantes
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar la ventana de confirmación
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito


  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_estudiante");
        const data = await response.json();
        setStudentsData(data);
        setFilteredStudents(data); // Set initial filtered students
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter students by name or identification
    const filtered = studentsData.filter(
      (student) =>
        student.nombre_estudiante.toLowerCase().includes(value.toLowerCase()) ||
        student.identificacion.includes(value)
    );

    setFilteredStudents(filtered);
  };

  const formatFecha = (fecha) => {
    if (!fecha || fecha === "0000-00-00") {
      return "Fecha no registrada";
    }
    return new Date(fecha).toLocaleDateString("es-ES");
  };

  const handleDeleteStudent = async (num_documento) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deletestudent/${num_documento}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFilteredStudents(
          filteredStudents.filter(
            (student) => student.num_documento !== num_documento
          )
        );
        alert("Estudiante eliminado correctamente");
      } else {
        alert("Error al eliminar estudiante");
      }
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      alert("Error al eliminar estudiante");
    }
  };

  const openConfirmModal = (student) => {
    setSelectedStudent(student);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedStudent(null);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      handleDeleteStudent(selectedStudent.num_documento);
      closeConfirmModal();
    }
  };

  return (
    <section
      className="container p-4 mx-auto flex flex-col"
      style={{ minHeight: "87vh" }}
    >
      <div className="p-8 rounded-lg shadow-lg w-full mx-auto bg-white">
        <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row items-center gap-x-3">
              <h2 className="font-medium py-2 text-xl font-medium font-serif font-bold text-blue">
                Lista de Alumnos
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

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle md:px-5 lg:px-4">
              <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                <table className="min-w-full divide-y divide-blue dark:divide-blue">
                  <thead className="bg-DarkSlate dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-sm font-normal text-left text-white">
                        Nombre Completo
                      </th>
                      <th className="px-6 py-4 text-sm font-normal text-left text-white">
                        Identificación
                      </th>
                      <th className="px-6 py-4 text-sm font-normal text-left text-white">
                        Programa
                      </th>
                      <th className="px-6 py-4 text-sm font-normal text-left text-white">
                        Fecha Inicio
                      </th>
                      <th className="px-6 py-4 text-sm font-normal text-left text-white">
                        Fecha Final
                      </th>
                      <th className="px-6 py-4 text-sm font-normal text-left text-white">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-300 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {student.nombre_estudiante}
                          </td>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-300">
                            {student.identificacion}
                          </td>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-300">
                            {student.programa}
                          </td>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-300">
                            {formatFecha(student.fecha_inicio)}
                          </td>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-300">
                            {formatFecha(student.fecha_terminacion)}
                          </td>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-200 whitespace-nowrap">
                              
                                  {/* Botón de Editar */}
                                  <button onClick={() => handleShowModal(student)}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487a2.6 2.6 0 1 0-3.673 3.673l-7.252 7.253a2.25 2.25 0 0 0-.57.92l-1.565 4.687a2.25 2.25 0 0 0 2.729 2.73l4.687-1.565a2.25 2.25 0 0 0 .92-.57l7.253-7.252a2.6 2.6 0 1 0-3.672-3.673l-4.687 4.688"
                                      />
                                    </svg>
                                  </button>
                                  {/* Botón de Eliminar con Confirmación */}
                                  <button onClick={() => openConfirmModal(student)}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
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
                        <td colSpan="6" className="text-center py-4">
                          No se encontraron estudiantes.
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

      {successMessage && (
          <div className="fixed top-4 right-4 bg-white dark:bg-blue-800 p-4 shadow-lg shadow-blue rounded-md shadow-lg z-50 flex items-center text-blue-800 dark:text-blue-400 border-t-4 border-blue dark:border-blue-800" role="alert">
            <p>{successMessage}</p>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              data-dismiss-target="#alert-border-1"
              aria-label="Close"
              onClick={() => setSuccessMessage("")}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">¿Estás seguro?</h2>
            <p>Estás a punto de eliminar a este estudiante. Esta acción es irreversible.</p>
            <div className="mt-4 flex gap-x-4 justify-center">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={confirmDelete}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded"
                onClick={closeConfirmModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
       <InfoAlumnos
        showModal={showModal}
        onClose={handleCloseModal}
        student={selectedStudent} // Pasa los detalles del estudiante
      />

    </section>
  );
};
