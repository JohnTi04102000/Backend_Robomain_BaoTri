import express from "express";
let router = express.Router();
import APIPart from "../controller/partController";

const initAPIPart = (app) => {
  router.get("/parts", APIPart.getALLParts);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIPart;
