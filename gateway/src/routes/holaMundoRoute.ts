import { Router } from "express";
import { postHelloWorld} from "../controllers/hello";
import { asyncHandler } from "../lib/asyncHandler";

export const  holaMundoPost = Router().use("/", asyncHandler(postHelloWorld, "exchangeGet"));
