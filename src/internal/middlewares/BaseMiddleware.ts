import {Request, Response} from "express";

export class BaseMiddleware{

    public static get instance(){
        return this.initWith(null);
    }

    public static initWith(...args:any){
        let instance = new this();
        instance.initialize.call(instance, ...args);
        return instance.handlerFunction.bind(instance);
    }

    protected initialize(...args:any[]){ }

    protected handlerFunction(req:Request, res:Response, next){
        next(); // skip by default
    }

}