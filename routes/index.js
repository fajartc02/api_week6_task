const router = require("express").Router();
const employees = require("./employees");

router.use("/employees", employees);
router.use("/tasks", require("./tasks"));

module.exports = router;
