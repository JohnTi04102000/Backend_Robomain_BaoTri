import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIUser from "./route/apiUser";
import initAPIAsset from "./route/apiAsset";
import initAPISupplier from "./route/apiSupplier";
import initAPIOrder from "./route/apiOrder";
import initAPIFacility from "./route/apiFacility";
import initAPIPart from "./route/apiPart";
import initAPIOrderDetail from "./route/apiOrderDetail";
import initAPIWorkOrder from "./route/apiWorkOrder";
import initAPITask from "./route/apiTask";
import initAPIUsedAsset from "./route/apiUsedAssets";
import initAPIEquipment from "./route/apiEquipment";
import initAPITool from "./route/apiTool";
import initAPIAccount from "./route/apiAccount";

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

//init api supplier
initAPISupplier(app);

//init api order
initAPIOrder(app);

//init api facility
initAPIFacility(app);

//init api part
initAPIPart(app);

//init api orderDetail
initAPIOrderDetail(app);

//init api workOrder
initAPIWorkOrder(app);

//init api task
initAPITask(app);

//init api used_Asset
initAPIUsedAsset(app);

//init api equipment
initAPIEquipment(app);

//init api tool
initAPITool(app);

//init api account
initAPIAccount(app);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
