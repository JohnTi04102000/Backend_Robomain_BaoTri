import express from "express";
let router = express.Router();
import APIUsedAssets from "../controller/usedAssetController";

const initAPIUsedAsset = (app) => {
  router.get("/used_assets", APIUsedAssets.getALLUsedAssets);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIUsedAsset;
