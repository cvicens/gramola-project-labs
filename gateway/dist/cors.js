"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = require("./env");
function getCorsOptions() {
    if (env.get("CORS") !== "*") {
        var whiteList = void 0;
        whiteList = env.get("CORS").split(",");
        console.log("CORS whitelist:", whiteList);
        return { origin: whiteList };
    }
    else {
        console.log("CORS whitelist: *");
        return { origin: env.get("CORS") };
    }
}
exports.getCorsOptions = getCorsOptions;
//# sourceMappingURL=cors.js.map