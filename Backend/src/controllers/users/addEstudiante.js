// controllers/estudianteController.js
const { pool } = require("../../config/db");

const addEstudiante = async (req, res) => {
  const {
    nombres_completo,
    primer_apellido,
    segundo_apellido,
    tipo_documento,
    num_documento,
    fecha_inicial,
    fecha_final,
    id_programa,  // Cambié este nombre a 'id_programa' que es el campo que vas a usar
  } = req.body;

  try {
    const insertQuery = `
      INSERT INTO estudiante (
        nombres_completo,
        primer_apellido,
        segundo_apellido,
        tipo_documento,
        num_documento,
        fecha_inicial,
        fecha_final,
        id_programa
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    const insertValues = [
      nombres_completo,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      num_documento,
      fecha_inicial,
      fecha_final,
      id_programa,  // Usamos el id_programa en lugar de id_especialidad
    ];

    await pool.query(insertQuery, insertValues);

    return res.status(201).json({ message: "Estudiante registrado exitosamente." });
  } catch (error) {
    console.error("Error al registrar el estudiante:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { addEstudiante };
