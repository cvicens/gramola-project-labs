import { Router } from "express";
import { getHelloWorld, postHelloWorld} from "../controllers/hello";

export const   helloWorldGet = Router().use("/", getHelloWorld);
export const   helloWorldPost = Router().use("/", postHelloWorld);
