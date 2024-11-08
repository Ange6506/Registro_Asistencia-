const express = require("express");
const router = express.Router();

const addUsers = require("../controllers/users/addUser");

router.post("/add_user", addUsers.addUser);

module.exports = router;
