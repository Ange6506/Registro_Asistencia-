const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

// Agregar un nuevo usuario
const addUser = async (req, res) => {
  const { id_rol, username, password, estado = 'activo' } = req.body;  // Obtener los datos del cuerpo de la solicitud

  // Validar que todos los campos necesarios estén presentes
  if (!id_rol || !username || !password || !estado) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  let client;
  try {
    // Iniciar transacción
    client = await pool.connect();
    await client.query('BEGIN');  // Iniciar transacción

    // Si id_rol es una descripción, buscar el ID del rol en la tabla rol
    let roleId = id_rol;

    // Verificar si el id_rol es una descripción (esto depende de cómo llega el parámetro)
    if (typeof id_rol === 'string') {
      // Buscar el ID del rol a partir de la descripción en la tabla 'rol'
      const roleQuery = "SELECT id_rol FROM rol WHERE descripcion = $1";
      const roleResult = await client.query(roleQuery, [id_rol]);

      if (roleResult.rows.length === 0) {
        return res.status(400).json({ message: "Rol no encontrado." });
      }

      // Obtener el id_rol de la tabla rol
      roleId = roleResult.rows[0].id_rol;
    }

    // Consulta para insertar el nuevo usuario
    const insertQuery =
      "INSERT INTO usuarios (id_rol, username, password, estado) values ($1, $2, $3, $4) RETURNING id_usuario";

    const insertValues = [roleId, username, password, estado];

    const result = await client.query(insertQuery, insertValues);

    // Recuperar el nuevo id_usuario generado
    const idUsuario = result.rows[0].id_usuario;

    // Restablecer la secuencia para que siga después del último id_usuario insertado
    await client.query(
      `SELECT setval(pg_get_serial_sequence('usuarios', 'id_usuario'), (SELECT max(id_usuario) FROM usuarios))`
    );

    await client.query('COMMIT');  // Confirmar la transacción

    return res.status(201).json({ message: "Registro de usuario exitoso.", id_usuario: idUsuario });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    if (client) {
      await client.query('ROLLBACK');  // Revertir la transacción en caso de error
    }
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  addUser,
};
