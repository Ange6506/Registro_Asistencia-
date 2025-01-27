const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

// Función para registrar la huella digital
const addHuella = async (req, res) => {
  const { huella_estudiante, id_estudiantes } = req.body; // Se recibe el ID del estudiante y la huella

  // Verifica los datos recibidos
  console.log("Datos recibidos:", req.body);

  // Verifica que el `huella_estudiante` y `id_estudiantes` estén presentes
  if (!huella_estudiante || !id_estudiantes) {
    return res.status(400).json({ message: "Faltan datos requeridos." });
  }

  try {
    // Verifica si la huella ya está registrada para el estudiante
    const checkQuery = `SELECT huella FROM estudiantes WHERE id_estudiantes = $1 LIMIT 1;`;
    const checkValues = [id_estudiantes];  // Se usa `id_estudiantes` para verificar si ya tiene huella registrada
    const checkResult = await pool.query(checkQuery, checkValues);

    // Si ya tiene una huella registrada, se devuelve un error
    if (checkResult.rows.length > 0 && checkResult.rows[0].huella) {
      return res.status(400).json({ message: "La huella ya está registrada para este estudiante." });
    }

    // Actualiza la columna `huella` en la tabla `estudiantes` con el valor `huella_estudiante`
    const updateQuery = `
      UPDATE estudiantes
      SET huella = $2
      WHERE id_estudiantes = $1
      RETURNING id_estudiantes;
    `;
    const updateValues = [id_estudiantes, huella_estudiante]; // Se usa `id_estudiantes` para hacer la actualización

    // Ejecuta la consulta para actualizar la huella
    const result = await pool.query(updateQuery, updateValues);

    // Verifica si la actualización afectó alguna fila
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado." });
    }

    // Devuelve la respuesta con el ID del estudiante que tiene la huella registrada
    return res.status(200).json({
      message: "Huella registrada exitosamente.",
      estudianteId: result.rows[0].id_estudiantes, // Se devuelve el ID del estudiante actualizado
    });
  } catch (err) {
    console.error("Error al registrar la huella:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


module.exports = {
  addHuella,
};
