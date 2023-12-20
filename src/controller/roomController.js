import pool from "../configs/connectDB";

let getAllRoom = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM ROOM");

  return res.status(200).json({
    data: rows,
  });
};

let createNewRoom = async (req, res) => {
  console.log("create-schedule ", req.body);
  let { scheduleID, userID, room_Code, password, time_Create, room_Name } = req.body;

  if (!scheduleID || !userID || !room_Code || !password || !time_Create || !room_Name) {
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

    let id_Room = generateRandomId();
    const create_Time = new Date(time_Create);

    try {
      let result = await pool.execute(
        "INSERT INTO ROOM values (?, ?, ?, ?, ?, ?, ?)",
        [id_Room, scheduleID, userID, room_Code, password, time_Create, room_Name]
      );

      if (result) {
        console.log("Create room success ", result);
        return res.status(200).json({
          message: "Create new room successfully",
        });
      } else {
        return res.status(404).json({
          message: "Create room failed",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
let updateRoom = async (req, res) => {
  try {
    let { roomID, scheduleID, userID, room_Code, password, time_Create, room_Name } = req.body;
    if (!roomID || !scheduleID || !userID || !room_Code || !password || !time_Create || !room_Name) {
      return res.status(404).json({
        message: "Wrong input data",
      });
    }

    const create_Time = new Date(time_Create);

    const [room] = await pool.execute(
      "UPDATE ROOM SET SCHEDULEID = ?, USERID = ?, ROOMCODE = ?, PASSWORD = ?, CREATETIME = ?, ROOMNAME_ = ? where ROOMID = ?",
      [scheduleID, userID, room_Code, password, create_Time, room_Name, roomID]
    );
    return res.status(200).json({
      message: "Update room successful",
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteRoom = async (req, res) => {
  try {
    let id_Room = req.params.id;
    console.log("id_Schedule: " + id_Room);
    if (!id_Room) {
      return res.status(404).json({
        message: "Delete room failed",
      });
    } else {
      await pool.execute("DELETE FROM ROOM WHERE ROOMID = ?", [
        id_Room,
      ]);
      console.log("check: ", id_Room);
      return res.status(200).json({
        message: "Delete room successful",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
    getAllRoom,
    createNewRoom,
    updateRoom,
    deleteRoom
  };
  