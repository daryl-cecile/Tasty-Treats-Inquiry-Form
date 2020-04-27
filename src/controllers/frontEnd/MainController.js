"use strict";
exports.__esModule = true;
var RouterWrapper_1 = require("../../internal/Tools/RouterWrapper");
exports.MainController = new RouterWrapper_1.Controller(function (router) {
    router.onGET("/", function (req, res) {
        res.render("homepage");
    });
    router.onGET("/thank-you", function (req, res) {
        res.render("thank_you");
    });
    return router;
});
//# sourceMappingURL=MainController.js.map