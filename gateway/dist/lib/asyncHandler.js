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
var log_1 = require("../log");
var log_2 = require("../log");
var debug = new log_2.FesDebug("fes:src:lib:asyncHandler");
function asyncHandler(handler, name, options) {
    debug.log("Register handler with option: %o", options);
    return function (req, res, next) {
        function exec() {
            return __awaiter(this, void 0, P, function () {
                var item, e_1, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            debug.start("SERVICE:" + name);
                            if (!(options && options.cache)) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, getCache(req)];
                        case 2:
                            item = _a.sent();
                            if (item) {
                                return [2 /*return*/, item.data];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            log_1.default.error(e_1);
                            console.error(e_1.stack);
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, handler(req, res, next)];
                        case 5:
                            data = _a.sent();
                            if (data && options && options.cache) {
                                cache(req, {
                                    data: data,
                                    expTs: Date.now() + options.cacheLive ? options.cacheLive : 3600000
                                });
                            }
                            return [2 /*return*/, data];
                    }
                });
            });
        }
        exec()
            .then(function (data) {
            debug.end("SERVICE:" + name);
            if (data) {
                res.json(data);
            }
            else if (!res.finished) {
                debug.log("no more response to send, status code: %d", res.statusCode);
                res.end();
            }
        }, function (error) {
            debug.end("SERVICE:" + name);
            next(error);
        });
    };
}
exports.asyncHandler = asyncHandler;
var cachedData = {};
// TODO use cache server
function cache(req, item) {
    return __awaiter(this, void 0, P, function () {
        var fullUrl;
        return __generator(this, function (_a) {
            fullUrl = getUrl(req);
            debug.log("Set cache: %s data: %o", fullUrl, item);
            cachedData[fullUrl] = item;
            return [2 /*return*/];
        });
    });
}
// async function hasCache(req: express.Request): P<boolean> {
//   const fullUrl = getUrl(req);
//   return typeof cachedData[fullUrl] !== "undefined";
// }
function getCache(req) {
    return __awaiter(this, void 0, P, function () {
        var fullUrl, data;
        return __generator(this, function (_a) {
            fullUrl = getUrl(req);
            debug.log("Get cache: %s", fullUrl);
            data = cachedData[fullUrl];
            if (data && data.expTs < Date.now()) {
                debug.log("Cache expired: %s", fullUrl);
                delete cachedData[fullUrl];
                return [2 /*return*/];
            }
            else {
                debug.log("Hit cache: %s", fullUrl);
                return [2 /*return*/, data];
            }
            return [2 /*return*/];
        });
    });
}
function getUrl(req) {
    return req.protocol + "://" + req.get("host") + req.originalUrl;
}
//# sourceMappingURL=asyncHandler.js.map