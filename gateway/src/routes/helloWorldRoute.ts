import { Router } from "express";
import { getHelloWorld, postHelloWorld} from "../controllers/hello";
import { asyncHandler } from "../lib/asyncHandler";

export const   helloWorldGet = Router().use("/", asyncHandler(getHelloWorld, "exchangeGet"));
export const   helloWorldPost = Router().use("/", asyncHandler(postHelloWorld, "exchangeGet"));
