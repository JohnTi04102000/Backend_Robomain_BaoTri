import pool from "../configs/connectDB";
import accountService from "../services/accountService";
import { createJWT, verifyJWT } from "../middleware/JWTAuthentication";

let getALLAccounts = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM accounts");

  return res.status(200).json({
    data: rows,
  });
};

let Login = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      return res.status(500).json({
        errCode: 0,
        message: "Missing input parameter!",
      });
    }
    let userData = await accountService.handleLogin(email, password);

    if (userData && userData.errCode === 3) {
      let userToken = createJWT(userData.userInfo);
      console.log(userData);

      let verifyToken = verifyJWT(userToken);

      return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        infoUser: userData.userInfo,
        roleUser: userData.role,
        token: userToken,
        verifyToken: verifyToken,
      });
    }

    return res.json({
        errorCode: userData.errCode,
        message: userData.message,
    })
  } catch (err) {
    console.log(err);
  }
};

let createAccount = async (req, res) => {
  try {
    console.log("check body: ", req.body);
    let {
      email,
      password,
      id_User
    } = req.body;

    if (
      !email ||
      !password ||
      !id_User
    ) {
      return res.status(404).json({
        message: "Insert to account failed",
      });
    }

    await pool.execute("INSERT INTO accounts values (?, ?, ?)", [
      email,
      password,
      id_User,
    ]);

    return res.status(200).json({
      message: "Insert to account successful",
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteAccount = async (req, res) => {
  try {
    let idAccount = req.params.id;
    console.log("id: " + idAccount);
    if (!idAccount) {
      return res.status(404).json({
        message: "Delete account failed",
      });
    } else {
      await pool.execute("DELETE FROM accounts WHERE id_user = ?", [idAccount]);
      return res.status(200).json({
        message: "Delete account success",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

let updateAccount = async (req, res) => {
  try {
    let {
      email,
      password,
      id_User
    } = req.body;

    if (
      !email ||
      !password ||
      !id_User
    ) {
      return res.status(404).json({
        message: "Update account failed",
      });
    } else {

      await pool.execute(
        "UPDATE accounts SET email = ?, pass = ?, id_user = ? where id_user = ?",
        [
          email,
          password,
          id_User,
          id_User
        ]
      );
      return res.status(200).json({
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getALLAccounts,
  Login,
  createAccount,
  deleteAccount,
  updateAccount
};
