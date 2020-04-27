import {BaseMiddleware} from "./BaseMiddleware";

const _Cookies = require("cookies");
let _instance;

export class CookieWrapper extends BaseMiddleware{

    protected handlerFunction(req, res, next) {
        _instance = new _Cookies(req, res, { keys: ["9106FBE2-37CA-4F60-86AD-5616A5275E57"] });
        next();
    }

}

interface ICookieStoreSetOptions{
    /**
     * a number representing the milliseconds from Date.now() for expiry
     */
    maxAge?: number;
    /**
     * a Date object indicating the cookie's expiration
     * date (expires at the end of session by default).
     */
    expires?: Date;
    /**
     * a string indicating the path of the cookie (/ by default).
     */
    path?: string;
    /**
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;
    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    secure?: boolean;
    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S),
     * and not made available to client JavaScript (true by default).
     */
    httpOnly?: boolean;
    /**
     * a boolean indicating whether to overwrite previously set
     * cookies of the same name (false by default).
     */
    overwrite?: boolean;
}

export const Cookies = {
    get(cookieName:string):string|undefined{
        return _instance.get(cookieName, {signed: true});
    },
    set(name:string, value:string, options?:ICookieStoreSetOptions){

        let defaultOptions = Object.assign({
            httpOnly: false,
            secure: false,
            path: "/",
            overwrite: false
        }, options);

        defaultOptions['signed'] = true;
        defaultOptions['sameSite'] = 'strict';

        _instance.set(name,value, defaultOptions);
        return this;
    },
    del(name:string){
        _instance.set(name);
        return this;
    }
}