import express from "express";
let router = express.Router();
import APIAsset from "../controller/assetController";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
      cb(null, file.originalname);
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

const initAPIAsset = (app) => {
  router.get("/assets", APIAsset.getALLAssets);
  router.post("/create-asset", APIAsset.createAsset);
  router.delete("/delete-asset/:id", APIAsset.deleteAsset);
  router.put("/update-asset/", APIAsset.updateAsset);
  router.post('/upload-asset', upload.single('image_asset'), APIAsset.handleUploadFileAsset);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIAsset;
