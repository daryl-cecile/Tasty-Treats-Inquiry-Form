"use strict";
exports.__esModule = true;
function isUndefined(value) {
    return value === void 0;
}
exports.isUndefined = isUndefined;
function isVoid(value) {
    return value === null || isUndefined(value);
}
exports.isVoid = isVoid;
function oResponse(isSuccessful, message, data) {
    if (data === void 0) { data = {}; }
    return {
        isSuccessful: isSuccessful,
        message: message ?  ? (isSuccessful ? "Success" : "Error") :  : ,
        data: data ?  ? {}
            :
            :
    };
}
exports.oResponse = oResponse;
//# sourceMappingURL=convenienceMethods.js.map