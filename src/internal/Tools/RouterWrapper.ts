import {RequestHandler, Express as ExpressRouter} from "express";
import {IRouterMatcher} from "express-serve-static-core";

/**
 * Wrapper around express' Router to make path-based controllers easier to implement
 */

export class Router{

    public routePrefix:string = undefined;
    private readonly ExpressRouter:ExpressRouter;

    constructor(ExpressRouter:ExpressRouter)
    constructor(routePrefix:string ,ExpressRouter:ExpressRouter)
    constructor(routePrefixOrExpressRouter:string|ExpressRouter, ExpressRouter?:ExpressRouter) {
        if ((typeof routePrefixOrExpressRouter === "string" || <any>routePrefixOrExpressRouter instanceof String) && ExpressRouter){
            this.ExpressRouter = ExpressRouter;
            this.routePrefix = <string>routePrefixOrExpressRouter;
        }
        else{
            this.ExpressRouter = <ExpressRouter>routePrefixOrExpressRouter;
        }
    }

    private buildAction(method:string, path:string, handler:RequestHandler[]){
        let prefix = (this.routePrefix=== undefined ? "/" : this.routePrefix);
        let finalPath:string;
        if (prefix !== "/"){
            if (prefix.endsWith("/") && path.startsWith("/")){
                finalPath = prefix + path.substr(1);
            }
            else if (!prefix.endsWith("/") && !path.startsWith("/")){
                finalPath = prefix + "/" + path;
            }
            else {
                finalPath = prefix + path;
            }
        }
        else{
            finalPath = path;
        }

        return this.ExpressRouter[method](finalPath, ...handler);
    }

    public get baseRouter():ExpressRouter{
        return this.ExpressRouter;
    }

    public use(handler){
        return this.ExpressRouter.use(handler);
    }

    public onGET:IRouterMatcher<any> = (path,...handler)=>{
        return this.buildAction("get", path, handler);
    };

    public onPOST:IRouterMatcher<any> = (path,...handler)=>{
        return this.buildAction("post", path, handler);
    };

    public onDELETE:IRouterMatcher<any> = (path,...handler)=>{
        return this.buildAction("delete", path, handler);
    };
}

export class Controller {

    private readonly controllerPath: string = undefined;
    private readonly handler: (route: Router) => Router;

    constructor(handler: (route: Router) => Router)
    constructor(controllerPath: string, handler: (route: Router) => Router)
    constructor(controllerPathOrHandler: string | ((route: Router) => Router), handler?: (route: Router) => Router) {
        if (handler && (typeof controllerPathOrHandler === "string" || controllerPathOrHandler instanceof String)) {
            this.handler = handler;
            this.controllerPath = <string>controllerPathOrHandler;
            if (!this.controllerPath.startsWith("/")) this.controllerPath = "/" + this.controllerPath;
        } else {
            this.handler = <any>controllerPathOrHandler;
        }
    }

    public getRouter(bExpressRouter?: Router): Router {
        let cPath = this.getControllerPath();
        let baseExpressRouter = bExpressRouter || new Router(cPath, require('express').Router());
        if (bExpressRouter) baseExpressRouter.routePrefix = cPath;
        return this.handler(baseExpressRouter);
    }

    public path(route: string): string {
        let cPath = this.getControllerPath();
        let prefix = (cPath === undefined ? "/" : cPath);
        let finalPath: string;
        if (prefix === "/") {
            finalPath = route;
        } else {
            if (!prefix.endsWith("/") && !route.startsWith("/")) {
                finalPath = prefix + "/" + route;
            } else if (prefix.endsWith("/") && route.startsWith("/")) {
                finalPath = prefix + route.substr(1);
            } else {
                finalPath = prefix + route;
            }
        }
        return finalPath;
    }

    public getControllerPath() {
        return this.controllerPath === undefined ? "/" : this.controllerPath;
    }

    public static Loader(app) {
        const subdomain = require("express-subdomain");
        let loaders = {
            registerBaseControllers: (...routers: Controller[]) => {
                routers.forEach(r => {
                    let hostRouter = r.getRouter();
                    app.use("/", hostRouter.baseRouter);
                });
                return loaders;
            },
            registerSubDomainController: (sub: string, routers: Controller[]) => {
                let hostRouter: Router = undefined;
                routers.forEach(router => {
                    hostRouter = router.getRouter(hostRouter);
                });
                app.use(subdomain(sub, hostRouter.baseRouter));

                return loaders;
            }
        };

        return loaders;
    }
}