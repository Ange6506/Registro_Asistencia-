import React, { useState, useEffect } from "react";
import { InfoAlumnos } from "./InfoAlumnos";
import { Huella } from "./huella";
import { ModalAlumno } from "./modalAlumno";

export const ListaAlumnos = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAlumnoOpen, setModalAlumnoOpen] = useState(false);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAdmin(storedUsername === "Administrador");
    } else {
      window.location.href = "/";
    }
  }, []);

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
        student.nombre_del_estudiante
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        (student.identificacion &&
          String(student.identificacion).includes(value)) // Ensure it's defined before using includes
    );
    setFilteredStudents(filtered);
  };

  const closeModal = () => setIsModalOpen(false); // Close modal
  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const formatFecha = (fecha) => {
    if (!fecha || fecha === "0000-00-00") {
      return "Fecha no registrada";
    }
    return new Date(fecha).toLocaleDateString("es-ES");
  };

  const handleDeleteStudent = async (identificacion) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deletestudent/${identificacion}`,
        {
          method: "DELETE",
        }
      );

      // Add more details to see the full response
      const data = await response.json();
      console.log(data); // Check the API response

      if (response.ok) {
        setFilteredStudents(
          filteredStudents.filter(
            (student) => student.identificacion !== identificacion
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
      console.log("Estudiante seleccionado para eliminar:", selectedStudent);
      handleDeleteStudent(selectedStudent.identificacion);
      closeConfirmModal();
    }
  };
 
  const openModalAlumno = () => {
    setModalAlumnoOpen(true); // Abre el modalAlumno
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
        
        <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={openModalAlumno} 
              className="px-6 py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm"
            >
              Agregar Estudiante
            </button>
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
                      {isAdmin && (
                        <th className="px-6 py-4 text-sm font-normal text-left text-white">
                          Acción
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-300 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {student.nombre_del_estudiante}
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
                          {isAdmin && (
                            <td className="px-6 py-4 text-sm text-black-600 dark:text-gray-200 whitespace-nowrap">
                              <button
                                onClick={() => handleShowModal(student)}
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
                                    d="M16.862 4.487a2.6 2.6 0 1 0-3.673 3.673l-7.252 7.253a2.25 2.25 0 0 0-.57.92l-1.565 4.687a2.25 2.25 0 0 0 2.729 2.73l4.687-1.565a2.25 2.25 0 0 0 .92-.57l7.253-7.252a2.6 2.6 0 1 0-3.672-3.673l-4.687 4.688"
                                  />
                                </svg>
                              </button>

                              <button onClick={() => openModal(student)}>
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
                                    d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                                  />
                                </svg>
                              </button>
                            </td>
                          )}
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

      {/* Modal de Edición */}
      <InfoAlumnos
        showModal={showModal}
        onClose={handleCloseModal}
        student={selectedStudent}
      />
      {/* Modal de huella */}
      <Huella
        isModalOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
      />
      {/* Modal de modalAlumno */}
      <ModalAlumno
        ModalOpen={modalAlumnoOpen} 
        onClose={() => setModalAlumnoOpen(false)} 
      />

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">¿Estás seguro?</h2>
            <p>
              Estás a punto de eliminar a este estudiante. Esta acción es
              irreversible.
            </p>
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
    </section>
  );
};
