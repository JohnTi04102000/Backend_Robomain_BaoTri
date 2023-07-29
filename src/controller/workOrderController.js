import pool from "../configs/connectDB";

let getALLWorkOrders = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM workOrders");
  
    return res.status(200).json({
      message: "Get all workOrders successful",
      data: rows,
    });
  };


  let createNewWorkOrder = async (req, res) => {
    let { idAsset, priority, type, status, startDate, completeDate, description, note } = req.body;
  
    if ( !idAsset || !priority || !type || !status || !startDate || !completeDate || !description || !note) {
      return res.status(404).json({
        message: "WO failed",
      });
    }

    function generateRandomId() {
      const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
      const randomString = Math.random().toString(16).substring(2); // Generate random hexadecimal string
      return timestamp + randomString;
    }
    
    // Tạo một mã ngẫu nhiên
    let id_WO = 'workOrder' + generateRandomId();

    let start = new Date(startDate);
    let end = new Date(completeDate);
  
    await pool.execute("INSERT INTO workOrders values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      id_WO,
      idAsset,
      priority,
      type,
      status,
      start,
      end,
      description,
      note
    ]);
  
    return res.status(200).json({
      message: "Success",
    });
  };


  let updateWorkOrder = async (req, res) => {
    let {id_WO, idAsset, priority, type, status, startDate, completeDate, description, note } = req.body;
  
    if (!id_WO || !idAsset || !priority || !type || !status || !startDate || !completeDate || !description || !note) {
      return res.status(404).json({
        message: "failed",
      });
    }
  
    let start = new Date(startDate);
    let end = new Date(completeDate);
  
    const [user] = await pool.execute(
      "UPDATE workOrders SET id_Asset = ?, priority = ?, type_WO = ?, status_WO = ?, startDate= ?, completeDate = ?, description_WO = ?, note= ? where id = ? ",
      [
      idAsset,
      priority,
      type,
      status,
      start,
      end,
      description,
      note,
      id_WO
      ]
    );
    return res.status(200).json({
      message: "Success",
    });
  };


  let deleteWorkOrder = async (req, res) => {
    let id_WO = req.params.id;
    if (!id_WO) {
      return res.status(404).json({
        message: "failed",
      });
    }
    await pool.execute("DELETE FROM workOrders WHERE id = ?", [id_WO]);
    console.log("check: ", id_WO);
    return res.status(200).json({
      message: "Success",
    });
  };

  
module.exports = {
    getALLWorkOrders,
    createNewWorkOrder,
    updateWorkOrder,
    deleteWorkOrder
}