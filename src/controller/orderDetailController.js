import pool from "../configs/connectDB";

let getALLOrderDetails = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM orderDetails");
  
    return res.status(200).json({
      message: "Get all orderDetails successful",
      data: rows,
    });
  };

module.exports = {
    getALLOrderDetails
}