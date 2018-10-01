"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as bodyParser from "body-parser";
var cors = require("cors");
var express = require("express");
var path_1 = require("path");
var swagger_1 = require("./middlewares/swagger");
var env = require("./env");
// import { inOutLogger } from "./log";
var monit = require("./monitoring");
// import * as cls from "./lib/cls";
var cors_1 = require("./cors");
env.checkEnv();
var app = express();
exports.default = app;
monit.init(app);
app.use(cors(cors_1.getCorsOptions()));
// app.use(cls.setRequestId);
// app.use(inOutLogger);
app.use("/api/greeting", function (request, response) {
    var name = request.query ? request.query.name : undefined;
    response.send({ content: "Hello, " + (name || "World!") });
});
swagger_1.initSwaggerMiddlware(app, path_1.resolve(__dirname), function () {
    // Custom error handler that returns JSON
    app.use(function (err, req, res, next) {
        if (err) {
            var errStr = err.message || err.toString();
            var errMsg = { message: errStr, extra: err };
            if (res.statusCode < 400) {
                res.status(500);
            }
            res.json(errMsg);
        }
    });
});
//# sourceMappingURL=application.js.map