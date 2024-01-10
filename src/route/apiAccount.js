import express from "express";
let router = express.Router();
import APIAccount from "../controller/accountController";

const initAPIAccount = (app) => {
  router.get("/accounts", APIAccount.getALLAccounts);
  router.post("/create-account", APIAccount.createAccount);
  router.delete("/delete-account/:id", APIAccount.deleteAccount);
  router.post("/login", APIAccount.Login);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIAccount;
