"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
// import log from "./log";
var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080;
application_1.default.listen(serverPort, function (err) {
    if (err) {
        return console.error(err);
    }
    return console.info("server is listening on " + serverPort);
});
//# sourceMappingURL=index.js.map