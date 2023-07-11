import express from "express";
let router = express.Router();
import APIFacility from "../controller/facilityController";

const initAPIFacility = (app) => {
  router.get("/facilities", APIFacility.getALLFacilities);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIFacility;
