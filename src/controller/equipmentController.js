import pool from "../configs/connectDB";

let getALLEquipments = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM equipments");
  
    return res.status(200).json({
      message: "Get all equipments successful",
      data: rows,
    });
  };

module.exports = {
    getALLEquipments
}