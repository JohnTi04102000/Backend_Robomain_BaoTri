import express from "express";
import {checkPermission, checkUser} from '../middleware/authManagerMantenance'
let router = express.Router();
import APIWorkOrder from "../controller/workOrderController";

const initAPIWorkOrder = (app) => {
  router.get("/workOrders", APIWorkOrder.getALLWorkOrders);
  router.get("/getWO/:id", APIWorkOrder.getWOById);
  router.get("/getExpireWO", APIWorkOrder.getExpireWO);
  router.post("/create-workOrder", checkPermission,  APIWorkOrder.createNewWorkOrder);
  router.put("/update-workOrder", APIWorkOrder.updateWorkOrder);
  router.delete("/delete-workOrder/:id", APIWorkOrder.deleteWorkOrder);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIWorkOrder;
