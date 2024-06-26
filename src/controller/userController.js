import pool from "../configs/connectDB";

let name_file;

let handleUploadFile = async (req, res) => {
  console.log("file up: ", req.file);
  name_file = req.file.filename;
  console.log("name_file: ", name_file);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  // Display uploaded image for user validation
  // res.send(
  //   `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/system/user-manage/users">Upload another image</a>`
  // );
  // });
};

let getALLUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    message: "Get all users successful",
    data: rows,
  });
};

let getUserByID = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows, fields] = await pool.execute(
      "SELECT * FROM users where id = ?",
      [id]
    );

    return res.status(200).json({
      message: "Get information user successful",
      data: rows,
    });
  } catch (err) {
    console.log(err);
  }
};

let createNewUser = async (req, res) => {
  try {
    console.log("check body: ", req.body);
    let { name_User, birth, role_User, image, sex } = req.body;

    if (!name_User || !birth || !role_User || !sex || !image) {
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
    console.log("insert: ", name_file);

    let result = await pool.execute(
      "INSERT INTO users values (?, ?, ?, ?, ?, ?)",
      [id, name_User, birth_datetime, role_User, sex, image]
    );
    if (result) {
      return res.status(200).json({
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let updateUser = async (req, res) => {
  try {
    let { name_User, birth, role_User, sex, image, id } = req.body;
    if (!id || !name_User || !birth || !role_User || !sex || !image) {
      return res.status(404).json({
        message: "failed",
      });
    }

    const birth_datetime = new Date(birth);

    const [user] = await pool.execute(
      "UPDATE users SET name_User = ?, birth = ?, role_User = ?, sex = ?, image = ? where id = ?",
      [name_User, birth_datetime, role_User, sex, image, id]
    );
    return res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteUser = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getALLUser,
  createNewUser,
  updateUser,
  deleteUser,
  handleUploadFile,
  getUserByID,
};
