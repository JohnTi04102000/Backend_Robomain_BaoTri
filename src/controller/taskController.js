import pool from "../configs/connectDB";

let getALLTasks = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM tasks");
  
    return res.status(200).json({
      message: "Get all tasks successful",
      data: rows,
    });
  };

module.exports = {
    getALLTasks
}