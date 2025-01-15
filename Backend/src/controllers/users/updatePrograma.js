const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const updatePrograma = async (req, res) => {
    console.log(req.body);  // Verifica que los datos llegan correctamente
    const { id_programa, programa, fecha_ingreso, hora_ingreso, usuario, estado } = req.body;

    try {
        // Verifica que se haya pasado un id_programa
        if (!id_programa || !programa || !fecha_ingreso || !hora_ingreso || !usuario || estado === undefined) {
            return res.status(400).json({ 
                message: "Faltan datos requeridos",
                received: { id_programa, programa, fecha_ingreso, hora_ingreso, usuario, estado }
            });
        }
        console.log("Datos para actualizar:", { programa, fecha_ingreso, hora_ingreso, usuario, estado, id_programa });

        // Realiza la actualización en la base de datos
        const result = await pool.query(`
            UPDATE public.programa
            SET programa = $1, fecha_ingreso = $2, hora_ingreso = $3, usuario = $4, estado = $5
            WHERE id_programa = $6
            RETURNING id_programa, programa, fecha_ingreso, hora_ingreso, usuario, estado;
        `, [programa, fecha_ingreso, hora_ingreso, usuario, estado, id_programa]);

        // Si no se encontró el programa con el id dado
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Programa no encontrado",
                id_programa
            });
        }

        // Formatea la fecha de ingreso
        const updatedProgram = result.rows[0];
        const fechaFormateada = new Date(updatedProgram.fecha_ingreso).toISOString().split('T')[0];
        updatedProgram.fecha_ingreso = fechaFormateada;

        return res.status(200).json(updatedProgram);

    } catch (error) {
        console.error("Error al editar el programa:", error);
        return res.status(500).json({ 
            message: "Error en el servidor", 
            error: error.message,
            data: { id_programa, programa, fecha_ingreso, hora_ingreso, usuario, estado }
        });
    }
};

module.exports = { updatePrograma };
