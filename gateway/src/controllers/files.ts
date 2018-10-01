import { Request, Response } from "express";
import * as P from "bluebird";
import { FileResponse } from "../models";

const UPLOAD_DIR = process.env.UPLOAD_DIR || __dirname + "/../samples/";

export async function filesGetHandler(req: Request, res: Response): P<any> {
    const fileId = req.swagger.params.fileId.value;
    console.log("filesGetHandler", fileId);
    res.sendFile(fileId, { root: UPLOAD_DIR });
}

export async function filesPostHandler(req: Request, res: Response): P<any> {
    console.log("naming_strategy", req.swagger.params.naming_strategy.value);
    console.log("file.encoding", req.swagger.params.file.value.encoding);
    console.log("file.fieldname", req.swagger.params.file.value.fieldname);
    console.log("file.mimetype", req.swagger.params.file.value.mimetype);
    console.log("file.originalname", req.swagger.params.file.value.originalname);
    console.log("file.size", req.swagger.params.file.value.size);

    const result: FileResponse = { result: "success", filename: req.swagger.params.file.value.originalname };
    res.send(result);
}
