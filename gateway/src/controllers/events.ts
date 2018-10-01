import { Request, Response } from "express";
import * as P from "bluebird";
import * as eventListMock from "./mocks/event-list-mock.json";
import { Event } from "../models";

export async function eventsGetByCountryAndCityHandler(req: Request, res: Response): P<any> {
    const country = req.swagger.params.country.value;
    const city = req.swagger.params.city.value;
    console.log("eventsGetByCountryAndCityHandler", country, city);
    console.log("eventListMock", eventListMock);
    res.send(eventListMock);
}

export async function eventsGetAllHandler(req: Request, res: Response): P<any> {
    console.log("eventsGetAllHandler");
    console.log("eventListMock", eventListMock);
    res.send(eventListMock);
}

export async function eventsPostHandler(req: Request, res: Response): P<any> {
    const event: Event = req.swagger.params.event.value;
    console.log("eventsPostHandler", event);
    res.send(event);
}
