import express from "express";
import scheduleController from "../controller/scheduleController";
let router = express.Router();


const initScheduleRoute = (app) => {
  router.get("/schedules", scheduleController.getAllSchedule);
  router.get("/schedule/:id", scheduleController.getScheduleById);
  router.post("/create-schedule", scheduleController.createNewSchedule);
  router.patch("/update-schedule", scheduleController.updateSchedule);
  router.delete("/delete-schedule/:id", scheduleController.deleteSchedule);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initScheduleRoute;
