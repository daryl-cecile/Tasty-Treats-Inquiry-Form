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
var _Cookies = require("cookies");
var _instance;
var CookieWrapper = /** @class */ (function (_super) {
    __extends(CookieWrapper, _super);
    function CookieWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CookieWrapper.prototype.handlerFunction = function (req, res, next) {
        _instance = new _Cookies(req, res, { keys: ["9106FBE2-37CA-4F60-86AD-5616A5275E57"] });
        next();
    };
    return CookieWrapper;
}(BaseMiddleware_1.BaseMiddleware));
exports.CookieWrapper = CookieWrapper;
exports.Cookies = {
    get: function (cookieName) {
        return _instance.get(cookieName, { signed: true });
    },
    set: function (name, value, options) {
        var defaultOptions = Object.assign({
            httpOnly: false,
            secure: false,
            path: "/",
            overwrite: false
        }, options);
        defaultOptions['signed'] = true;
        defaultOptions['sameSite'] = 'strict';
        _instance.set(name, value, defaultOptions);
        return this;
    },
    del: function (name) {
        _instance.set(name);
        return this;
    }
};
//# sourceMappingURL=CookieWrapper.js.map