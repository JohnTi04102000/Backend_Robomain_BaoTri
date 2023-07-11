import pool from "../configs/connectDB";

let getALLParts = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM parts");
  
    return res.status(200).json({
      message: "Get all facilities successful",
      data: rows,
    });
  };

module.exports = {
    getALLParts
}