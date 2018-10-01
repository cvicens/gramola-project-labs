"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var files_1 = require("../controllers/files");
// tslint:disable-next-line:max-line-length
exports.filesPost = express_1.Router().use("/", files_1.filesPostHandler);
exports.filesGet = express_1.Router().use("/", files_1.filesGetHandler);
//# sourceMappingURL=filesRoute.js.map