import express from "express";
let router = express.Router();
import APIOrder from "../controller/orderController";

const initAPIOrder = (app) => {
  router.get("/orders", APIOrder.getALLOrders);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIOrder;
