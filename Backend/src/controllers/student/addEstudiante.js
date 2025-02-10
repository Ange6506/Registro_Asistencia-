const { Pool } = require("pg");
const { CONFIG_DB } = require("../../config/db");

const pool = new Pool(CONFIG_DB);

const addEstudiante = async (req, res) => {
  const {
    huella,
    nombre_del_estudiante,
    identificacion,
    programa,
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

  console.log("Datos recibidos del frontend:", req.body);

  // Verificar si los campos esenciales están completos
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
    // Verificar duplicados por huella o identificación
    console.log("Verificando duplicados de huella o identificación...");
    const checkDuplicatesQuery =
      "SELECT 1 FROM estudiantes WHERE huella = $1 OR identificacion = $2 LIMIT 1";

    const checkValues = [huella, identificacion];
    const checkResult = await pool.query(checkDuplicatesQuery, checkValues);

    console.log("Resultado de la consulta de duplicados:", checkResult.rows);

    if (checkResult.rows.length > 0) {
      console.log("Estudiante duplicado encontrado.");
      return res.status(409).json({
        message: "El estudiante ya está registrado con esa huella o identificación.",
      });
    }

    // Insertar nuevo estudiante
    console.log("Insertando nuevo estudiante...");
    const insertEstudianteQuery =
      "INSERT INTO estudiantes (huella, nombre_del_estudiante, identificacion) VALUES ($1, $2, $3) RETURNING id_estudiantes";

    const estudianteValues = [huella, nombre_del_estudiante, identificacion];
    const estudianteResult = await pool.query(insertEstudianteQuery, estudianteValues);

    const newStudentId = estudianteResult.rows[0].id_estudiantes;

    console.log("ID del nuevo estudiante:", newStudentId);

    // Buscar el ID del programa
    const getProgramaQuery = "SELECT id_programa FROM programa WHERE programa = $1";
    const programaResult = await pool.query(getProgramaQuery, [programa]);

    if (programaResult.rows.length === 0) {
      return res.status(404).json({ message: "Programa no encontrado." });
    }

    const newProgramaId = programaResult.rows[0].id_programa;

    // Ajustar el valor de la secuencia para el semestre
    await pool.query(`
      SELECT setval(pg_get_serial_sequence('"Semestre Academico"', 'id_semestre'), 
      (SELECT MAX(id_semestre) FROM "Semestre Academico"));
    `);

    // Insertar el semestre académico
    const insertSemestreQuery =
      "INSERT INTO \"Semestre Academico\" (id_programa, asignatura, especialidad, fecha_inicio, fecha_terminacion, dias_semana, horas_por_dia, semanas_de_rotacion, numero_horas_semanales, semestre_academico) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_semestre";

    const semestreValues = [
      newProgramaId,
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

    const newSemestreId = semestreResult.rows[0].id_semestre;

    // Relacionar el estudiante con el semestre académico
    const insertEstXSemestreQuery =
      "INSERT INTO est_x_semestre (id_estudiante, id_semestre) VALUES ($1, $2)";

    await pool.query(insertEstXSemestreQuery, [newStudentId, newSemestreId]);

    // Responder con éxito
    return res.status(201).json({
      message: "Estudiante registrado exitosamente.",
      studentId: newStudentId,
      semestreId: newSemestreId,
    });
  } catch (error) {
    console.error("Error al registrar el estudiante:", error.message);

    // Manejar el error de duplicado (por código de error 23505)
    if (error.code === '23505') {
      console.log("Código de error 23505: Conflicto de duplicados.");
      return res.status(409).json({ message: "El estudiante ya está registrado." });
    }

    // Enviar un error genérico si ocurre un fallo inesperado
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  addEstudiante,
};
