import pool from "../configs/connectDB";

let getALLSupplier = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM supplier");
  
    return res.status(200).json({
      message: "Get all suppliers successful",
      data: rows,
    });
  };

module.exports = {
    getALLSupplier
}