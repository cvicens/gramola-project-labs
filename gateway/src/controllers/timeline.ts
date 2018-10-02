import { Request, Response } from "express";
import * as P from "bluebird";
import * as timelineListMock from "./mocks/timeline-list-mock.json";
import { TimelineEntry } from "../models";

import { invokeService } from "../lib/rest";

const TIMELINE_SERVICE_NAME = process.env.TIMELINE_SERVICE_NAME;
const TIMELINE_SERVICE_PORT = process.env.TIMELINE_SERVICE_PORT || "8080";

export async function timelineGetByEventIdAndUserIdHandler(req: Request, res: Response): P<any> {
    const eventId = req.swagger.params.eventId.value;
    const userId = req.swagger.params.userId.value;
    console.log("timelineGetByEventIdAndUserIdHandler", eventId, userId);

    console.log("TIMELINE_SERVICE_NAME", TIMELINE_SERVICE_NAME);

    if (!TIMELINE_SERVICE_NAME) {
        console.log("timelineListMock", timelineListMock);
        return res.send(timelineListMock);
    }

    try {
        let result = null;
        let path = null;
        const carrier = [];
        if (eventId && userId) {
            path = "api/timeline/" + eventId + "/" + userId;
            result = await invokeService(carrier, TIMELINE_SERVICE_NAME, TIMELINE_SERVICE_PORT, path, "GET", null);
        } else {
            path = "api/timeline";
            result = await invokeService(carrier, TIMELINE_SERVICE_NAME, TIMELINE_SERVICE_PORT, path, "GET", null);
        }
        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    }
}

export async function timelinePostHandler(req: Request, res: Response): P<any> {
    const timelineEntry: TimelineEntry = req.swagger.params.timelineEntry.value;
    console.log("timelinePostHandler", timelineEntry);
    res.send(timelineEntry);

    console.log("TIMELINE_SERVICE_NAME", TIMELINE_SERVICE_NAME);

    if (!TIMELINE_SERVICE_NAME) {
        return res.send(event);
    }

    try {
        const carrier = [];
        const path = "api/timeline";
        // tslint:disable-next-line:max-line-length
        const result = await invokeService(carrier, TIMELINE_SERVICE_NAME, TIMELINE_SERVICE_PORT, path, "POST", timelineEntry);

        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    }
}
