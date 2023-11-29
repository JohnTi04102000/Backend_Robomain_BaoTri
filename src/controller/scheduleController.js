import pool from "../configs/connectDB";

let getALLSchedules = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM Schedule");

  return res.status(200).json({
    message: "Get all schedules successful",
    data: rows,
  });
};

let createNewSchedule = async (req, res) => {
  console.log('create-schedule ', req.body);
  let { title, dateStart, timeStart, timeFinish, currentDate, id_userCreate } = req.body;

  if (!title || !dateStart || !timeStart || !timeFinish || !currentDate || !id_userCreate) {
    return res.status(404).json({
      message: "Wrong input data",
    });
  } else {

    // let start = new Date(startDate);

    try {
      let result = await pool.execute(
        "INSERT INTO Schedule(title, day_start, time_start, time_end, day_create, id_userCreate) values (?, ?, ?, ?, ?, ?)",
        [title, dateStart, timeStart, timeFinish, currentDate, id_userCreate]
      );

      if (result) {
        console.log('Create schedule success ', result);
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
}

module.exports = {
    getALLSchedules,
    createNewSchedule
};
