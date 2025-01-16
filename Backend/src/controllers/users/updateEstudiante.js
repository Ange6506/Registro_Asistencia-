const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);


// Controlador para actualizar el estudiante
const updateEstudiante = async (req, res) => {
  const id_semestre = req.params.id;  // Obtén el id del parámetro de la URL
  const {
    semestre_academico,
    asignatura,
    especialidad,
    semanas_rotacion,
    horas_por_dia,
    dias_semana,
    numero_horas_semanales,
    fecha_inicio,
    fecha_terminacion,
  } = req.body;

  try {
    // Verificamos que el id_estudiante sea obligatorio
    if (!id_semestre) {
      return res
        .status(400)
        .json({ message: "El id del estudiante es obligatorio" });
    }

    // Validamos que todos los campos requeridos estén presentes
    if (
      !semestre_academico ||
      !asignatura ||
      !especialidad ||
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
  UPDATE "Semestre Academico"
  SET
    semestre_academico = $1,
    asignatura = $2,
    especialidad = $3,
    semanas_de_rotacion = $4,
    horas_por_dia = $5,
    dias_semana = $6,
    numero_horas_semanales = $7,
    fecha_inicio = $8,
    fecha_terminacion = $9
  WHERE id_semestre = $10
  RETURNING *;
`;
 
    // Los valores a insertar en los parámetros de la consulta SQL
    const values = [
      semestre_academico,
      asignatura,
      especialidad,
      semanas_rotacion,
      horas_por_dia,
      dias_semana,
      numero_horas_semanales,
      fechaISOInicial,
      fechaISOFinal,
      id_semestre
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


