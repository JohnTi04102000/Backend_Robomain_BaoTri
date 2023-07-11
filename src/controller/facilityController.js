import pool from "../configs/connectDB";

let getALLFacilities = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM facilities");
  
    return res.status(200).json({
      message: "Get all facilities successful",
      data: rows,
    });
  };

module.exports = {
    getALLFacilities
}