import { Request, Response } from "express";
import * as P from "bluebird";

import * as eventListMock from "./mocks/event-list-mock.json";
import { Event } from "../models";

import { invokeService } from "../lib/rest";

const EVENTS_SERVICE_NAME = process.env.EVENTS_SERVICE_NAME;
const EVENTS_SERVICE_PORT = process.env.EVENTS_SERVICE_PORT || "8080";

export async function eventsGetByCountryAndCityHandler(req: Request, res: Response): P<any> {
    const country = req.swagger.params.country.value;
    const city = req.swagger.params.city.value;
    console.log("eventsGetByCountryAndCityHandler", country, city);

    console.log("EVENTS_SERVICE_NAME", EVENTS_SERVICE_NAME);

    if (!EVENTS_SERVICE_NAME) {
        console.log("eventListMock", eventListMock);
        return res.send(eventListMock);
    }

    try {
        let result = null;
        let path = null;
        const carrier = [];
        if (country && city) {
            path = "api/events/" + country + "/" + city;
            result = await invokeService(carrier, EVENTS_SERVICE_NAME, EVENTS_SERVICE_PORT, path, "GET", null);
        } else {
            path = "api/events";
            result = await invokeService(carrier, EVENTS_SERVICE_NAME, EVENTS_SERVICE_PORT, path, "GET", null);
        }
        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    }
}

export async function eventsGetAllHandler(req: Request, res: Response): P<any> {
    console.log("eventsGetAllHandler");
    console.log("eventListMock", eventListMock);

    if (!EVENTS_SERVICE_NAME) {
        console.log("eventListMock", eventListMock);
        return res.send(eventListMock);
    }

    try {
        const carrier = [];
        const path = "api/events";
        const result = await invokeService(carrier, EVENTS_SERVICE_NAME, EVENTS_SERVICE_PORT, path, "GET", null);

        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    }
}

export async function eventsPostHandler(req: Request, res: Response): P<any> {
    const event: Event = req.swagger.params.event.value;
    console.log("eventsPostHandler", event);

    if (!EVENTS_SERVICE_NAME) {
        return res.send(event);
    }

    try {
        const carrier = [];
        const path = "api/events";
        const result = await invokeService(carrier, EVENTS_SERVICE_NAME, EVENTS_SERVICE_PORT, path, "POST", event);

        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    }
}
