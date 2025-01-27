const express = require("express");
const router = express.Router();

//estudiantes
const getEstudiantes  = require("../controllers/student/getEstudiantes");
const addEstudiante  = require("../controllers/student/addEstudiante");
const deleteEstudiante  = require("../controllers/student/deleteEstudiante");
const addHuella  = require("../controllers/student/addHuella");

//Asistencia
const getAsistencia  = require("../controllers/Attendance/getAsistencia");
const addAsistencia = require("../controllers/Attendance/addAsistencia");

//program
const updatePrograma  = require("../controllers/program/updatePrograma");
const deleteProgram  = require("../controllers/program/deleteProgram");
const getPrograma  = require("../controllers/program/getPrograma");
const  addPrograma  = require("../controllers/program/addPrograma");

//Semester
const  updateSemestre  = require("../controllers/Semester/updateSemestre");

//Users
const loginUser = require("../controllers/users/loginUser");
const  getUser  = require("../controllers/users/getUser");
const  getRoles  = require("../controllers/users/getRoles");
const  updateUser  = require("../controllers/users/updateUser");
const addUsers = require("../controllers/users/addUser");


//router post
router.post("/add_user", addUsers.addUser);
router.post("/add_Asistencia", addAsistencia.addAsistencia);
router.post("/login", loginUser.loginUser);
router.post("/add_Huella", addHuella.addHuella);
router.post("/addPrograma", addPrograma.addPrograma);

//router get
router.get("/get_estudiante", getEstudiantes.getEstudiantes);
router.get("/getAsistencia", getAsistencia.getAsistencia);
router.get("/getPrograma", getPrograma.getPrograma);
router.get("/getUser", getUser.getUser);
router.get("/getRoles", getRoles.getRoles);

//router put
router.put("/update_programa/:id", updatePrograma.updatePrograma);
router.put("/updateSemestre/:id_semestre", updateSemestre.updateSemestre);
router.post("/addEstudiante", addEstudiante.addEstudiante);
router.put("/updateUser/:id", updateUser.updateUser);

//router delete
router.delete("/deletestudent/:identificacion", deleteEstudiante.deleteEstudiante);
router.delete("/deletePrograma/:id_programa", deleteProgram.deleteProgram);


module.exports = router;
