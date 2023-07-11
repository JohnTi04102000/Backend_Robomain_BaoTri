import pool from "../configs/connectDB";

let getALLOrders = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM orders");
  
    return res.status(200).json({
      message: "Get all assets successful",
      data: rows,
    });
  };

module.exports = {
    getALLOrders
}