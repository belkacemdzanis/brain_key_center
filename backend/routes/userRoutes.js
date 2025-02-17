const express = require("express");
const { register, login } = require("../controllers/userController");

const router = express.Router();

router.post("/:role/register", register);
router.post("/:role/login", login);

module.exports = router;
