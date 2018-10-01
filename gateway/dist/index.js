"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
var log_1 = require("./log");
var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8001;
application_1.default.listen(serverPort, function (err) {
    if (err) {
        return log_1.default.error(err);
    }
    return log_1.default.info("server is listening on " + serverPort);
});
//# sourceMappingURL=index.js.map