import express from "express";
let router = express.Router();
import APISupplier from "../controller/supplierController";

const initAPISupplier = (app) => {
  router.get("/suppliers", APISupplier.getALLSupplier);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPISupplier;
