import express from "express";
let router = express.Router();
import APITools from "../controller/toolController";

const initAPITool = (app) => {
  router.get("/tools", APITools.getALLTools);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPITool;
