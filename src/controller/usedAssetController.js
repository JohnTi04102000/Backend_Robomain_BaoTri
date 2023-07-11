import pool from "../configs/connectDB";

let getALLUsedAssets = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM used_Assets");
  
    return res.status(200).json({
      message: "Get all used_Assets successful",
      data: rows,
    });
  };

module.exports = {
    getALLUsedAssets
}