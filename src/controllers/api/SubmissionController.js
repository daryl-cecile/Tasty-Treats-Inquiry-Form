"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var RouterWrapper_1 = require("../../internal/Tools/RouterWrapper");
var hCaptchaWrapper_1 = require("../../internal/Tools/hCaptchaWrapper");
var convenienceMethods_1 = require("../../internal/Tools/convenienceMethods");
var ResponseRepository_1 = require("../../internal/Tools/ResponseRepository");
exports.SubmissionController = new RouterWrapper_1.Controller("/api/submission", function (router) {
    router.onPOST("/send", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, full_name, message, email_address, subscribeChecked, captchaResponse, captchaResult;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, full_name = _a.full_name, message = _a.message, email_address = _a.email_address;
                    subscribeChecked = req.body['subscribe'];
                    captchaResponse = req.body['h-captcha-response'];
                    if (convenienceMethods_1.isVoid(full_name) || convenienceMethods_1.isVoid(message) || convenienceMethods_1.isVoid(email_address)) {
                        res.json(convenienceMethods_1.oResponse(false, "Information missing", {
                            body: req.body
                        }));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, hCaptchaWrapper_1.verify(captchaResponse)];
                case 1:
                    captchaResult = _b.sent();
                    console.log(captchaResult.data);
                    if (!captchaResult.isSuccessful) {
                        res.json(convenienceMethods_1.oResponse(false, "Captcha invalid", {
                            captchaData: captchaResult.data,
                            goto: "#reload"
                        }));
                        return [2 /*return*/];
                    }
                    ResponseRepository_1.ResponseRepository.writeNew({
                        userInfo: {
                            fullName: full_name,
                            emailAddress: email_address
                        },
                        isSubscribed: !!subscribeChecked,
                        message: message
                    });
                    // result doesnt need to wait for write completion
                    res.json(convenienceMethods_1.oResponse(true, "Message received", {
                        goto: "/thank-you"
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
});
//# sourceMappingURL=SubmissionController.js.map