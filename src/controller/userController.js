import pool from "../configs/connectDB";

let getALLUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    message: "Hello",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { name_User, birth, role_User, sex } = req.body;

  if (!name_User || !birth || !role_User || !sex) {
    return res.status(404).json({
      message: "failed",
    });
  }

  function generateRandomId() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  let id = "user" + generateRandomId();

  const birth_datetime = new Date(birth);

  await pool.execute("INSERT INTO users values (?, ?, ?, ?, ?)", [
    id,
    name_User,
    birth_datetime,
    role_User,
    sex,
  ]);

  return res.status(200).json({
    message: "Success",
  });
};

let updateUser = async (req, res) => {
  console.log(req.body);
  let {name_User, birth, role_User, sex, id  } = req.body;
  if (!id || !name_User || !birth || !role_User || !sex) {
    return res.status(404).json({
      message: "failed",
    });
  }

  const birth_datetime = new Date(birth);

  const [user] = await pool.execute(
    "UPDATE users SET name_User = ?, birth = ?, role_User = ?, sex = ? where id = ?",
    [name_User, birth_datetime, role_User, sex, id]
  );
  return res.status(200).json({
    message: "Success",
  });
};


let deleteUser = async (req, res) => {
  let idUser = req.params.id;
  console.log("id user: " + idUser);
  if (!idUser) {
    return res.status(404).json({
      message: "failed",
    });
  } else {
    await pool.execute("DELETE FROM users WHERE id = ?", [idUser]);
    console.log("check: ", idUser);
    return res.status(200).json({
      message: "Success",
    });
  }
};

module.exports = {
  getALLUser,
  createNewUser,
  updateUser,
  deleteUser,
};
