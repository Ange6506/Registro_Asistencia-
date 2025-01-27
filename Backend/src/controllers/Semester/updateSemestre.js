const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const updateSemestre = async (req, res) => {
  const { 
    id_semestre,  // Recibimos id_semestre para poder actualizar un semestre específico
    asignatura,
    especialidad,
    fecha_inicio,
    fecha_terminacion,
    dias_semana,
    horas_por_dia,
    semanas_de_rotacion,
    numero_horas_semanales,
    semestre_academico,
    programa // El programa puede ser opcional para no cambiar si no es necesario
  } = req.body;

  try {
    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Get current semestre details (this helps to avoid unnecessary updates)
      const currentSemestre = await client.query(
        'SELECT * FROM public."Semestre Academico" WHERE id_semestre = $1',
        [id_semestre]
      );

      if (!currentSemestre.rows.length) {
        throw new Error('Semestre no encontrado');
      }

      // If the programa changes, get the new id_programa
      let id_programa = currentSemestre.rows[0].id_programa; // Default to current program
      if (programa) {
        const programaResult = await client.query(
          'SELECT id_programa FROM public.programa WHERE programa = $1',
          [programa]
        );

        if (!programaResult.rows.length) {
          throw new Error('Programa no encontrado');
        }

        id_programa = programaResult.rows[0].id_programa; // Update id_programa if new program is provided
      }

      // Update the semestre record in the "Semestre Academico" table
      await client.query(`
        UPDATE public."Semestre Academico"
        SET 
          asignatura = $1,
          especialidad = $2,
          fecha_inicio = $3,
          fecha_terminacion = $4,
          dias_semana = $5,
          horas_por_dia = $6,
          semanas_de_rotacion = $7,
          numero_horas_semanales = $8,
          semestre_academico = $9,
          id_programa = $10
        WHERE id_semestre = $11
      `, [
        asignatura,
        especialidad,
        fecha_inicio,
        fecha_terminacion,
        dias_semana,
        horas_por_dia,
        semanas_de_rotacion,
        numero_horas_semanales,
        semestre_academico,
        id_programa,
        id_semestre
      ]);

      await client.query('COMMIT');
      
      res.status(200).json({
        message: "Información del semestre actualizada exitosamente"
      });

    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error("Error al actualizar el semestre:", error);
    res.status(500).json({
      message: "Error al actualizar la información del semestre",
      error: error.message
    });
  }
};

module.exports = { updateSemestre };
