const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const deleteUser = async (req, res) => {
  const { id_usuario } = req.params; // Obtienes el id_usuario de los parámetros de la URL

  try {
    // Definir la consulta SQL para eliminar el usuario con el id dado
    const deleteQuery = "DELETE FROM usuarios WHERE id_usuario = $1";

    // Ejecutar la consulta
    const result = await pool.query(deleteQuery, [id_usuario]);

    // Verificar si la eliminación fue exitosa
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Responder con un mensaje de éxito
    return res.status(200).json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  deleteUser,
};
