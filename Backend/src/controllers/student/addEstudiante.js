const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const addEstudiante = async (req, res) => {
  const {
    huella,
    nombre_del_estudiante,
    identificacion,
    programa,  // Nombre del programa
    asignatura,
    especialidad,
    fecha_inicio,
    fecha_terminacion,
    dias_semana,
    horas_por_dia,
    semanas_de_rotacion,
    numero_horas_semanales,
    semestre_academico,
  } = req.body;

  // Mostrar la información recibida en el body de la solicitud
  console.log("Datos recibidos del frontend:", req.body);

  // Validación de los datos de entrada
  if (
    !huella ||
    !nombre_del_estudiante ||
    !identificacion ||
    !programa ||
    !asignatura ||
    !especialidad ||
    !fecha_inicio ||
    !fecha_terminacion ||
    !dias_semana ||
    !horas_por_dia ||
    !semanas_de_rotacion ||
    !numero_horas_semanales ||
    !semestre_academico
  ) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    // Insertar en la tabla de estudiantes
    const insertEstudianteQuery =
      "INSERT INTO estudiantes (huella, nombre_del_estudiante, identificacion) VALUES ($1, $2, $3) RETURNING id_estudiantes";

    const estudianteValues = [huella, nombre_del_estudiante, identificacion];
    const estudianteResult = await pool.query(insertEstudianteQuery, estudianteValues);

    // ID del nuevo estudiante
    const newStudentId = estudianteResult.rows[0].id_estudiantes;

    // 1. Obtener el id_programa a partir del nombre del programa
    const getProgramaQuery = "SELECT id_programa FROM programa WHERE programa = $1";
    const programaResult = await pool.query(getProgramaQuery, [programa]);

    if (programaResult.rows.length === 0) {
      return res.status(404).json({ message: "Programa no encontrado." });
    }

    const newProgramaId = programaResult.rows[0].id_programa;

    // 2. Sincronizar la secuencia de id_semestre antes de insertar el nuevo semestre
    await pool.query(`
      SELECT setval(pg_get_serial_sequence('"Semestre Academico"', 'id_semestre'), 
      (SELECT MAX(id_semestre) FROM "Semestre Academico"));
    `);

    // 3. Insertar en la tabla de semestre académico con el id_programa obtenido
    const insertSemestreQuery =
      "INSERT INTO \"Semestre Academico\" (id_programa, asignatura, especialidad, fecha_inicio, fecha_terminacion, dias_semana, horas_por_dia, semanas_de_rotacion, numero_horas_semanales, semestre_academico) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_semestre";

    const semestreValues = [
      newProgramaId,  // Usamos el id_programa obtenido
      asignatura,
      especialidad,
      fecha_inicio,
      fecha_terminacion,
      dias_semana,
      horas_por_dia,
      semanas_de_rotacion,
      numero_horas_semanales,
      semestre_academico,
    ];

    const semestreResult = await pool.query(insertSemestreQuery, semestreValues);

    // ID del nuevo semestre
    const newSemestreId = semestreResult.rows[0].id_semestre;

    // 4. Insertar en la tabla de relación entre estudiantes y semestre (est_x_semestre)
    const insertEstXSemestreQuery =
      "INSERT INTO est_x_semestre (id_estudiante, id_semestre) VALUES ($1, $2)";

    await pool.query(insertEstXSemestreQuery, [newStudentId, newSemestreId]);

    // Respuesta exitosa
    return res.status(201).json({
      message: "Estudiante registrado exitosamente.",
      studentId: newStudentId,
      semestreId: newSemestreId,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al registrar el estudiante:", error.message);

    // Verificar si hay errores de duplicados
    if (error.code === '23505') {
      return res.status(409).json({ message: "El estudiante ya está registrado." });
    }

    // Error genérico
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  addEstudiante,
};
