import { Request, Response } from "express";
import * as P from "bluebird";
import * as timelineListMock from "./mocks/timeline-list-mock.json";
import { TimelineEntry } from "../models";

export async function timelineGetByEventIdAndUserIdHandler(req: Request, res: Response): P<any> {
    const eventId = req.swagger.params.eventId.value;
    const userId = req.swagger.params.userId.value;
    console.log("timelineGetByEventIdAndUserIdHandler", eventId, userId);
    console.log("timelineListMock", timelineListMock);
    res.send(timelineListMock);
}

export async function timelinePostHandler(req: Request, res: Response): P<any> {
    const timelineEntry: TimelineEntry = req.swagger.params.timelineEntry.value;
    console.log("timelinePostHandler", timelineEntry);
    res.send(timelineEntry);
}
