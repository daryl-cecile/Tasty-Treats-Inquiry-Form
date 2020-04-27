import { BaseMiddleware } from "./BaseMiddleware";
export declare class CookieWrapper extends BaseMiddleware {
    protected handlerFunction(req: any, res: any, next: any): void;
}
interface ICookieStoreSetOptions {
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
export declare const Cookies: {
    get(cookieName: string): string;
    set(name: string, value: string, options?: ICookieStoreSetOptions): any;
    del(name: string): any;
};
export {};
