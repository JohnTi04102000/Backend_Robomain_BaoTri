import pool from "../configs/connectDB";

let getALLWorkOrders = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM workOrders");

  return res.status(200).json({
    message: "Get all workOrders successful",
    data: rows,
  });
};

let createNewWorkOrder = async (req, res) => {
  console.log(req.body);
  let {
    id_Asset,
    priority,
    type_WO,
    status_WO,
    startDate,
    completeDate,
    description_WO,
    note,
    assign,
  } = req.body;

  if (
    !id_Asset ||
    !priority ||
    !type_WO ||
    !status_WO ||
    !startDate ||
    !completeDate ||
    !description_WO ||
    !note ||
    !assign
  ) {
    return res.status(404).json({
      message: "WO failed",
    });
  } else {
    function generateRandomId() {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    // Tạo một mã ngẫu nhiên
    let id_WO = "workOrder" + generateRandomId();

    let start = new Date(startDate);
    let end = new Date(completeDate);

    await pool.execute(
      "INSERT INTO workOrders values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id_WO,
        id_Asset,
        priority,
        type_WO,
        status_WO,
        start,
        end,
        description_WO,
        note,
        assign,
      ]
    );

    return res.status(200).json({
      message: "Success",
    });
  }
};

let updateWorkOrder = async (req, res) => {
  let {
    id_WO,
    id_Asset,
    priority,
    type_WO,
    status_WO,
    startDate,
    completeDate,
    description_WO,
    note,
    assign,
  } = req.body;
  console.log(req.body);

  if (
    !id_WO ||
    !id_Asset ||
    !priority ||
    !type_WO ||
    !status_WO ||
    !startDate ||
    !completeDate ||
    !description_WO ||
    !note ||
    !assign
  ) {
    return res.status(404).json({
      message: "failed",
    });
  } else {
    let start = new Date(startDate);
    let end = new Date(completeDate);

   await pool.execute(
      "UPDATE workOrders SET id_Asset = ?, priority = ?, type_WO = ?, status_WO = ?, startDate= ?, completeDate = ?, description_WO = ?, note= ?, assign = ? where id = ? ",
      [
        id_Asset,
        priority,
        type_WO,
        status_WO,
        start,
        end,
        description_WO,
        note,
        assign,
        id_WO,
      ]
    );
    return res.status(200).json({
      message: "Success",
    });
  }
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
  deleteWorkOrder,
};
