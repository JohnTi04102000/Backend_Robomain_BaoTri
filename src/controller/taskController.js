import pool from "../configs/connectDB";

let getALLTasks = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM tasks");

  return res.status(200).json({
    message: "Get all tasks successful",
    data: rows,
  });
};

let createTask = async (req, res) => {
  try {
    console.log("create-taskk ", req.body);
    let { id_WO, description_Task, startDate, endDate, note, status_Task } = req.body;

    if (!id_WO || !description_Task || !startDate || !endDate || !note || !status_Task) {
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
      let end = new Date(endDate);

      try {
        let result = await pool.execute(
          "INSERT INTO tasks values (?, ?, ?, ?, ?, ?, ?)",
          [id, id_WO, description_Task, start, end, note, status_Task]
        );

        if (result) {
          console.log("result ", result);
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
  } catch (err) {}
  {
    console.log(err);
  }
};

let getTaskById = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

let deleteTaskById = async (req, res) => {
  try {
    let id_task = req.params.id;
    if (!id_task) {
      return res.status(404).json({
        message: "Delete task failed",
      });
    } else {
      await pool.execute("DELETE FROM tasks WHERE id = ?", [id_task]);
      console.log("check: ", id_task);
      return res.status(200).json({
        message: "Delete task successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let updateStatusTask = async (req, res) => {
  try {
    let id_Task = req.params.id;
    console.log(id_Task);

    if (
      !id_Task ) 
      {
      return res.status(404).json({
        message: "failed",
      });
    } else {
      let new_StatusTask = "Complete";
      await pool.execute(
        "UPDATE tasks SET status_Task = ? where id = ? ",
        [
          new_StatusTask,
          id_Task,
        ]
      );
      return res.status(200).json({
        message: "Update status task successful",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

let updateNoteTask = async (req, res) => {
  try {
    let {id, note} = req.body;
    console.log(req.body);

    if (
      !id || !note) 
      {
      return res.status(404).json({
        message: "failed",
      });
    } else {
      await pool.execute(
        "UPDATE tasks SET note = ? where id = ? ",
        [
          note,
          id,
        ]
      );
      return res.status(200).json({
        message: "Add note successful",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getALLTasks,
  createTask,
  getTaskById,
  deleteTaskById,
  updateStatusTask,
  updateNoteTask
};
