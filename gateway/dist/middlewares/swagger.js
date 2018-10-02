"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swaggerTools = require("swagger-tools");
var fs_1 = require("fs");
var YAML = require("js-yaml");
var isProd = (process.env.NODE_ENV === "production");
function loadDocumentSync(file) {
    return YAML.load(fs_1.readFileSync(file));
}
exports.initSwaggerMiddlware = function (app, basePath, cb) {
    var swaggerDoc = loadDocumentSync(basePath + "/definition/swagger.yaml");
    var options = {
        controllers: basePath + "/routes",
        ignoreMissingHandlers: true,
        useStubs: false,
        validateResponse: true
    };
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerMetadata());
        // Validate Swagger requests
        app.use(middleware.swaggerValidator({}));
        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter(options));
        if (!isProd) {
            // Serve the Swagger documents and Swagger UI
            app.use(middleware.swaggerUi());
        }
        cb();
    });
};
//# sourceMappingURL=swagger.js.map