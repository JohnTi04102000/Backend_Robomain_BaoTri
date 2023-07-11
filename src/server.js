import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIUser from "./route/apiUser";
import initAPIAsset from "./route/apiAsset";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

//Config body-parse to send data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Config view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api user
initAPIUser(app);

//init api asset
initAPIAsset(app);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
