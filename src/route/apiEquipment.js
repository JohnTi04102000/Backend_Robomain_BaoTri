import express from "express";
let router = express.Router();
import APIEquipments from "../controller/equipmentController";

const initAPIEquipment = (app) => {
  router.get("/equipments", APIEquipments.getALLEquipments);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIEquipment;
