const express = require("express");
const router = express.Router();

const addUsers = require("../controllers/users/addUser");
const addEstudiante = require("../controllers/users/addEstudiante");
const addAsistencia = require("../controllers/users/addAsistencia");
const getEstudiantes  = require("../controllers/users/getEstudiantes");
const getAsistencia  = require("../controllers/users/getAsistencia");
const loginUser = require("../controllers/users/loginUser");

router.post("/add_user", addUsers.addUser);
router.post("/registerEstudiante", addEstudiante.addEstudiante);
router.post("/add_Asistencia", addAsistencia.addAsistencia);
router.get("/get_estudiante", getEstudiantes.getEstudiantes);
router.get("/getAsistencia", getAsistencia.getAsistencia);
router.post("/login", loginUser.loginUser);

module.exports = router;
