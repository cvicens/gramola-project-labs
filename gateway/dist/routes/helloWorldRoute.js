"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var hello_1 = require("../controllers/hello");
exports.helloWorldGet = express_1.Router().use("/", hello_1.getHelloWorld);
exports.helloWorldPost = express_1.Router().use("/", hello_1.postHelloWorld);
//# sourceMappingURL=helloWorldRoute.js.map