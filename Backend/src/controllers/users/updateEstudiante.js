const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const updateEstudiante = async (req, res) => {
  const studentId = req.params.id; // Obtener el ID del estudiante desde los parámetros de la URL
  const {
    nombre_completo,
    primer_apellido,
    segundo_apellido,
    tipo_documento,
    num_documento,
    programa,
    fecha_inicial,
    fecha_final,
  } = req.body;

  // Validación de los datos
  if (
    !nombre_completo ||
    !primer_apellido ||
    !segundo_apellido ||
    !tipo_documento ||
    !num_documento ||
    !programa ||
    !fecha_inicial ||
    !fecha_final
  ) {
    return res.status(400).json({
      message: "Todos los campos son requeridos para actualizar la información del estudiante.",
    });
  }

  // Consulta SQL para actualizar los datos en la base de datos
  const query = `
    UPDATE estudiantes
    SET
      nombre_completo = $1,
      primer_apellido = $2,
      segundo_apellido = $3,
      tipo_documento = $4,
      num_documento = $5,
      programa = $6,
      fecha_inicial = $7,
      fecha_final = $8
    WHERE id = $9
    RETURNING *;
  `;

  try {
    // Ejecutar la consulta SQL con los parámetros
    const result = await pool.query(query, [
      nombre_completo,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      num_documento,
      programa,
      fecha_inicial,
      fecha_final,
      studentId,
    ]);

    // Verificar si se actualizó algún registro
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Estudiante no encontrado. No se pudo realizar la actualización.",
      });
    }

    // Si la actualización fue exitosa, devolver los nuevos datos del estudiante
    const updatedStudent = result.rows[0];
    res.status(200).json(updatedStudent);

  } catch (err) {
    console.error("Error al actualizar el estudiante:", err);
    res.status(500).json({
      message: "Hubo un error al intentar actualizar la base de datos.",
    });
  }
};

module.exports = {
  updateEstudiante,
};
