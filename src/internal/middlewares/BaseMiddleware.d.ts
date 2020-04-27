/// <reference types="express" />
import { Request, Response } from "express";
export declare class BaseMiddleware {
    static readonly instance: any;
    static initWith(...args: any): any;
    protected initialize(...args: any[]): void;
    protected handlerFunction(req: Request, res: Response, next: any): void;
}
