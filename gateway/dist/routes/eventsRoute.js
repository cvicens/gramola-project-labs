"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var events_1 = require("../controllers/events");
// tslint:disable-next-line:max-line-length
exports.eventsGetByCountryAndCity = express_1.Router().use("/", events_1.eventsGetByCountryAndCityHandler);
exports.eventsGetAll = express_1.Router().use("/", events_1.eventsGetAllHandler);
exports.eventsPost = express_1.Router().use("/", events_1.eventsPostHandler);
//# sourceMappingURL=eventsRoute.js.map