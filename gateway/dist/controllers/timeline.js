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
var timelineListMock = require("./mocks/timeline-list-mock.json");
var rest_1 = require("../lib/rest");
var TIMELINE_SERVICE_NAME = process.env.TIMELINE_SERVICE_NAME;
var TIMELINE_SERVICE_PORT = process.env.TIMELINE_SERVICE_PORT || "8080";
function timelineGetByEventIdAndUserIdHandler(req, res) {
    return __awaiter(this, void 0, P, function () {
        var eventId, userId, result, path, carrier, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    eventId = req.swagger.params.eventId.value;
                    userId = req.swagger.params.userId.value;
                    console.log("timelineGetByEventIdAndUserIdHandler", eventId, userId);
                    console.log("TIMELINE_SERVICE_NAME", TIMELINE_SERVICE_NAME);
                    if (!TIMELINE_SERVICE_NAME) {
                        console.log("timelineListMock", timelineListMock);
                        return [2 /*return*/, res.send(timelineListMock)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    result = null;
                    path = null;
                    carrier = [];
                    if (!(eventId && userId)) return [3 /*break*/, 3];
                    path = "api/timeline/" + eventId + "/" + userId;
                    return [4 /*yield*/, rest_1.invokeService(carrier, TIMELINE_SERVICE_NAME, TIMELINE_SERVICE_PORT, path, "GET", null)];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    path = "api/timeline";
                    return [4 /*yield*/, rest_1.invokeService(carrier, TIMELINE_SERVICE_NAME, TIMELINE_SERVICE_PORT, path, "GET", null)];
                case 4:
                    result = _a.sent();
                    _a.label = 5;
                case 5:
                    console.log("result", result);
                    return [2 /*return*/, res.send(result)];
                case 6:
                    error_1 = _a.sent();
                    console.error("ERROR", error_1);
                    return [2 /*return*/, res.send(error_1)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.timelineGetByEventIdAndUserIdHandler = timelineGetByEventIdAndUserIdHandler;
function timelinePostHandler(req, res) {
    return __awaiter(this, void 0, P, function () {
        var timelineEntry, carrier, path, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timelineEntry = req.swagger.params.timelineEntry.value;
                    console.log("timelinePostHandler", timelineEntry);
                    res.send(timelineEntry);
                    console.log("TIMELINE_SERVICE_NAME", TIMELINE_SERVICE_NAME);
                    if (!TIMELINE_SERVICE_NAME) {
                        return [2 /*return*/, res.send(event)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    carrier = [];
                    path = "api/timeline";
                    return [4 /*yield*/, rest_1.invokeService(carrier, TIMELINE_SERVICE_NAME, TIMELINE_SERVICE_PORT, path, "POST", timelineEntry)];
                case 2:
                    result = _a.sent();
                    console.log("result", result);
                    return [2 /*return*/, res.send(result)];
                case 3:
                    error_2 = _a.sent();
                    console.error("ERROR", error_2);
                    return [2 /*return*/, res.send(error_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.timelinePostHandler = timelinePostHandler;
//# sourceMappingURL=timeline.js.map