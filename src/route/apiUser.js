import express from "express";
let router = express.Router();
import APIControlller from "../controller/userController";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initAPIUser = (app) => {
  router.get("/users", APIControlller.getALLUser);
  router.post("/create-user", APIControlller.createNewUser);
  router.put("/update-user", APIControlller.updateUser);
  router.delete("/delete-user/:id", APIControlller.deleteUser);
  //router.post('/system/user-manage/users/upload-profile-pic', upload.single('profile_pic'), APIControlller.handleUploadFile);
  router.post('/upload-profile-pic', upload.single('profile_pic'), APIControlller.handleUploadFile);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIUser;
