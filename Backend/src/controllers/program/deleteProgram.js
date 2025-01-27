const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

// Función para eliminar un programa
const deleteProgram = async (req, res) => {
  const { id_programa } = req.params;  // Se espera que el id_programa esté en los parámetros de la URL

  try {
    // Verifica que se haya proporcionado el id_programa
    if (!id_programa || isNaN(id_programa)) {
      return res.status(400).json({
        message: "Falta el id_programa o no es un número válido",
        received: { id_programa }
      });
    }

    console.log("Ejecutando eliminación para id_programa:", id_programa);

    // Realiza la eliminación en la base de datos
    const result = await pool.query(`
      DELETE FROM public.programa
      WHERE id_programa = $1
      RETURNING id_programa;
    `, [id_programa]);

    // Si no se encontró el programa con el id dado
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Programa no encontrado en la base de datos",
        id_programa
      });
    }

    // Responde con el id del programa eliminado
    return res.status(200).json({
      message: "Programa eliminado exitosamente",
      id_programa: result.rows[0].id_programa
    });

  } catch (error) {
    console.error("Error al eliminar el programa:", error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
      data: { id_programa }
    });
  }
};

module.exports = { deleteProgram };
