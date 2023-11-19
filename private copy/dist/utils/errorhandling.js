"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordMissMatchError = exports.UserNotExistError = void 0;
class UserNotExistError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, UserNotExistError.prototype);
    }
}
exports.UserNotExistError = UserNotExistError;
class UserPasswordMissMatchError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, UserPasswordMissMatchError.prototype);
    }
}
exports.UserPasswordMissMatchError = UserPasswordMissMatchError;
//# sourceMappingURL=errorhandling.js.map