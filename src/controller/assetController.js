import pool from "../configs/connectDB";

let getALLAssets = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM assets");
  
    return res.status(200).json({
      message: "Get all assets successful",
      data: rows,
    });
  };

module.exports = {
    getALLAssets
}