const database = require("../config/database");

module.exports = {
  addTask: async (req, res) => {
    try {
      console.log(req.body);
      let q = `insert into tb_r_tasks (user_id, task_desc)
      values (${req.body.user_id}, '${req.body.task_desc}');`;
      console.log(q);
      const client = await database.connect();

      await client.query(q);
      client.release();
      res.status(201).json({
        message: "Success to add task",
        dataInserted: req.body,
      });
      //   insert into tb_r_tasks (user_id, task_desc)
      //   values (, 'Macul');
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error",
      });
    }
  },
  getTasks: async (req, res) => {
    try {
      let whereCond = ``;
      let lengthQuery = Object.keys(req.query).length;
      if (lengthQuery > 0) {
        // ketika ada object di query
        // looping key nya kemudian masukan ke kondisi
        let containerCond = [];
        for (const key in req.query) {
          const value = req.query[key];

          if (key == "task_id") {
            containerCond.push(`${key} = ${value}`);
          } else {
            containerCond.push(`${key} LIKE '%${value}%'`);
          }
        }
        whereCond = `WHERE ${containerCond.join(" AND ")}`;
      }
      let q = `select
      trt.task_id,
      trt.task_desc,
      tme.noreg,
      tme.fullname
  from tb_r_tasks trt
  join tb_m_employees tme ON trt.user_id = tme.employee_id
    ${whereCond}`;
      console.log(q);
      const client = await database.connect();
      let taskQuery = await client.query(q);
      let taskData = taskQuery.rows;
      client.release();
      res.status(200).json({
        message: "success",
        data: taskData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed",
      });
    }
  },
  editTask: async (req, res) => {
    try {
      // update tb_r_tasks set user_id = 4, task_desc = 'MACUL EDIT'
      let containerColumnEdit = [];
      for (const key in req.body) {
        const value = req.body[key];
        containerColumnEdit.push(`${key} = '${value}'`);
      }
      let q = `update tb_r_tasks set ${containerColumnEdit.join(",")}
                where task_id = ${req.params.id}`;
      const client = await database.connect();
      await client.query(q);
      client.release();
      res.status(201).json({
        message: "success to edit",
        dataEditted: req.body,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error",
      });
    }
  },
  deleteTask: async (req, res) => {
    try {
      // update tb_r_tasks set user_id = 4, task_desc = 'MACUL EDIT'
      let q = `delete from tb_r_tasks where task_id = ${req.params.id};`;
      const client = await database.connect();
      await client.query(q);
      client.release();
      res.status(201).json({
        message: "success to delete task",
        dataIdDeleted: `Deleteted id: ${req.params.id}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error",
      });
    }
  },
};
