import pool from "../configs/connectDB";
import accountService from "../services/accountService"

let getALLAccounts = async (req, res) => {

    const [rows, fields] = await pool.execute("SELECT * FROM accounts");
  
    return res.status(200).json({
       data: rows,
    });
  };


let Login = async (req, res) => {
    let email  = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 0,
            message: "Missing input parameter!"
        })
    }
    let userData = await accountService.handleLogin(email, password);
    console.log(userData);

    return res.status(200).json({
        error: userData.errCode,
        message: userData.message,
        infoUser: userData.userInfo
    })
}


module.exports = {
    getALLAccounts,
    Login
}