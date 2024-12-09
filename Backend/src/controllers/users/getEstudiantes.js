const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getEstudiantes = async (req, res) => {
  try {
    // Ejecutar la consulta para obtener todos los estudiantes con los datos relacionados
    const result = await pool.query(`
      SELECT 
        e.id_estudiante,
        e.id_huella,
        e.id_rol,
        c.clinica,                                  -- Clínica
        p.programa,                                 -- Programa académico
        e.semestre_academico,                        -- Semestre académico
        e.asignatura,                                -- Asignatura
        e.especialidad,                              -- Especialidad
        e.nombre_estudiante,
        e.identificacion,
        e.semanas_rotacion,
        e.horas_por_dia,
        e.dias_semana,
        e.numero_horas_semanales,
        e.fecha_inicio,
        e.fecha_terminacion
      FROM public.estudiantes AS e
      JOIN public.rol AS r ON e.id_rol = r.Id_rol
      JOIN public.huella AS h ON e.id_huella = h.id_huella
      JOIN public.clinica AS c ON e.id_clinica = c.id_clinica  -- Relación con la clínica
      JOIN public.programa AS p ON e.id_programa = p.id_programa  -- Relación con el programa
    `);

    // Si se obtienen resultados, responder con los datos de los estudiantes
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows); // Enviar solo los datos (no el objeto completo)
    } else {
      return res.status(404).json({ message: "No se encontraron estudiantes" });
    }
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { getEstudiantes };
