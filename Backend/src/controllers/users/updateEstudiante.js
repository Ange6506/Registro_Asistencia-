const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

// Mapeo de los programas a sus correspondientes ID numéricos
const programaMap = {
  Enfermería: 1,
  Psicología: 2,
  Medicina: 3,
  "Medicina - Internos": 4,
  "Medicina - Residentes": 5,
  "No Definido": 6, // Añadido valor para "No Definido"
};

// Controlador para actualizar el estudiante
const updateEstudiante = async (req, res) => {
  const id_estudiante = req.params.id; // Obtén el id del parámetro de la URL
  const {
    clinica,
    programa,
    semestre_academico,
    asignatura,
    especialidad,
    nombre_estudiante,
    identificacion,
    semanas_rotacion,
    horas_por_dia,
    dias_semana,
    numero_horas_semanales,
    fecha_inicio,
    fecha_terminacion,
  } = req.body;

  // Si no hay programa seleccionado, se asigna el ID 6 (No Definido)
  const id_programa = programa
    ? programaMap[programa]
    : programaMap["No Definido"];

  // Verificar que el id_programa sea válido
  if (!id_programa) {
    return res.status(400).json({ message: "Programa no válido." });
  }

  try {
    // Verificamos que el id_estudiante sea obligatorio
    if (!id_estudiante) {
      return res
        .status(400)
        .json({ message: "El id del estudiante es obligatorio" });
    }

    // Validamos que todos los campos requeridos estén presentes
    if (
      !clinica ||
      !programa ||
      !semestre_academico ||
      !asignatura ||
      !especialidad ||
      !nombre_estudiante ||
      !identificacion ||
      !semanas_rotacion ||
      !horas_por_dia ||
      !dias_semana ||
      !numero_horas_semanales ||
      !fecha_inicio ||
      !fecha_terminacion
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Aseguramos que las fechas estén en el formato correcto (ISO 8601)
    const fechaInicial = new Date(fecha_inicio);
    const fechaFinal = new Date(fecha_terminacion);

    // Validar si las fechas son válidas
    if (isNaN(fechaInicial.getTime()) || isNaN(fechaFinal.getTime())) {
      return res
        .status(400)
        .json({ message: "Las fechas proporcionadas no son válidas" });
    }

    // Convertir las fechas a formato ISO 8601
    const fechaISOInicial = fecha_inicio.toISOString();
    const fechaISOFinal = fecha_terminacion.toISOString();

    // Definimos la consulta SQL que actualizará al estudiante
    const query = `
      UPDATE estudiantes 
      SET 
        clinica = $1,
        programa = $2,
        semestre_academico = $3, 
       asignatura = $4,
       especialidad = $5,
       nombre_estudiante  = $6, 
       identificacion = $7, 
       semanas_rotacion = $8, 
       horas_por_dia = $9, 
       dias_semana = $10, 
       numero_horas_semanales = $11, 
       fecha_inicio = $12, 
       fecha_terminacion = $13
      WHERE id_estudiante = $14
      RETURNING *;  -- Devuelve el registro actualizado
    `;

    // Los valores a insertar en los parámetros de la consulta SQL
    const values = [
      id_estudiante,
      semestre_academico,
      asignatura,
      especialidad,
      nombre_estudiante,
      identificacion,
      semanas_rotacion,
      horas_por_dia,
      dias_semana,
      numero_horas_semanales,
      fechaISOInicial,
      fechaISOFinal,
    ];

    // Ejecutamos la consulta en la base de datos
    const result = await pool.query(query, values);

    // Si no se encuentra un estudiante con ese id_estudiante
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    // Si la actualización fue exitosa, devolvemos el estudiante actualizado
    return res.status(200).json({
      message: "Estudiante actualizado correctamente",
      data: result.rows[0], // El registro actualizado
    });
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Exportamos el controlador para que pueda ser utilizado en otros archivos
module.exports = {
  updateEstudiante,
};
