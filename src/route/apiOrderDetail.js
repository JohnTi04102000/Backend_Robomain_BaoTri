import express from "express";
let router = express.Router();
import APIOrderDetail from "../controller/orderDetailController";

const initAPIOrderDetail = (app) => {
  router.get("/orderDetails", APIOrderDetail.getALLOrderDetails);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIOrderDetail;
