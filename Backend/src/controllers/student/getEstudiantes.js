const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getEstudiantes = async (req, res) => {
  try {
    const result = await pool.query(`
       SELECT
    e.id_estudiantes,
    e.huella,
    e.nombre_del_estudiante,
    e.identificacion,
    sa.asignatura,
    sa.especialidad,
    sa.fecha_inicio,
    sa.fecha_terminacion,
    sa.dias_semana,
    sa.horas_por_dia,
    sa.semanas_de_rotacion,
    sa.numero_horas_semanales,
    sa.semestre_academico,
    sa.id_semestre,
    p.programa
  FROM public.estudiantes e
  JOIN public.est_x_semestre es ON e.id_estudiantes = es.id_estudiante
  JOIN public."Semestre Academico" sa ON es.id_semestre = sa.id_semestre
  JOIN public.programa p ON sa.id_programa = p.id_programa
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
