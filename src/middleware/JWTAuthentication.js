require("dotenv").config();

import jwt from 'jsonwebtoken'

let createJWT = (data) => {
    let payload = {id_user: data};
    let key = process.env.JWT_SECRET_KEY;

    let token = jwt.sign(payload, key);
    return token;
}


let verifyJWT = (token) => {
    let key = process.env.JWT_SECRET_KEY;
    let data = null;

    try{
        let decode = jwt.verify(token, key);
        data = decode;
    }
    catch(error){
        console.log(error);
    }
    return data;
}
module.exports = {
    createJWT,
    verifyJWT
  };