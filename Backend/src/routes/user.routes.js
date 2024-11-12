const express = require("express");
const router = express.Router();

const addUsers = require("../controllers/users/addUser");
const addEstudiante = require("../controllers/users/addEstudiante");

router.post("/add_user", addUsers.addUser);
router.post("/registerEstudiante", addEstudiante.addEstudiante);

module.exports = router;
