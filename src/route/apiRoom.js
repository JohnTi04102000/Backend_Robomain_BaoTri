import express from "express";
import roomController from "../controller/roomController";
let router = express.Router();


const initRoomRoute = (app) => {
  router.get("/rooms", roomController.getAllRoom);
  router.post("/create-room", roomController.createNewRoom);
  router.patch("/update-room", roomController.updateRoom);
  router.delete("/delete-room/:id", roomController.deleteRoom);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initRoomRoute;
