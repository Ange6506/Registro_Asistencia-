const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const deleteEstudiante = async (req, res) => {
  const { identificacion } = req.params;  // El número de documento se recibe como parámetro en la URL
  console.log("Identificación recibida:", identificacion);
  try {
    // Verificamos si el estudiante existe y obtenemos el id_huella asociado
    const checkStudentQuery = "SELECT id_estudiante, id_huella FROM estudiantes WHERE identificacion = $1";
    const { rows } = await pool.query(checkStudentQuery, [identificacion]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estudiante no encontrado." });
    }

    const { id_estudiante, id_huella } = rows[0];

    // Eliminar las entradas de asistencia relacionadas con el estudiante
    const deleteAsistenciaQuery = "DELETE FROM asistencia WHERE id_estudiante = $1";
    await pool.query(deleteAsistenciaQuery, [id_estudiante]);

    // Primero, eliminamos el estudiante
    const deleteStudentQuery = "DELETE FROM estudiantes WHERE identificacion = $1";
    await pool.query(deleteStudentQuery, [identificacion]);

    // Ahora eliminamos la huella si existe
    console.log("ID Huella a eliminar:", id_huella); // Verifica que el id de la huella es correcto
if (id_huella !== null) {
  const deleteHuellaQuery = "DELETE FROM huella WHERE id_huella = $1";
  try {
    const result = await pool.query(deleteHuellaQuery, [id_huella]);
    console.log("Resultado de eliminación de huella:", result);
  } catch (err) {
    console.error("Error al eliminar huella:", err);  // Captura cualquier error que ocurra
  }
} else {
  console.log("No se eliminará huella porque id_huella es null.");
}


    return res.status(200).json({ message: "Estudiante, su huella y asistencias eliminados correctamente." });
  } catch (err) {
    console.error("Error al eliminar estudiante:", err);
    return res.status(500).json({ message: "Error al eliminar estudiante." });
  }
};



module.exports = { deleteEstudiante };
