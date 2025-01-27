const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

// Actualizar un usuario específico
const updateUser = async (req, res) => {
  const { id_usuario } = req.params; // Obtener el id_usuario de los parámetros de la URL
  const { username, password, id_rol, estado } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Validar que todos los campos necesarios estén presentes
  if (!username || !password || !id_rol || !estado) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Realizar la actualización en la base de datos
    const result = await pool.query(`
      UPDATE public.usuarios
      SET username = $1, password = $2, id_rol = $3, estado = $4
      WHERE id_usuario = $5
      RETURNING id_usuario, username, id_rol, estado;
    `, [username, password, id_rol, estado, id_usuario]);

    // Si se actualiza un usuario, devolver la información actualizada
    if (result.rowCount > 0) {
      return res.status(200).json({ message: "Usuario actualizado con éxito", user: result.rows[0] });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = { updateUser };
