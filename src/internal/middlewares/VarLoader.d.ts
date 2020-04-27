import { BaseMiddleware } from "./BaseMiddleware";
export declare class VarLoader extends BaseMiddleware {
    private optionOrBuilder;
    protected initialize(optionOrBuilder: {
        [key: string]: any;
    } | Function): void;
    protected handlerFunction(req: any, res: any, next: any): Promise<void>;
}
