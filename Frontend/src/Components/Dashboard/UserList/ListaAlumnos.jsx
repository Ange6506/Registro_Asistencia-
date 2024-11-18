import React, { useState, useEffect } from "react";
import { InfoAlumnos } from "./InfoAlumnos";

export const ListaAlumnos = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedStudent, setSelectedStudent] = useState(null); // Estado para almacenar el estudiante seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredStudents, setFilteredStudents] = useState([]); // Lista de estudiantes filtrados
  const [studentsData, setStudentsData] = useState([]); // Lista de todos los estudiantes

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_estudiante");
        const data = await response.json();
        setStudentsData(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    fetchStudents();
  }, []); // Solo se ejecuta una vez al montar el componente
  

  // Función para abrir el modal y seleccionar el estudiante
  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Manejar cambio de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrar los estudiantes por nombre o número de cédula
    const filtered = studentsData.filter(
      (student) =>
        student.nombre_completo.toLowerCase().includes(value.toLowerCase()) ||
        student.num_documento.includes(value)
    );
    
    

    setFilteredStudents(filtered); // Actualizar la lista filtrada
  };

  return (
    <section className="container p-4 mx-auto flex flex-col" style={{ minHeight: "87vh" }}>
      <div className="p-8 rounded-lg shadow-lg w-full mx-auto bg-white">
        <div>
          <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center gap-x-3">
                <h2 className="font-medium py-2 text-xl font-medium font-serif font-bold text-blue">
                  Estudiantes Registrados
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
                  placeholder="Busqueda por Nombre"
                  className="w-full py-2.5 md:py-1 text-gray-700 placeholder-gray-400/70 bg-white border border-blue rounded-lg pl-11 pr-5  focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle md:px-5 lg:px-4">
                  <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                    <table className="min-w-full divide-y divide-blue dark:divide-blue">
                      <thead className="bg-DarkSlate dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            <div className="flex justify-center items-center gap-x-3">
                              <button>
                                <span>Nombre Completo</span>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            <div className="flex justify-center items-center gap-x-3">
                              <button>
                                <span> Nº Cédula</span>
                              </button>
                            </div>
                          </th>
                          
                          <th scope="col" className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Programas</span>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Fecha Inicio</span>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Fecha Final</span>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-4 py-4 text-sm font-normal text-left rtl:text-right text-white">
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Acción</span>
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                        
                       {filteredStudents.length > 0 ? (
                          filteredStudents.map((student, index) => (
                            <tr key={index}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex flex-col justify-center items-center gap-x-2">
                                <span>{student.nombre_completo} {student.primer_apellido} {student.segundo_apellido}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <span>{student.num_documento}</span>
                                </div>
                              </td>
                             
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <span>{student.programa}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <span>{new Date(student.fecha_inicial).toLocaleDateString("es-ES")}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <span>{new Date(student.fecha_final).toLocaleDateString("es-ES")}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2">
                                    <button>
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
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center py-4 text-sm text-gray-500">
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
      </div>
      <InfoAlumnos
        showModal={showModal}
        onClose={handleCloseModal}
        student={selectedStudent} // Pasa los detalles del estudiante
      />
    </section>
  );
};
