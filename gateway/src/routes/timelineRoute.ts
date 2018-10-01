import { Router } from "express";
import { timelineGetByEventIdAndUserIdHandler, timelinePostHandler} from "../controllers/timeline";

export const timelineGetByEventIdAndUserId = Router().use("/", timelineGetByEventIdAndUserIdHandler);
export const timelinePost = Router().use("/", timelinePostHandler);
