"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promClient = require("prom-client");
var mw_1 = require("./mw");
var pkg = require("../../package.json");
function init(app) {
    promClient.register.setDefaultLabels({
        fes: pkg.name,
        version: pkg.version
    });
    promClient.collectDefaultMetrics({ timeout: 30000 });
    app.get("/metrics", function (req, res) {
        res.end(promClient.register.metrics());
        mw_1.reset();
    });
    app.use(mw_1.requestWatch);
}
exports.init = init;
//# sourceMappingURL=init.js.map