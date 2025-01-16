const express = require("express");
const router = express.Router();

const addUsers = require("../controllers/users/addUser");
const addAsistencia = require("../controllers/users/addAsistencia");
const getEstudiantes  = require("../controllers/users/getEstudiantes");
const getAsistencia  = require("../controllers/users/getAsistencia");
const loginUser = require("../controllers/users/loginUser");
const  updateEstudiante  = require("../controllers/users/updateEstudiante");
const  deleteEstudiante  = require("../controllers/users/deleteEstudiante");
const  addHuella  = require("../controllers/users/addHuella");
const  getPrograma  = require("../controllers/users/getPrograma");
const  addPrograma  = require("../controllers/users/addPrograma");
const  updatePrograma  = require("../controllers/users/updatePrograma");
const  deleteProgram  = require("../controllers/users/deleteProgram");

router.post("/add_user", addUsers.addUser);
router.post("/add_Asistencia", addAsistencia.addAsistencia);
router.post("/add_Huella", addHuella.addHuella);
router.get("/get_estudiante", getEstudiantes.getEstudiantes);
router.get("/getAsistencia", getAsistencia.getAsistencia);
router.put("/updateEstudiantes/:id_semestre", updateEstudiante.updateEstudiante);
router.post("/login", loginUser.loginUser);
router.delete("/deletestudent/:identificacion", deleteEstudiante.deleteEstudiante);
router.get("/getPrograma", getPrograma.getPrograma);
router.post("/addPrograma", addPrograma.addPrograma);
router.put("/update_programa/:id", updatePrograma.updatePrograma);
router.delete("/deletePrograma/:id_programa", deleteProgram.deleteProgram);


module.exports = router;
