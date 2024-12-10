const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getEstudiantes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_estudiante, 
       id_huella,
       id_rol, clinica,
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
       fecha_terminacion
       FROM public.estudiantes;
    `);

    // Verifica que result.rows esté definido y contiene datos
    if (result && result.rows && result.rows.length > 0) {
      console.log(result.rows); // Verifica que los datos estén llegando correctamente
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No se encontraron estudiantes" });
    }
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = { getEstudiantes };
