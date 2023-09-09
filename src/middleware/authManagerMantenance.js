import pool from "../configs/connectDB";
import {verifyJWT} from './JWTAuthentication';

let getDetail = async (id) => {
    const [user, fields] = await pool.execute(
      "SELECT * FROM users where id = ?",
      [id]
    );
    return user;
  };

let checkPermission = async (req, res, next) => {
    // Lấy token từ req.headers hoặc req.cookies, tùy theo cách bạn xác thực token
    let token = req.headers.authorization;
    console.log("Token: ", token);
    if (token) {
      let data = verifyJWT(token.split(' ')[1]); // Xác minh token và lấy dữ liệu
      let id = data.id_user;
        
        let info_User = await getDetail(id);

        let role = info_User[0].role_User
        console.log(role);
        if(role === 'Maintenance manager')
        {
          next();
        }
        else{
          res.status(500).json({errCode: "You don't have permission to craete work order"});
        }
      
    } else {
      // Nếu không có token, cho phép tiếp tục xử lý (hoặc bạn có thể trả về lỗi 401 Unauthorized)
      res.status(500).json({errCode: "You need login to access"});
    }
  };
  
  let checkUser = async (req, res, next) => {

    let id_req = req.params.id;
    console.log("req id: " + id_req);
    let token = req.headers.authorization;
    console.log("token: " + token);
    if (token) {
      let data = verifyJWT(token.split(' ')[1]);
      let id = data.id_user;
        
        let info_User = await getDetail(id);

        let id_user = info_User[0].id
        
        if(id_user === id_req)
        {
          next();
        }      
        else{
          res.status(500).json({errCode: "You don't have permission to view work order"});
        }
      
    } else {
      // Nếu không có token
      res.status(500).json({errCode: "You need login to access"});
    }
  };
  

export {checkPermission, checkUser};


