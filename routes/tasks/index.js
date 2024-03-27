const {
  addTask,
  getTasks,
  editTask,
  deleteTask,
} = require("../../controllers/tasks.controller");

const router = require("express").Router();

router.post("/add", addTask);
router.get("/get", getTasks);
router.put("/edit/:id", editTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
