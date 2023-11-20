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
import initAPISchedule from "./route/apiSchedule";
import cors from 'cors'


require("dotenv").config();

const app = express();

//Config server
// app.use(cors());
// const port = process.env.PORT;
// const publicIPAddress = '103.98.160.26';

//Config local
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
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

//init api schedule
initAPISchedule(app);

//checkPermission();

//Config server
// app.listen(port, publicIPAddress, () => {
//   console.log("listening on port: " + port);
// });

//Config local
app.listen(port, () => {
  console.log("listening on port: " + port);

});

//Socket module

const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
