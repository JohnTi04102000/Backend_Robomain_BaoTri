import express from "express";
let router = express.Router();
import APITask from "../controller/taskController";

const initAPITask = (app) => {
  router.get("/tasks", APITask.getALLTasks);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPITask;
