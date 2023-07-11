import pool from "../configs/connectDB";

let getALLWorkOrders = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM workOrders");
  
    return res.status(200).json({
      message: "Get all workOrders successful",
      data: rows,
    });
  };

module.exports = {
    getALLWorkOrders
}