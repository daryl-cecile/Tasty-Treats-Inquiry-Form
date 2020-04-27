"use strict";
exports.__esModule = true;
var BaseMiddleware = /** @class */ (function () {
    function BaseMiddleware() {
    }
    Object.defineProperty(BaseMiddleware, "instance", {
        get: function () {
            return this.initWith(null);
        },
        enumerable: true,
        configurable: true
    });
    BaseMiddleware.initWith = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var instance = new this();
        (_a = instance.initialize).call.apply(_a, [instance].concat(args));
        return instance.handlerFunction.bind(instance);
        var _a;
    };
    BaseMiddleware.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    BaseMiddleware.prototype.handlerFunction = function (req, res, next) {
        next(); // skip by default
    };
    return BaseMiddleware;
}());
exports.BaseMiddleware = BaseMiddleware;
//# sourceMappingURL=BaseMiddleware.js.map