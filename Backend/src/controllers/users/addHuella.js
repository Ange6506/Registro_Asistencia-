const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

// Función para registrar la huella digital
const addHuella = async (req, res) => {
  const { huella_estudiante } = req.body; // `huella_estudiante` es el ID del estudiante

  // Verifica que el `huella_estudiante` esté presente
  if (!huella_estudiante) {
    return res.status(400).json({ message: "Faltan datos requeridos." });
  }

  const client = await pool.connect();

  try {
    // Inicia la transacción
    await client.query('BEGIN');

    // Verifica si el estudiante existe
    const checkEstudianteQuery = `SELECT * FROM estudiantes WHERE id_estudiante = $1 LIMIT 1;`;
    const estudianteResult = await client.query(checkEstudianteQuery, [huella_estudiante]);

    if (estudianteResult.rows.length === 0) {
      return res.status(400).json({ message: "Estudiante no encontrado." });
    }

    // Verifica si la huella ya está registrada para el estudiante
    const checkHuellaQuery = `SELECT * FROM huella WHERE id_huella = $1 LIMIT 1;`;
    const checkHuellaResult = await client.query(checkHuellaQuery, [huella_estudiante]);

    if (checkHuellaResult.rows.length > 0) {
      return res.status(400).json({ message: "La huella ya está registrada." });
    }

    // Inserta la huella en la tabla huella
    const insertHuellaQuery = `
      INSERT INTO huella (huella_estudiante)
      VALUES ($1)
      RETURNING id_huella;
    `;
    const insertHuellaResult = await client.query(insertHuellaQuery, [huella_estudiante]);
    const idHuella = insertHuellaResult.rows[0].id_huella;

    // Actualiza la tabla estudiante con el `id_huella`
    const updateEstudianteQuery = `
      UPDATE estudiantes
      SET id_huella = $1
      WHERE id_estudiante = $2;
    `;
    await client.query(updateEstudianteQuery, [idHuella, huella_estudiante]);

    // Confirma la transacción
    await client.query('COMMIT');

    // Devuelve la respuesta con el ID de la huella registrada
    return res.status(201).json({
      message: "Huella registrada y asociada al estudiante exitosamente.",
      huellaId: idHuella,  // El ID de la huella registrada
    });
  } catch (err) {
    // Si hay un error, revierte la transacción
    await client.query('ROLLBACK');
    console.error("Error al registrar la huella:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    // Libera el cliente después de usarlo
    client.release();
  }
};

module.exports = {
  addHuella,
};
