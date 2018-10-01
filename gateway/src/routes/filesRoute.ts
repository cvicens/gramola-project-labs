import { Router } from "express";
import { filesPostHandler, filesGetHandler} from "../controllers/files";

// tslint:disable-next-line:max-line-length
export const filesPost = Router().use("/", filesPostHandler);
export const filesGet = Router().use("/", filesGetHandler);
