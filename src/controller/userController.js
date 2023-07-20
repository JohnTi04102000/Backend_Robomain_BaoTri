import pool from "../configs/connectDB";

let getALLUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    message: "Hello",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { id, name_User, birth, role_User, sex } = req.body;

  if (!id || !name_User || !birth || !role_User || !sex) {
    return res.status(404).json({
      message: "failed",
    });
  }

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
  let { id, name_User, birth, role_User, sex, idUser } = req.body;
  if (!id || !name_User || !birth || !role_User || !sex || !idUser) {
    return res.status(404).json({
      message: "failed",
    });
  }

  const birth_datetime = new Date(birth);

  const [user] = await pool.execute(
    "UPDATE users SET id = ?, name_User = ?, birth = ?, role_User = ?, sex = ? where id = ?",
    [id, name_User, birth_datetime, role_User, sex, idUser]
  );
  return res.status(200).json({
    message: "Success",
  });
};

let deleteUser = async (req, res) => {
  let idUser = req.params.id;
  if (!idUser) {
    return res.status(404).json({
      message: "failed",
    });
  }

  await pool.execute("DELETE FROM users WHERE id = ?", [idUser]);
  console.log("check: ", idUser);
  return res.status(200).json({
    message: "Success",
  });
};



module.exports = {
  getALLUser,
  createNewUser,
  updateUser,
  deleteUser
};
