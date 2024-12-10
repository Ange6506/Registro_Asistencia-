const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getAsistencia = async (req, res) => {
  try {
    // Ejecutar la consulta para obtener todos los estudiantes y sus asistencias sin el JOIN con la tabla programa
    const result = await pool.query(`
      SELECT 
        e.nombre_estudiante, 
        e.identificacion,
        e.programa,               -- Ahora el programa es parte de la tabla 'estudiantes'
        e.fecha_inicio,
        e.fecha_terminacion,
        a.fecha_hora_entrada,
        a.fecha_hora_salida
      FROM estudiantes AS e
      JOIN asistencia AS a ON e.id_estudiante = a.id_estudiante
      ORDER BY a.fecha_hora_entrada;
    `);

    // Si se obtienen resultados, responder con los datos de los estudiantes y sus asistencias
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows); // Enviar solo los datos (no el objeto completo)
    } else {
      return res
        .status(404)
        .json({ message: "No se encontraron estudiantes o asistencias" });
    }
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { getAsistencia };
