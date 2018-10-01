import { Router } from "express";
import { eventsGetByCountryAndCityHandler, eventsGetAllHandler, eventsPostHandler} from "../controllers/events";

// tslint:disable-next-line:max-line-length
export const eventsGetByCountryAndCity = Router().use("/", eventsGetByCountryAndCityHandler);
export const eventsGetAll = Router().use("/", eventsGetAllHandler);
export const eventsPost = Router().use("/", eventsPostHandler);
