"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var P = require("bluebird");
var rest_1 = require("../lib/rest");
var FILES_SERVICE_NAME = process.env.FILES_SERVICE_NAME;
var FILES_SERVICE_PORT = process.env.FILES_SERVICE_PORT || "8080";
var UPLOAD_DIR = process.env.UPLOAD_DIR || __dirname + "/../samples/";
function filesGetHandler(req, res) {
    return __awaiter(this, void 0, P, function () {
        var fileId, carrier, path;
        return __generator(this, function (_a) {
            fileId = req.swagger.params.fileId.value;
            console.log("filesGetHandler", fileId);
            if (!FILES_SERVICE_NAME) {
                return [2 /*return*/, res.sendFile(fileId, { root: UPLOAD_DIR })];
            }
            carrier = [];
            path = "api/files/" + fileId;
            rest_1.invokeService(carrier, FILES_SERVICE_NAME, FILES_SERVICE_PORT, path, "GET", null, true)
                .then(function (result) {
                console.log("result", result);
                console.log("content-type", result.headers["content-type"]);
                /*res.writeHead(200, {
                    "Content-Type": result.headers["content-type"],
                    "Content-disposition": "attachment;filename=" + fileId,
                    "Content-Length": result.data.length
                });
                return res.end(new Buffer(result.data, "binary"));*/
                // res.contentType(result.headers["content-type"]);
                // return res.end(result.data, "binary");
                res.set("Content-Type", result.headers["content-type"]);
                return res.send(result.body);
            })
                .catch(function (error) {
                console.error("ERROR", error);
                return res.send(error);
            });
            return [2 /*return*/];
        });
    });
}
exports.filesGetHandler = filesGetHandler;
// TODO invokeService cannot handle formData multipart... so far....
function filesPostHandler(req, res) {
    return __awaiter(this, void 0, P, function () {
        var result, carrier, path, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("naming_strategy", req.swagger.params.naming_strategy.value);
                    console.log("file.encoding", req.swagger.params.file.value.encoding);
                    console.log("file.fieldname", req.swagger.params.file.value.fieldname);
                    console.log("file.mimetype", req.swagger.params.file.value.mimetype);
                    console.log("file.originalname", req.swagger.params.file.value.originalname);
                    console.log("file.size", req.swagger.params.file.value.size);
                    if (!FILES_SERVICE_NAME) {
                        result = { result: "success", filename: req.swagger.params.file.value.originalname };
                        return [2 /*return*/, res.send(result)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    carrier = [];
                    path = "api/files";
                    return [4 /*yield*/, rest_1.invokeService(carrier, FILES_SERVICE_NAME, FILES_SERVICE_PORT, path, "POST", null)];
                case 2:
                    result = _a.sent();
                    console.log("result", result);
                    return [2 /*return*/, res.send(result)];
                case 3:
                    error_1 = _a.sent();
                    console.error("ERROR", error_1);
                    return [2 /*return*/, res.send(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.filesPostHandler = filesPostHandler;
//# sourceMappingURL=files.js.map