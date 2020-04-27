
export function isUndefined(value:any){
    return value === void 0;
}

export function isVoid(value:any){
    return value === null || isUndefined(value);
}

export function oResponse(isSuccessful:boolean, message?:string, data:any = {}){
    return {
        isSuccessful,
        message: message ?? (isSuccessful ? "Success" : "Error"),
        data: data ?? {}
    }
}