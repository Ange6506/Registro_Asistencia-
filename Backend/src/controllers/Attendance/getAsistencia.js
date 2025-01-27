const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getAsistencia = async (req, res) => {
  try {
    // Ejecutar la consulta para obtener todos los estudiantes y sus asistencias
    const result = await pool.query(`
      SELECT 
        e.nombre_del_estudiante, 
        e.identificacion,
        p.programa,               -- Traer el programa asociado al semestre
        sa.fecha_inicio,
        sa.fecha_terminacion,
        a.fecha_hora_entrada,
        a.fecha_hora_salida
      FROM estudiantes AS e
      -- Unir estudiantes con est_x_semestre usando el id_estudiante
      JOIN est_x_semestre AS es ON e.id_estudiantes = es.id_estudiante
      -- Unir est_x_semestre con asistencia usando el id_est_x_semestre
      JOIN public.asistencia AS a ON es.id_est_x_semestre = a.id_est_x_semestre
      -- Unir con Semestre Academico para obtener el programa asociado
      JOIN public."Semestre Academico" AS sa ON es.id_semestre = sa.id_semestre
      -- Unir con Programa para obtener el nombre del programa
      JOIN public.programa AS p ON sa.id_programa = p.id_programa
      ORDER BY a.fecha_hora_entrada;
    `);

    // Si se obtienen resultados, responder con los datos de los estudiantes y sus asistencias
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows); // Enviar solo los datos (no el objeto completo)
    } else {
      return res.status(404).json({ message: "No se encontraron estudiantes o asistencias" });
    }
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    // Enviar un mensaje más detallado en caso de error
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = { getAsistencia };
