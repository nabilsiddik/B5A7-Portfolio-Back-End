"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["DEACTIVATED"] = "DEACTIVATED";
    UserStatus["BLOCKED"] = "BLOCKED";
    UserStatus["RESTRICTRED"] = "RESTRICTED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
