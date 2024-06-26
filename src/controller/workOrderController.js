import pool from "../configs/connectDB";

let getALLWorkOrders = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM workOrders  where status_WO != 'Close'"
  );

  return res.status(200).json({
    message: "Get all workOrders successful",
    data: rows,
  });
};

let getWOById = async (req, res) => {
  try {
    let id_user = req.params.id;
    if (!id_user) {
      return res.status(404).json({
        message: `Get all work order of ${id_user} failed`,
      });
    } else {
      const [rows, fields] = await pool.execute(
        "Select * FROM workOrders WHERE assign = ? AND status_WO != 'Close'",
        [id_user]
      );
      //console.log("check: ", id_user);
      return res.status(200).json({
        message: `Get workOrder of ${id_user} successful`,
        data: rows,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let getAllWOComplete = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute(
      "Select * FROM workOrders WHERE status_WO = 'Close'"
    );
    return res.status(200).json({
      message: `Get all workOrder completed successful`,
      data: rows,
    });
  } catch (err) {
    console.log(err);
  }
};

let getWOCompleteById = async (req, res) => {
  try {
    let id_user = req.params.id;
    if (!id_user) {
      return res.status(404).json({
        message: `Get all work order of ${id_user} successfully`,
      });
    } else {
      const [rows, fields] = await pool.execute(
        "Select * FROM workOrders WHERE assign = ? AND status_WO = 'Close'",
        [id_user]
      );
      //console.log("check: ", id_user);
      return res.status(200).json({
        message: `Get workOrder of ${id_user} successful`,
        data: rows,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let getExpireWO = async (req, res) => {
  try {
    let id_User = req.params.id;
    console.log("id: " + id_User);
    const [rows, fields] = await pool.execute(
      "SELECT * FROM workOrders WHERE assign = ? AND status_WO != 'Close' AND completeDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 10 DAY) ORDER BY completeDate ASC;",
      [id_User]
    );

    return res.status(200).json({
      message: "List WO near expire",
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

let createNewWorkOrder = async (req, res) => {
  try {
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
      try {
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
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

let updateWorkOrder = async (req, res) => {
  try {
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
        message: "Update success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

let completeWorkOrder = async (req, res) => {
  try {
    let id_WO = req.params.id;
    console.log("id: " + id_WO);

    if (!id_WO) {
      return res.status(404).json({
        message: "failed",
      });
    } else {
      await pool.execute(
        "UPDATE workOrders SET status_WO = 'Close' where id = ?",
        [id_WO]
      );
      return res.status(200).json({
        message: "Update success",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

let deleteWorkOrder = async (req, res) => {
  try {
    let id_WO = req.params.id;
    if (!id_WO) {
      return res.status(404).json({
        message: "Update failed",
      });
    } else {
      await pool.execute("DELETE FROM workOrders WHERE id = ?", [id_WO]);
      console.log("check: ", id_WO);
      return res.status(200).json({
        message: "Success",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getALLWorkOrders,
  createNewWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
  getWOById,
  getExpireWO,
  completeWorkOrder,
  getAllWOComplete,
  getWOCompleteById,
};
