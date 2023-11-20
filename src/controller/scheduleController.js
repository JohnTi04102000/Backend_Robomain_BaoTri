import pool from "../configs/connectDB";

let getALLSchedules = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM Schedule");

  return res.status(200).json({
    message: "Get all schedules successful",
    data: rows,
  });
};

module.exports = {
    getALLSchedules
};
