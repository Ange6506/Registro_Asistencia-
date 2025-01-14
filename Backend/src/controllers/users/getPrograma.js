const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);


const getPrograma = async (req, res) => {
  try {
    // Ejecutar la consulta para obtener todos los programas con las nuevas columnas
    const result = await pool.query(`
      SELECT 
        p.id_programa, 
        p.programa, 
        p.fecha_ingreso, 
        p.hora_ingreso, 
        p.usuario, 
        p.estado
      FROM public.programa AS p
      ORDER BY p.programa;
    `);

    // Mostrar en consola los datos obtenidos
    console.log("Programas obtenidos:", result.rows);

    // Si se obtienen resultados, responder con los datos de los programas
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows); // Enviar solo los datos (no el objeto completo)
    } else {
      return res.status(404).json({ message: "No se encontraron programas" });
    }
  } catch (error) {
    console.error("Error al obtener los programas:", error);
    // Enviar un mensaje más detallado en caso de error
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = { getPrograma };
