const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const getRoles = async (req, res) => {
    try {
      // Ejecutar la consulta para obtener todos los roles
      const result = await pool.query(`
        SELECT 
          id_rol, 
          descripcion
        FROM public.rol
        ORDER BY descripcion;
      `);
  
      // Mostrar en consola los datos obtenidos
      console.log("Roles obtenidos:", result.rows);
  
      // Si se obtienen resultados, responder con los datos de los roles
      if (result.rows.length > 0) {
        return res.status(200).json(result.rows); // Enviar solo los datos (no el objeto completo)
      } else {
        return res.status(404).json({ message: "No se encontraron roles" });
      }
    } catch (error) {
      console.error("Error al obtener los roles:", error);
      // Enviar un mensaje más detallado en caso de error
      return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  };
  
module.exports = { getRoles };
