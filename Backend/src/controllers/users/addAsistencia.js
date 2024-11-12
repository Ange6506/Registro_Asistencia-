const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const addAsistencia = async (req, res) => {
  const { id_huella } = req.body; // Recibimos la huella del estudiante

  try {
    console.log("Solicitud recibida con datos:", req.body); // Muestra los datos que recibimos del frontend

    // Primero, buscamos si el estudiante tiene un registro de entrada activo (estado: true)
    const resultEntradaActiva = await pool.query(
      "SELECT id_estudiante, estado, fecha_hora_entrada, id_asistencia FROM asistencia WHERE id_estudiante = $1 AND estado = true ORDER BY fecha_hora_entrada DESC LIMIT 1",
      [id_huella]
    );

    if (resultEntradaActiva.rows.length > 0) {
      // Si ya existe un registro con estado true, significa que el estudiante está en su entrada activa.
      const registro = resultEntradaActiva.rows[0];

      // Actualizamos ese registro para poner la hora de salida y cambiar el estado a false
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
      // Si no hay un registro con estado true, significa que no hay una entrada activa,
      // por lo que registramos una nueva entrada
      const resultEstudiante = await pool.query(
        "SELECT id_estudiante FROM estudiantes WHERE id_huella = $1",
        [id_huella]
      );

      if (resultEstudiante.rows.length === 0) {
        return res.status(400).json({ message: "Estudiante no encontrado." });
      }

      const idEstudiante = resultEstudiante.rows[0].id_estudiante;
      const fechaHoraEntrada = new Date(); // Fecha y hora de entrada

      // Insertamos el registro de entrada
      const insertQuery = `
        INSERT INTO asistencia (
          fecha_hora_entrada, 
          estado, 
          id_estudiante
        ) 
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
    // Agregamos más detalles del error para depurar
    console.error("Error en el servidor:", error); // Esto te ayudará a saber qué está fallando
    return res.status(500).json({ message: "Error en el servidor.", error: error.message });
  }
};

module.exports = {
  addAsistencia,
};
