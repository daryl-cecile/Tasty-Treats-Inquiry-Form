import {BaseMiddleware} from "./BaseMiddleware";


export class VarLoader extends BaseMiddleware{
    private optionOrBuilder;

    protected initialize(optionOrBuilder:{[key:string]:any}|Function) {
        this.optionOrBuilder = optionOrBuilder;
    }

    protected async handlerFunction(req, res, next) {
        let options = typeof(this.optionOrBuilder) === "function" ? await this.optionOrBuilder.call(req, res) : this.optionOrBuilder;
        for (const k of Object.keys(options)) {
            res.locals[k] = typeof(options[k]) === "function" ? await options[k].call(null, req, res) : options[k];
        }
        next();
    }

}