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
var winston = require("winston");
var Debug = require("debug");
var env = require("./env");
var cls_1 = require("./lib/cls");
var P = require("bluebird");
var perfy = require("perfy");
var FesDebug = /** @class */ (function () {
    function FesDebug(namespace) {
        this.debugger = Debug(namespace);
    }
    FesDebug.prototype.log = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logger.apply(this, [Levels.Log, formatter].concat(args));
    };
    FesDebug.prototype.error = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logger.apply(this, [Levels.Error, formatter].concat(args));
    };
    FesDebug.prototype.warn = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logger.apply(this, [Levels.Warn, formatter].concat(args));
    };
    FesDebug.prototype.verbose = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logger.apply(this, [Levels.Verbose, formatter].concat(args));
    };
    FesDebug.prototype.silly = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logger.apply(this, [Levels.Silly, formatter].concat(args));
    };
    FesDebug.prototype.start = function (label) {
        perfy.start(cls_1.getRequestId() + "." + label);
    };
    FesDebug.prototype.end = function (label) {
        var selector = cls_1.getRequestId() + "." + label;
        if (perfy.exists(selector)) {
            var result = perfy.end(cls_1.getRequestId() + "." + label);
            this.logger(Levels.Log, label + " executed in " + result.time + " sec.");
        }
    };
    FesDebug.prototype.logger = function (level, formatter) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var message = cls_1.getRequestId() ? cls_1.getRequestId() + " " + level + " " + formatter : formatter;
        this.debugger.apply(this, [message].concat(args));
    };
    return FesDebug;
}());
exports.FesDebug = FesDebug;
var debug = new FesDebug("fes:src:lib:log");
var Levels;
(function (Levels) {
    Levels["Log"] = "LOG";
    Levels["Error"] = "ERROR";
    Levels["Warn"] = "WARN";
    Levels["Verbose"] = "VERBOSE";
    Levels["Info"] = "INFO";
    Levels["Debug"] = "DEBUG";
    Levels["Silly"] = "SILLY";
})(Levels = exports.Levels || (exports.Levels = {}));
function inOutLogger(req, res, next) {
    return __awaiter(this, void 0, P, function () {
        var reqLog, oldWrite, oldEnd, chunks, cleanup, logFn, abortFn, errorFn;
        return __generator(this, function (_a) {
            reqLog = {
                method: req.method,
                originalUrl: req.originalUrl,
                requestId: req.requestId,
                headers: req.headers,
                params: req.query
            };
            debug.log("Incoming Request: %O", reqLog);
            oldWrite = res.write;
            oldEnd = res.end;
            chunks = [];
            res.write = function () {
                var restArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    restArgs[_i] = arguments[_i];
                }
                if (restArgs[0] && chunks.length === 0) {
                    chunks.push(new Buffer(restArgs[0]));
                }
                oldWrite.apply(res, restArgs);
                return true;
            };
            res.end = function () {
                var restArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    restArgs[_i] = arguments[_i];
                }
                if (restArgs[0]) {
                    chunks.push(new Buffer(restArgs[0]));
                }
                oldEnd.apply(res, restArgs);
                logFn();
            };
            cleanup = function () {
                res.removeListener("close", abortFn);
                res.removeListener("error", errorFn);
            };
            logFn = function () {
                cleanup();
                var body = Buffer.concat(chunks).toString("utf8");
                var resLog = {
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    contentLength: res.get("Content-Length") || 0,
                    contentType: res.get("Content-Type"),
                    body: body,
                    headers: res.getHeaders ? res.getHeaders() : undefined // Added in 7.7.0
                };
                if (resLog.statusCode >= 500) {
                    debug.error("Outgoing Response: %O", resLog);
                }
                else if (resLog.statusCode >= 400) {
                    debug.warn("Outgoing Response: %O", resLog);
                }
                else {
                    debug.log("Outgoing Response: %O", resLog);
                }
            };
            abortFn = function () {
                cleanup();
                debug.warn("Request aborted by the client");
            };
            errorFn = function (err) {
                cleanup();
                debug.error("Request pipeline error: " + err);
            };
            res.on("close", abortFn); // aborted pipeline
            res.on("error", errorFn); // pipeline internal error
            next();
            return [2 /*return*/];
        });
    });
}
exports.inOutLogger = inOutLogger;
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
            "level": env.get("LOG_LEVEL")
        })
    ]
});
exports.default = logger;
//# sourceMappingURL=log.js.map