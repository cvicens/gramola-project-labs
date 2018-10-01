"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var timeline_1 = require("../controllers/timeline");
exports.timelineGetByEventIdAndUserId = express_1.Router().use("/", timeline_1.timelineGetByEventIdAndUserIdHandler);
exports.timelinePost = express_1.Router().use("/", timeline_1.timelinePostHandler);
//# sourceMappingURL=timelineRoute.js.map