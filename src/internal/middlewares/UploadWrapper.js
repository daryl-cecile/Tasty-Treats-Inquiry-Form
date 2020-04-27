"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseMiddleware_1 = require("./BaseMiddleware");
var multer = require("multer");
var UploadWrapper = /** @class */ (function (_super) {
    __extends(UploadWrapper, _super);
    function UploadWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadWrapper.prototype.handlerFunction = function (req, res, next) {
        var accept = multer({
            preservePath: true,
            limits: {
                fileSize: 10000000
            },
            storage: multer.diskStorage({
                destination: __dirname + "/../../../responses",
                filename: function (req, file, cb) {
                    cb(null, Date.now() + "-" + file.originalname);
                }
            })
        }).any();
        accept(req, res, function () {
            // not necessary yet as files aren't being uploaded
            next();
        });
    };
    return UploadWrapper;
}(BaseMiddleware_1.BaseMiddleware));
exports.UploadWrapper = UploadWrapper;
//# sourceMappingURL=UploadWrapper.js.map