import React, { useState } from "react";

const studentsData = [
  {
    name: "Luna Bedoya Cuenca",
    cedula: "1113979779",
    entrada: "07:00 a.m 05-11-2024",
    salida: "0:00 p.m 05-11-2024",
    programa: "Medicina - Internos",
    fechaInicio: "24-10-2024",
    fechaFinal: "22-02-2025",
  },
  {
    name: "Carlos Pérez",
    cedula: "1122334455",
    entrada: "08:00 a.m 05-11-2024",
    salida: "06:00 p.m 05-11-2024",
    programa: "Medicina",
    fechaInicio: "01-01-2024",
    fechaFinal: "31-12-2024",
  },
  // Agrega más estudiantes aquí
];
export const ListEstudiante = () => {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda por nombre o cédula
    const [filteredStudents, setFilteredStudents] = useState(studentsData); // Lista filtrada de estudiantes
    const [startDate, setStartDate] = useState(""); // Estado para la fecha de inicio
    const [endDate, setEndDate] = useState(""); // Estado para la fecha final
    const [selectedProgram, setSelectedProgram] = useState(""); // Estado para el programa seleccionado
  
    const handleSearchChange = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      filterStudents(value, startDate, endDate, selectedProgram);
    };
  
    const handleDateChange = () => {
      filterStudents(searchTerm, startDate, endDate, selectedProgram);
    };
  
    const handleProgramChange = (event) => {
      const program = event.target.value;
      setSelectedProgram(program);
      filterStudents(searchTerm, startDate, endDate, program);
    };
  
    const filterStudents = (nameOrCedula, start, end, program) => {
      const filtered = studentsData.filter((student) => {
        const nameMatch =
          student.name.toLowerCase().includes(nameOrCedula.toLowerCase()) ||
          student.cedula.includes(nameOrCedula);
        const programMatch = program ? student.programa === program : true;
        const startDateMatch = start
          ? new Date(student.fechaInicio) >= new Date(start)
          : true;
        const endDateMatch = end
          ? new Date(student.fechaFinal) <= new Date(end)
          : true;
  
        return nameMatch && programMatch && startDateMatch && endDateMatch;
      });
  
      setFilteredStudents(filtered);
    };
  
    return (
      <section
        className="container p-4 mx-auto flex flex-col"
        style={{ minHeight: "87vh" }}
      >
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
                    placeholder="Búsqueda por Nombre o Cédula"
                    className="w-full py-2.5 md:py-1 text-gray-700 placeholder-gray-400/70 bg-white border border-blue rounded-lg pl-11 pr-5  focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
  
            <div className="flex flex-col gap-y-4 mt-6 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-4">
              {/* Filtro por fechas */}
              <div className="flex gap-x-4 sm:gap-x-2 sm:w-auto">
                <div className="flex flex-col w-28 sm:w-32">
                  <label className="text-sm text-gray-700">Fecha de inicio</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col w-28 sm:w-32">
                  <label className="text-sm text-gray-700">Fecha final</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm"
                  />
                </div>
              </div>
  
              {/* Filtro por programa */}
              <div className="flex flex-col w-28 sm:w-auto">
                <label className="text-sm text-gray-700">Programa</label>
                <select
                  value={selectedProgram}
                  onChange={handleProgramChange}
                  className="w-full py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm"
                >
                  <option value="">Seleccionar Programa</option>
                  <option value="Enfermería">Enfermería</option>
                  <option value="Psicología">Psicología</option>
                  <option value="Medicina">Medicina</option>
                  <option value="Medicina - Internos">Medicina - Internos</option>
                  <option value="Medicina - Residentes">Medicina - Residentes</option>
                </select>
              </div>
            </div>
  
            <div className="flex flex-col justify-between flex-1 mt-6">
              <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle md:px-5 lg:px-4">
                    <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                      <table className="min-w-full divide-y divide-blue dark:divide-blue">
                        <thead className="bg-DarkSlate dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Nombre Completo
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Nº Cédula
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Fecha y Hora Entrada
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Fecha y Hora Salida
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Programa
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Fecha Inicio
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white"
                            >
                              Fecha Final
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                          {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                              <tr key={index}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                  {student.name}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                  {student.cedula}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                  {student.entrada}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                  {student.salida}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                  {student.programa}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                  {student.fechaInicio}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                  {student.fechaFinal}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center py-4 text-sm text-gray-500">
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
      </section>
    );
  };
  