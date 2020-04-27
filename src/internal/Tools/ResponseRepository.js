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
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var ResponseRepository;
(function (ResponseRepository) {
    var responsesFolder = path.resolve(__dirname, "../../../responses");
    function initId(input) {
        input.timestamp = Date.now().toString();
        input.id = Array(10).slice().map(function (_) { return (~~(Math.random() * 36)).toString(36); }).join('');
    }
    function writeNew(input) {
        initId(input);
        var responseLocation = path.resolve(responsesFolder, input.id + ".txt");
        return new Promise(function (resolve) {
            fs.writeFile(responseLocation, [
                "From: " + input.userInfo.fullName,
                "Email: " + input.userInfo.emailAddress,
                "Subscribed: " + (input.isSubscribed ? "true" : "false"),
                "Timestamp: " + input.timestamp,
                "<>",
                input.message
            ].join('\n'), { encoding: "utf8" }, resolve);
        });
    }
    ResponseRepository.writeNew = writeNew;
    function getById(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var result = {
                            userInfo: {
                                fullName: "",
                                emailAddress: ""
                            }
                        };
                        fs.readFile(path.resolve(responsesFolder, id + ".txt"), { encoding: "utf8" }, function (err, content) {
                            var separatorIndex = content.indexOf("<>");
                            var message = content.substr(separatorIndex + 2); //message is everything after separator
                            var lines = content.substr(0, separatorIndex).split("\n");
                            lines.forEach(function (line) {
                                if (line.startsWith("From: "))
                                    result.userInfo.fullName = line.split("From: ")[1];
                                if (line.startsWith("Email: "))
                                    result.userInfo.emailAddress = line.split("Email: ")[1];
                                if (line.startsWith("Timestamp: "))
                                    result.timestamp = line.split("Timestamp: ")[1];
                                if (line.startsWith("Subscribed: "))
                                    result.isSubscribed = line.split("Subscribed: ")[1] === "true";
                            });
                            result.message = message.trim();
                            result.id = id;
                            resolve(result);
                        });
                    })];
            });
        });
    }
    ResponseRepository.getById = getById;
    function getAll() {
        return __awaiter(this, void 0, void 0, function () {
            var files, responses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = fs.readdirSync(responsesFolder, { encoding: "utf8", withFileTypes: true });
                        return [4 /*yield*/, Promise.all(files.filter(function (f) {
                                return f.isFile();
                            }).map(function (f) {
                                return getById(f.name.split('.')[0]);
                            }))];
                    case 1:
                        responses = _a.sent();
                        return [2 /*return*/, responses.sort(function (x, y) {
                                return Number(y.timestamp) - Number(x.timestamp);
                            })];
                }
            });
        });
    }
    ResponseRepository.getAll = getAll;
})(ResponseRepository = exports.ResponseRepository || (exports.ResponseRepository = {}));
//# sourceMappingURL=ResponseRepository.js.map