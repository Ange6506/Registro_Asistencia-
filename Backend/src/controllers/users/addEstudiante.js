const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const addEstudiante = async (req, res) => {
  const {
    nombre_completo,
    primer_apellido,
    segundo_apellido,
    tipo_documento,
    num_documento,
    fecha_inicial,
    fecha_final,
    programa,
  } = req.body;

  // Mapeo de los programas a sus respectivos ID
  const programaMap = {
    "Enfermería": 1,
    "Psicología": 2,
    "Medicina": 3,
    "Medicina - Internos": 4,
    "Medicina - Residentes": 5,
  };

  // Verificamos si el programa proporcionado es válido
  const id_programa = programaMap[programa];
  if (!id_programa) {
    return res.status(400).json({ message: "Programa no válido." });
  }

  try {
    // Primero, verificamos si el número de documento ya está registrado
    const checkDocumentQuery = "SELECT * FROM estudiantes WHERE num_documento = $1";
    const { rows } = await pool.query(checkDocumentQuery, [num_documento]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "El número de documento ya está registrado." });
    }

    // Definimos el ID manualmente como 2 (esto es lo que pediste)
    const id_huella = 1;
    const id_rol = 2;

    // Construir la consulta SQL para insertar el estudiante
    const insertQuery = `
      INSERT INTO estudiantes (
        nombre_completo,
        primer_apellido,
        segundo_apellido,
        tipo_documento,
        num_documento,
        fecha_inicial,
        fecha_final,
        id_programa,
        id_huella,
        id_rol
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    const insertValues = [
      nombre_completo,
      primer_apellido,
      segundo_apellido,
      tipo_documento,
      num_documento,
      fecha_inicial,
      fecha_final,
      id_programa,
      id_huella,
      id_rol,
    ];

    // Ejecutamos la consulta para insertar el estudiante
    await pool.query(insertQuery, insertValues);

    return res.status(201).json({ message: "Estudiante registrado exitosamente." });
  } catch (error) {
    console.error("Error al registrar el estudiante:", error);
    return res.status(500).json({ message: "Error en el servidor." });
  }
};

module.exports = { addEstudiante };
