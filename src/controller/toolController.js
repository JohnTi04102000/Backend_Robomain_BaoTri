import pool from "../configs/connectDB";

let getALLTools = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM tools");
  
    return res.status(200).json({
      message: "Get all tools successful",
      data: rows,
    });
  };

module.exports = {
    getALLTools
}