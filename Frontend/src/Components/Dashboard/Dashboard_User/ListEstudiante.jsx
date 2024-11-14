import React, { useState, useEffect } from "react";

export const ListEstudiante = () => {
  const [studentsData, setStudentsData] = useState([]); // Estado para los datos de los estudiantes
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda por nombre o cédula
  const [filteredStudents, setFilteredStudents] = useState([]); // Lista filtrada de estudiantes
  const [attendanceDate, setAttendanceDate] = useState(""); // Estado para la fecha de asistencia
  const [selectedProgram, setSelectedProgram] = useState(""); // Estado para el programa seleccionado
  const [dateRange, setDateRange] = useState(""); // Estado para el rango de fecha seleccionado

  // Fetch data when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/getAsistencia")
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => {
        setStudentsData(data); // Guarda los datos en el estado
        setFilteredStudents(data); // Inicializa la lista filtrada con todos los datos
      })
      .catch((error) => {
        console.error("Error al obtener los estudiantes:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterStudents(value, attendanceDate, selectedProgram, dateRange);
  };

  const handleProgramChange = (event) => {
    const program = event.target.value;
    setSelectedProgram(program);
    filterStudents(searchTerm, attendanceDate, program, dateRange);
  };

  const handleDateRangeChange = (event) => {
    const range = event.target.value;
    setDateRange(range);
    filterStudents(searchTerm, attendanceDate, selectedProgram, range);
  };

  const filterStudents = (nameOrCedula, attendanceDate, program, range) => {
    const filtered = studentsData.filter((student) => {
      // Filtro por nombre o cédula
      const nameMatch =
        student.nombre_completo
          .toLowerCase()
          .includes(nameOrCedula.toLowerCase()) ||
        student.num_documento.includes(nameOrCedula);

      // Filtro por programa (comparación insensible a mayúsculas/minúsculas y eliminando espacios)
      const programMatch = program
        ? student.programa.trim().toLowerCase() === program.trim().toLowerCase()
        : true;

      console.log(
        `Programa seleccionado: ${program}, Programa del estudiante: ${student.programa}, Coincide: ${programMatch}`
      );

      // Filtro por fecha de asistencia
      const attendanceDateMatch = attendanceDate
        ? new Date(student.fecha_hora_entrada).toLocaleDateString() ===
          new Date(attendanceDate).toLocaleDateString()
        : true;

      // Filtro por rango de fecha (día, mes, semana, año)
      const dateRangeMatch = filterByDateRange(
        student.fecha_hora_entrada,
        range
      );

      return nameMatch && programMatch && attendanceDateMatch && dateRangeMatch;
    });

    setFilteredStudents(filtered);
  };

  // Función para filtrar por rango de fecha (día, mes, semana, año)
  const filterByDateRange = (dateString, range) => {
    if (!dateString || !range) return true;

    const date = new Date(dateString);
    const today = new Date();
    let startDate, endDate;

    switch (range) {
      case "day":
        startDate = new Date(today.setHours(0, 0, 0, 0)); // Inicio del día
        endDate = new Date(today.setHours(23, 59, 59, 999)); // Fin del día
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Inicio del mes
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Fin del mes
        break;
      case "week":
        const weekStart = today.getDate() - today.getDay(); // Día de inicio de la semana (Domingo)
        startDate = new Date(today.setDate(weekStart)); // Inicio de la semana
        endDate = new Date(today.setDate(weekStart + 6)); // Fin de la semana (Sábado)
        break;
      case "year":
        startDate = new Date(today.getFullYear(), 0, 1); // Inicio del año
        endDate = new Date(today.getFullYear(), 11, 31); // Fin del año
        break;
      default:
        return true;
    }

    return date >= startDate && date <= endDate;
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
                  className="w-full py-2.5 md:py-1 text-gray-700 placeholder-gray-400/70 bg-white border border-blue rounded-lg pl-11 pr-5 focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 mt-6 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-4">
            {/* Filtro por programa */}
            <div className="flex flex-col w-32 sm:w-auto">
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
                <option value="Medicina - Residentes">
                  Medicina - Residentes
                </option>
              </select>
            </div>

            {/* Filtro por rango temporal */}
            <div className="flex flex-col w-32 sm:w-auto">
              <label className="text-sm text-gray-700">Rango de Fecha</label>
              <select
                value={dateRange}
                onChange={handleDateRangeChange}
                className="w-full py-2 text-gray-700 bg-white border border-blue rounded-lg focus:outline-none text-sm"
              >
                <option value="">Seleccionar Rango</option>
                <option value="day">Día</option>
                <option value="week">Semana</option>
                <option value="month">Mes</option>
                <option value="year">Año</option>
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
                          <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            Nombre Completo
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                            Nº Cédula
                          </th>
                          <th className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white">
                            Fecha y Hora Entrada
                          </th>
                          <th className="px-4 py-3.5 md:px-6 md:py-4 text-sm font-normal text-left rtl:text-right text-white">
                            Fecha y Hora Salida
                          </th>
                          <th className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white">
                            Programa
                          </th>
                      
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student, index) => (
                            <tr key={index}>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {student.nombre_completo}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {student.num_documento}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {formatDateTime(student.fecha_hora_entrada)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {student.fecha_hora_salida
                                  ? formatDateTime(student.fecha_hora_salida)
                                  : "No se registró Salida"}
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {student.programa}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center py-4 text-sm text-gray-500"
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
      </div>
    </section>
  );
};
