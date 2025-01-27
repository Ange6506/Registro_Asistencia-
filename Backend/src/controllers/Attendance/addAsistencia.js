const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");
const cron = require("node-cron"); // Importamos la librería para tareas programadas

const pool = new Pool(CONFIG_DB);

// Configuración del cron job para ejecutar la tarea cada minuto
cron.schedule('* * * * *', async () => {
  try {
    console.log('Verificando entradas activas...');

    const tiempoLimite = 1 * 60 * 1000; // Tiempo límite de 1 minuto (en milisegundos)

    // Buscamos todos los registros con entrada activa y que hayan pasado más de 1 minuto
    const query = `
      SELECT id_asistencia, id_est_x_semestre, fecha_hora_entrada
      FROM asistencia
      WHERE fecha_hora_salida IS NULL AND fecha_hora_entrada < NOW() - INTERVAL '1 minute'
    `;
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      result.rows.forEach(async (registro) => {
        const { id_asistencia, fecha_hora_entrada } = registro;
        
        // Actualizamos el estado a false y dejamos fecha_hora_salida como NULL
        const updateQuery = `
          UPDATE asistencia
          SET fecha_hora_salida = NOW()
          WHERE id_asistencia = $1
          RETURNING id_asistencia, fecha_hora_entrada, fecha_hora_salida
        `;
        const updateValues = [id_asistencia];
        const updatedRegistro = await pool.query(updateQuery, updateValues);
        console.log(`Actualizado: Registro de entrada marcado como finalizado. ID: ${updatedRegistro.rows[0].id_asistencia}`);
      });
    } else {
      console.log('No hay registros para actualizar.');
    }

  } catch (error) {
    console.error('Error al verificar entradas activas:', error);
  }
});

// Función para registrar entrada o salida
const addAsistencia = async (req, res) => {
  const { huella } = req.body; // Recibimos la huella del estudiante

  try {
    console.log("Solicitud recibida con datos:", req.body);

    // Primero, buscamos al estudiante por la huella y unimos con la tabla est_x_semestre
    const resultEstudiante = await pool.query(
      `SELECT e.id_estudiantes, es.id_est_x_semestre 
       FROM estudiantes e
       JOIN est_x_semestre es ON e.id_estudiantes = es.id_estudiante
       WHERE e.huella = $1`,  // Hacemos JOIN entre estudiantes y est_x_semestre
      [huella]
    );

    if (resultEstudiante.rows.length === 0) {
      return res.status(400).json({ message: "Estudiante no encontrado." });
    }

    const idEstudiante = resultEstudiante.rows[0].id_estudiantes;
    const idEstXSemestre = resultEstudiante.rows[0].id_est_x_semestre;  // Ahora obtenemos id_est_x_semestre desde la tabla est_x_semestre

    // Verificamos si el estudiante tiene un registro de asistencia activo en el semestre actual
    const resultEntradaActiva = await pool.query(
      `SELECT id_asistencia, fecha_hora_entrada, fecha_hora_salida 
       FROM asistencia 
       WHERE id_est_x_semestre = $1 AND fecha_hora_salida IS NULL 
       ORDER BY fecha_hora_entrada DESC LIMIT 1`,  // Usamos id_est_x_semestre para verificar el registro de asistencia
      [idEstXSemestre]
    );

    if (resultEntradaActiva.rows.length > 0) {
      // Si ya existe un registro con fecha_hora_salida = NULL, significa que el estudiante tiene una entrada activa.
      const registro = resultEntradaActiva.rows[0];

      // Si la salida aún no está registrada, registramos la salida
      const fechaHoraSalida = new Date(); // Fecha y hora de salida

      const updateQuery = `
        UPDATE asistencia
        SET fecha_hora_salida = $1
        WHERE id_asistencia = $2
        RETURNING id_asistencia, fecha_hora_entrada, fecha_hora_salida
      `;
      const updateValues = [fechaHoraSalida, registro.id_asistencia];
      const updatedRegistro = await pool.query(updateQuery, updateValues);

      return res.status(200).json({
        message: "Salida registrada exitosamente.",
        id_asistencia: updatedRegistro.rows[0].id_asistencia,
        fecha_hora_entrada: updatedRegistro.rows[0].fecha_hora_entrada,
        fecha_hora_salida: updatedRegistro.rows[0].fecha_hora_salida,
      });
    } else {
      // Si no hay un registro activo de entrada, registramos una nueva entrada para el estudiante
      const fechaHoraEntrada = new Date(); // Fecha y hora de entrada

      const insertQuery = `
        INSERT INTO asistencia (fecha_hora_entrada, id_est_x_semestre)
        VALUES ($1, $2)
        RETURNING id_asistencia, fecha_hora_entrada
      `;
      const insertValues = [fechaHoraEntrada, idEstXSemestre];
      const resultInsert = await pool.query(insertQuery, insertValues);

      return res.status(201).json({
        message: "Entrada registrada exitosamente.",
        id_asistencia: resultInsert.rows[0].id_asistencia,
        fecha_hora_entrada: resultInsert.rows[0].fecha_hora_entrada,
      });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ message: "Error en el servidor.", error: error.message });
  }

};

module.exports = {
  addAsistencia,
};
