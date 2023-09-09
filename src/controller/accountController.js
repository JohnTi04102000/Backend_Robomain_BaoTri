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

module.exports = {
  getALLAccounts,
  Login,
};
