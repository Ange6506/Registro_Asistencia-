const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const addAsistencia = async (req, res) => {
  const { id_huella } = req.body; // Recibimos el ID de huella del estudiante

  try {
    console.log("Solicitud recibida con datos:", req.body); // Muestra los datos que recibimos del frontend

    // Primero, buscamos al estudiante por el ID de huella
    const resultEstudiante = await pool.query(
      "SELECT id_estudiante FROM estudiantes WHERE id_huella = $1",
      [id_huella]
    );

    if (resultEstudiante.rows.length === 0) {
      return res.status(400).json({ message: "Estudiante no encontrado." });
    }

    const idEstudiante = resultEstudiante.rows[0].id_estudiante;

    // Buscamos si hay un registro de entrada activo para este estudiante
    const resultEntradaActiva = await pool.query(
      "SELECT id_asistencia, estado, fecha_hora_entrada FROM asistencia WHERE id_estudiante = $1 AND estado = true ORDER BY fecha_hora_entrada DESC LIMIT 1",
      [idEstudiante]
    );

    if (resultEntradaActiva.rows.length > 0) {
      // Si ya existe un registro con estado=true, significa que el estudiante está en su entrada activa.
      const registro = resultEntradaActiva.rows[0];

      // Actualizamos el registro para registrar la hora de salida y cambiar el estado a false
      const fechaHoraSalida = new Date(); // Fecha y hora de salida

      // Actualizamos el registro de asistencia para registrar la salida y cambiar el estado
      const updateQuery = `
        UPDATE asistencia
        SET fecha_hora_salida = $1, estado = $2
        WHERE id_asistencia = $3
        RETURNING id_asistencia, fecha_hora_entrada, fecha_hora_salida
      `;
      const updateValues = [fechaHoraSalida, false, registro.id_asistencia];
      const resultUpdate = await pool.query(updateQuery, updateValues);

      return res.status(200).json({
        message: "Salida registrada exitosamente.",
        id_asistencia: resultUpdate.rows[0].id_asistencia,
        fecha_hora_entrada: resultUpdate.rows[0].fecha_hora_entrada,
        fecha_hora_salida: resultUpdate.rows[0].fecha_hora_salida,
      });
    } else {
      // Si no hay un registro activo, significa que no hay una entrada registrada
      // Registramos una nueva entrada para este estudiante
      const fechaHoraEntrada = new Date(); // Fecha y hora de entrada

      const insertQuery = `
        INSERT INTO asistencia (fecha_hora_entrada, estado, id_estudiante)
        VALUES ($1, $2, $3)
        RETURNING id_asistencia, fecha_hora_entrada
      `;
      const insertValues = [fechaHoraEntrada, true, idEstudiante];
      const resultInsert = await pool.query(insertQuery, insertValues);

      return res.status(201).json({
        message: "Entrada registrada exitosamente.",
        id_asistencia: resultInsert.rows[0].id_asistencia,
        fecha_hora_entrada: resultInsert.rows[0].fecha_hora_entrada,
      });
    }
  } catch (error) {
    console.error("Error en el servidor:", error); // Detalles del error para depuración
    return res.status(500).json({ message: "Error en el servidor.", error: error.message });
  }
};

module.exports = {
  addAsistencia,
};
