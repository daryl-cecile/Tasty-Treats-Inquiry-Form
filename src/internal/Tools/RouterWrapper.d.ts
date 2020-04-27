/// <reference types="express" />
import { Express as ExpressRouter } from "express";
import { IRouterMatcher } from "express-serve-static-core";
/**
 * Wrapper around express' Router to make path-based controllers easier to implement
 */
export declare class Router {
    routePrefix: string;
    private readonly ExpressRouter;
    constructor(ExpressRouter: ExpressRouter);
    constructor(routePrefix: string, ExpressRouter: ExpressRouter);
    private buildAction(method, path, handler);
    readonly baseRouter: ExpressRouter;
    use(handler: any): ExpressRouter;
    onGET: IRouterMatcher<any>;
    onPOST: IRouterMatcher<any>;
    onDELETE: IRouterMatcher<any>;
}
export declare class Controller {
    private readonly controllerPath;
    private readonly handler;
    constructor(handler: (route: Router) => Router);
    constructor(controllerPath: string, handler: (route: Router) => Router);
    getRouter(bExpressRouter?: Router): Router;
    path(route: string): string;
    getControllerPath(): string;
    static Loader(app: any): {
        registerBaseControllers: (...routers: Controller[]) => any;
        registerSubDomainController: (sub: string, routers: Controller[]) => any;
    };
}
