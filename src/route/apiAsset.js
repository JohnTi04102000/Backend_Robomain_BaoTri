import express from "express";
let router = express.Router();
import APIAsset from "../controller/assetController";

const initAPIAsset = (app) => {
  router.get("/assets", APIAsset.getALLAssets);
  router.post("/create-asset", APIAsset.createAsset);
  router.delete("/delete-asset/:id", APIAsset.deleteAsset);
  router.put("/update-asset/", APIAsset.updateAsset);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIAsset;
