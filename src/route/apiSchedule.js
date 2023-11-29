import express from "express";
let router = express.Router();
import APISchedules from "../controller/scheduleController";

const initAPISchedule = (app) => {
  router.get("/getAllSchedule", APISchedules.getALLSchedules);
  router.post("/create-schedule", APISchedules.createNewSchedule);
  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPISchedule;
