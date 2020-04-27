"use strict";
exports.__esModule = true;
var CookieWrapper_1 = require("./internal/middlewares/CookieWrapper");
var RouterWrapper_1 = require("./internal/Tools/RouterWrapper");
var MainController_1 = require("./controllers/frontEnd/MainController");
var VarLoader_1 = require("./internal/middlewares/VarLoader");
var EventHandler_1 = require("./internal/Tools/EventHandler");
var SubmissionController_1 = require("./controllers/api/SubmissionController");
var UploadWrapper_1 = require("./internal/middlewares/UploadWrapper");
var AdminController_1 = require("./controllers/frontEnd/AdminController");
var express = require("express");
var path = require("path");
var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.resolve(__dirname, "public"))); // makes public folder directly accessible
app.use(UploadWrapper_1.UploadWrapper.instance);
app.use(CookieWrapper_1.CookieWrapper.instance);
app.use(VarLoader_1.VarLoader.initWith({
    defaultPageTitle: "Tasty Treats"
}));
var loader = RouterWrapper_1.Controller.Loader(app);
loader.registerBaseControllers(MainController_1.MainController, SubmissionController_1.SubmissionController, AdminController_1.AdminController);
var server = app.listen(3000, function () {
    EventHandler_1.AppEvent.emit("APP_STATUS_CHANGE", "ready");
});
EventHandler_1.AppEvent.on("APP_STATUS_CHANGE", function (status) {
    console.log("APP ", status);
});
//# sourceMappingURL=root.js.map