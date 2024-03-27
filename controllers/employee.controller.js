const database = require("../config/database");

module.exports = {
  getEmployees: async (req, res) => {
    try {
      // bikin query where
      // bikin query order by
      let whereCond = "";
      let orderCond = "ORDER BY employee_id ASC";
      const client = await database.connect();
      if (Object.keys(req.query).length > 0) {
        let containerCond = [];
        for (const key in req.query) {
          // looping object key
          // 1: key = fullname
          // 2: key = noreg
          const value = req.query[key];
          containerCond.push(`${key} LIKE '%${value}%'`);
        }
        // containerCond = [`fullname LIKE '%ulo%'`, `noreg LIKE '%19%'`]
        // stringJoin = `fullname LIKE '%ulo%' AND noreg LIKE '%19%'`
        whereCond = `WHERE ${containerCond.join(" AND ")}`;
      }
      let q = `
        SELECT noreg,fullName FROM tb_m_employees
        ${whereCond}
        ${orderCond}
      `;
      console.log(q);
      let userDataQuery = await client.query(q);
      client.release();
      const userData = userDataQuery.rows;
      res.status(200).json({
        message: "Success to get data empl",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error",
      });
    }
  },
};
