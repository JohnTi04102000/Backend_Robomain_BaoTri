import express from "express";
let router = express.Router();
import APIControlller from "../controller/userController";

const initAPIUser = (app) => {
  router.get("/users", APIControlller.getALLUser);
  router.post("/create-user", APIControlller.createNewUser);
  router.put("/update-user", APIControlller.updateUser);
  router.delete("/delete-user/:id", APIControlller.deleteUser);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIUser;
