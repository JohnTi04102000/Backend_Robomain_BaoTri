import pool from "../configs/connectDB";

let getALLTasks = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM tasks");

  return res.status(200).json({
    message: "Get all tasks successful",
    data: rows,
  });
};

let createTask = async (req, res) => {
  console.log(req.body);
  let { id_WO, description_Task, startDate, files, status_Task } = req.body;

  if (!id_WO || !description_Task || !startDate || !files || !status_Task) {
    return res.status(404).json({
      message: "Wrong input data",
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
    let id = "task" + generateRandomId();

    let start = new Date(startDate);

    try {
      let result = await pool.execute(
        "INSERT INTO tasks values (?, ?, ?, ?, ?, ?)",
        [id, id_WO, description_Task, start, files, status_Task]
      );

      if (result) {
        return res.status(200).json({
          message: "Create task successfully",
        });
      } else {
        return res.status(404).json({
          message: "Create task failed",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

let getTaskById = async (req, res) => {
  let id_WO = req.params.id;
  if (!id_WO) {
    return res.status(404).json({
      message: `Please provide id work order`,
    });
  } else {
    try {
      const [rows, fields] = await pool.execute(
        "Select * FROM tasks WHERE id_WO = ? ",
        [id_WO]
      );
      //console.log("check: ", id_user);
      if (rows.length > 0) {
        return res.status(200).json({
          message: `Get tasks of ${id_WO} successful`,
          data: rows,
        });
      } else {
        return res.status(404).json({
          message: `Get workOrder of ${id_WO} failed`,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = {
  getALLTasks,
  createTask,
  getTaskById,
};
