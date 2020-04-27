import {CookieWrapper} from "./internal/middlewares/CookieWrapper";
import {Controller} from "./internal/Tools/RouterWrapper";
import {MainController} from "./controllers/frontEnd/MainController";
import {VarLoader} from "./internal/middlewares/VarLoader";
import {AppEvent} from "./internal/Tools/EventHandler";
import {SubmissionController} from "./controllers/api/SubmissionController";
import {UploadWrapper} from "./internal/middlewares/UploadWrapper";
import {AdminController} from "./controllers/frontEnd/AdminController";

const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.resolve(__dirname,"public")));    // makes public folder directly accessible

app.use(UploadWrapper.instance);
app.use(CookieWrapper.instance);
app.use(VarLoader.initWith({
    defaultPageTitle: "Tasty Treats"
}));

let loader = Controller.Loader(app);

loader.registerBaseControllers(
    MainController,
    SubmissionController,
    AdminController
);

const server =  app.listen(3000, () => {
    AppEvent.emit("APP_STATUS_CHANGE","ready");
});

AppEvent.on("APP_STATUS_CHANGE", status => {
    console.log("APP ",status);
})