const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const addPrograma = async (req, res) => {
    console.log(req.body);  // Verifica que los datos llegan correctamente
    const { programa, fecha_ingreso, hora_ingreso, usuario, estado } = req.body;

    try {
        // Validación modificada para manejar correctamente el estado booleano
        if (!programa || !fecha_ingreso || !hora_ingreso || !usuario || estado === undefined) {
            return res.status(400).json({ 
                message: "Faltan datos requeridos",
                received: { programa, fecha_ingreso, hora_ingreso, usuario, estado }
            });
        }

        // Ajustar el contador del serial para id_programa
        await pool.query(`
            SELECT setval('programa_id_programa_seq', (SELECT MAX(id_programa) FROM programa));
        `);

        // Consulta SQL para agregar un nuevo programa
        const result = await pool.query(`
            INSERT INTO public.programa (programa, fecha_ingreso, hora_ingreso, usuario, estado)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id_programa, programa, fecha_ingreso, hora_ingreso, usuario, estado;
        `, [programa, fecha_ingreso, hora_ingreso, usuario, estado]);

        // Obtener el programa recién insertado
        const newProgram = result.rows[0];

        // Formatear la fecha
        const fechaFormateada = new Date(newProgram.fecha_ingreso).toISOString().split('T')[0];
        newProgram.fecha_ingreso = fechaFormateada;

        return res.status(201).json(newProgram);

    } catch (error) {
        console.error("Error al agregar el programa:", error);
        return res.status(500).json({ 
            message: "Error en el servidor", 
            error: error.message,
            data: { programa, fecha_ingreso, hora_ingreso, usuario, estado }
        });
    }
};

module.exports = { addPrograma };