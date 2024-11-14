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
    "No Definido": 6, // Asignar id_programa 6 para "No Definido"
  };
  
  const id_programa = programa ? programaMap[programa] : null; // Asignar null si no hay programa
  if (programa && !id_programa) {
    return res.status(400).json({ message: "Programa no válido." });
  }
  

  try {
    // Verificamos si el número de documento ya está registrado
    const checkDocumentQuery = "SELECT * FROM estudiantes WHERE num_documento = $1";
    const { rows } = await pool.query(checkDocumentQuery, [num_documento]);

    if (rows.length > 0) {
      return res.status(400).json({ message: "El número de documento ya está registrado." });
    }

    // Definir los valores para las fechas (si son null, no se insertan en la base de datos)
    const fecha_inicial_db = fecha_inicial || null;
    const fecha_final_db = fecha_final || null;
    const id_huella = 1;
    const id_rol = 3;

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
    id_programa,    -- Cambié "programa" por "id_programa"
    id_huella,
    id_rol
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`;

await pool.query(insertQuery, [
  nombre_completo,
  primer_apellido,
  segundo_apellido,
  tipo_documento,
  num_documento,
  fecha_inicial_db,
  fecha_final_db,
  id_programa,     // Aquí también estoy pasando el "id_programa"
  id_huella,
  id_rol,
]);


    return res.status(200).json({ message: "Estudiante registrado correctamente." });
  } catch (err) {
    console.error("Error al registrar estudiante:", err);
    return res.status(500).json({ message: "Error al registrar estudiante" });
  }
};

module.exports = { addEstudiante };
