"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promClient = require("prom-client");
require("../middlewares/swagger");
var responseTime = new promClient.Gauge({
    name: "last_response_time",
    help: "The time elapse of last http requests",
    labelNames: ["method", "path"]
});
var requestCount = new promClient.Counter({
    name: "request_count",
    help: "The request count since application starts",
    labelNames: ["method", "path"]
});
var responseStatCount = new promClient.Counter({
    name: "response_status",
    help: "The response status code since application starts",
    labelNames: ["method", "path", "statusCode"]
});
function requestWatch(req, res, next) {
    var labels = {
        method: req.method,
        path: req.path
    };
    var timer = responseTime.startTimer();
    requestCount.inc(labels);
    res.on("finish", function () {
        if (req.swagger) {
            labels.path = req.swagger.apiPath;
        }
        responseStatCount.inc({
            method: labels.method,
            path: labels.path,
            statusCode: res.statusCode
        });
        timer(labels);
    });
    next();
}
exports.requestWatch = requestWatch;
function reset() {
    responseTime.reset();
}
exports.reset = reset;
//# sourceMappingURL=mw.js.map