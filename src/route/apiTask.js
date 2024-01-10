import express from "express";
let router = express.Router();
import APITask from "../controller/taskController";

const initAPITask = (app) => {
  router.get("/tasks", APITask.getALLTasks);
  router.get("/getTask/:id", APITask.getTaskById);
  router.get("/updateTask/:id", APITask.updateStatusTask);
  router.post("/create-task", APITask.createTask);
  router.put("/note-task", APITask.updateNoteTask);
  router.delete("/delete-task/:id", APITask.deleteTaskById);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPITask;
