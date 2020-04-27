"use strict";
exports.__esModule = true;
/**
 * Wrapper around express' Router to make path-based controllers easier to implement
 */
var Router = /** @class */ (function () {
    function Router(routePrefixOrExpressRouter, ExpressRouter) {
        var _this = this;
        this.routePrefix = undefined;
        this.onGET = function (path) {
            var handler = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                handler[_i - 1] = arguments[_i];
            }
            return _this.buildAction("get", path, handler);
        };
        this.onPOST = function (path) {
            var handler = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                handler[_i - 1] = arguments[_i];
            }
            return _this.buildAction("post", path, handler);
        };
        this.onDELETE = function (path) {
            var handler = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                handler[_i - 1] = arguments[_i];
            }
            return _this.buildAction("delete", path, handler);
        };
        if ((typeof routePrefixOrExpressRouter === "string" || routePrefixOrExpressRouter instanceof String) && ExpressRouter) {
            this.ExpressRouter = ExpressRouter;
            this.routePrefix = routePrefixOrExpressRouter;
        }
        else {
            this.ExpressRouter = routePrefixOrExpressRouter;
        }
    }
    Router.prototype.buildAction = function (method, path, handler) {
        var prefix = (this.routePrefix === undefined ? "/" : this.routePrefix);
        var finalPath;
        if (prefix !== "/") {
            if (prefix.endsWith("/") && path.startsWith("/")) {
                finalPath = prefix + path.substr(1);
            }
            else if (!prefix.endsWith("/") && !path.startsWith("/")) {
                finalPath = prefix + "/" + path;
            }
            else {
                finalPath = prefix + path;
            }
        }
        else {
            finalPath = path;
        }
        return (_a = this.ExpressRouter)[method].apply(_a, [finalPath].concat(handler));
        var _a;
    };
    Object.defineProperty(Router.prototype, "baseRouter", {
        get: function () {
            return this.ExpressRouter;
        },
        enumerable: true,
        configurable: true
    });
    Router.prototype.use = function (handler) {
        return this.ExpressRouter.use(handler);
    };
    return Router;
}());
exports.Router = Router;
var Controller = /** @class */ (function () {
    function Controller(controllerPathOrHandler, handler) {
        this.controllerPath = undefined;
        if (handler && (typeof controllerPathOrHandler === "string" || controllerPathOrHandler instanceof String)) {
            this.handler = handler;
            this.controllerPath = controllerPathOrHandler;
            if (!this.controllerPath.startsWith("/"))
                this.controllerPath = "/" + this.controllerPath;
        }
        else {
            this.handler = controllerPathOrHandler;
        }
    }
    Controller.prototype.getRouter = function (bExpressRouter) {
        var cPath = this.getControllerPath();
        var baseExpressRouter = bExpressRouter || new Router(cPath, require('express').Router());
        if (bExpressRouter)
            baseExpressRouter.routePrefix = cPath;
        return this.handler(baseExpressRouter);
    };
    Controller.prototype.path = function (route) {
        var cPath = this.getControllerPath();
        var prefix = (cPath === undefined ? "/" : cPath);
        var finalPath;
        if (prefix === "/") {
            finalPath = route;
        }
        else {
            if (!prefix.endsWith("/") && !route.startsWith("/")) {
                finalPath = prefix + "/" + route;
            }
            else if (prefix.endsWith("/") && route.startsWith("/")) {
                finalPath = prefix + route.substr(1);
            }
            else {
                finalPath = prefix + route;
            }
        }
        return finalPath;
    };
    Controller.prototype.getControllerPath = function () {
        return this.controllerPath === undefined ? "/" : this.controllerPath;
    };
    Controller.Loader = function (app) {
        var subdomain = require("express-subdomain");
        var loaders = {
            registerBaseControllers: function () {
                var routers = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    routers[_i] = arguments[_i];
                }
                routers.forEach(function (r) {
                    var hostRouter = r.getRouter();
                    app.use("/", hostRouter.baseRouter);
                });
                return loaders;
            },
            registerSubDomainController: function (sub, routers) {
                var hostRouter = undefined;
                routers.forEach(function (router) {
                    hostRouter = router.getRouter(hostRouter);
                });
                app.use(subdomain(sub, hostRouter.baseRouter));
                return loaders;
            }
        };
        return loaders;
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=RouterWrapper.js.map