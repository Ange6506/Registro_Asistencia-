const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getUser = async (req, res) => {
  try {
    // Ejecutar la consulta para obtener todos los usuarios
    const result = await pool.query(`
      SELECT 
        u.id_usuario, 
        u.id_rol, 
        u.username, 
        u.password, 
        u.estado
      FROM public.usuarios AS u
      ORDER BY u.username;
    `);

    // Mostrar en consola los datos obtenidos
    console.log("Usuarios obtenidos:", result.rows);

    // Si se obtienen resultados, responder con los datos de los usuarios
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows); // Enviar solo los datos (no el objeto completo)
    } else {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    // Enviar un mensaje más detallado en caso de error
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = { getUser };
