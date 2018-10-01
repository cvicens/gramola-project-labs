"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.set = set;
var def = {
    "LOG_LEVEL": "silly",
    "CORS": "*"
};
var dynamic = {};
function get(key) {
    return typeof dynamic[key] !== "undefined" ?
        dynamic[key] :
        typeof process.env[key] !== "undefined" ? process.env[key] : def[key];
}
exports.get = get;
function set(key, val) {
    dynamic[key] = val;
}
exports.set = set;
function checkEnv() {
    var log = require("./log").default;
    for (var key in def) {
        if (process.env[key] === undefined) {
            log.warn("Env var " + key + " is not set. Default will be used: " + def[key]);
        }
    }
}
exports.checkEnv = checkEnv;
//# sourceMappingURL=env.js.map