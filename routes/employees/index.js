const { getEmployees } = require("../../controllers/employee.controller");

const router = require("express").Router();

router.get("/get", getEmployees);

module.exports = router;
