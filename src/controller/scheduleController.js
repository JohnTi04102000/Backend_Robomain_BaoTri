import pool from "../configs/connectDB";

let getAllSchedule = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM SCHEDULE");

  return res.status(200).json({
    data: rows,
  });
};

let getScheduleById = async (req, res) => {
  try{
    let id = req.params.id;
    const [rows, fields] = await pool.execute("SELECT * FROM SCHEDULE WHERE SCHEDULEID = ?", [id]); 
    return res.status(200).json({
      data: rows,
    });
  }
  catch(err){
    console.error(err);
  }
}

let createNewSchedule = async (req, res) => {
  console.log("create-schedule ", req.body);
  let { userID, timeStart, timeFinish } = req.body;

  if (!userID || !timeStart || !timeFinish) {
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

    let id_Schedule = generateRandomId();
    const time_Create = new Date(timeStart);
    const time_End = new Date(timeFinish);

    try {
      let result = await pool.execute(
        "INSERT INTO SCHEDULE values (?, ?, ?, ?)",
        [id_Schedule, userID, time_Create, time_End]
      );

      if (result) {
        console.log("Create schedule success ", result);
        return res.status(200).json({
          message: "Create new schedule successfully",
        });
      } else {
        return res.status(404).json({
          message: "Create schedule failed",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

let updateSchedule = async (req, res) => {
  try {
    let { scheduleID, userID, timeStart, timeFinish } = req.body;
    if (!scheduleID || !userID || !timeStart || !timeFinish) {
      return res.status(404).json({
        message: "Wrong input data",
      });
    }

    const time_Create = new Date(timeStart);
    const time_End = new Date(timeFinish);

    const [schedule] = await pool.execute(
      "UPDATE SCHEDULE SET USERID = ?, CREATETIME = ?, ENDTIME = ? where SCHEDULEID = ?",
      [userID, time_Create, time_End, scheduleID]
    );
    return res.status(200).json({
      message: "Update schedule successful",
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteSchedule = async (req, res) => {
  try {
    let id_Schedule = req.params.id;
    console.log("id_Schedule: " + id_Schedule);
    if (!id_Schedule) {
      return res.status(404).json({
        message: "Delete schedule failed",
      });
    } else {
      await pool.execute("DELETE FROM SCHEDULE WHERE SCHEDULEID = ?", [
        id_Schedule,
      ]);
      console.log("check: ", id_Schedule);
      return res.status(200).json({
        message: "Delete schedule successful",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllSchedule,
  getScheduleById,
  createNewSchedule,
  updateSchedule,
  deleteSchedule,
};
