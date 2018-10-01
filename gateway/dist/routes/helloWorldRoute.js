"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var hello_1 = require("../controllers/hello");
var asyncHandler_1 = require("../lib/asyncHandler");
exports.helloWorldGet = express_1.Router().use("/", asyncHandler_1.asyncHandler(hello_1.getHelloWorld, "exchangeGet"));
exports.helloWorldPost = express_1.Router().use("/", asyncHandler_1.asyncHandler(hello_1.postHelloWorld, "exchangeGet"));
//# sourceMappingURL=helloWorldRoute.js.map