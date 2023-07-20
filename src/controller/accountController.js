import pool from "../configs/connectDB";

let getALLAccounts = async (req, res) => {

    const [rows, fields] = await pool.execute("SELECT * FROM accounts");
  
    return res.status(200).json({
       data: rows,
    });
  };


let Login = (req, res) => {
    let email  = req.body.email;
    let password = req.body.password;
    return res.status(200).json({
        message: "Login",
        yourEmail: email,
        yourPassword: password
    })
}

module.exports = {
    getALLAccounts,
    Login
}