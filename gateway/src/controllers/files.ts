import { Request, Response } from "express";
import * as P from "bluebird";
import { FileResponse } from "../models";

import { invokeService } from "../lib/rest";

const FILES_SERVICE_NAME = process.env.FILES_SERVICE_NAME;
const FILES_SERVICE_PORT = process.env.FILES_SERVICE_PORT || "8080";

const UPLOAD_DIR = process.env.UPLOAD_DIR || __dirname + "/../samples/";

export async function filesGetHandler(req: Request, res: Response): P<any> {
    const fileId = req.swagger.params.fileId.value;
    console.log("filesGetHandler", fileId);

    if (!FILES_SERVICE_NAME) {
        return res.sendFile(fileId, { root: UPLOAD_DIR });
    }

    /* try {
        const carrier = [];
        const path = "api/files/" + fileId;
        const result = await invokeService(carrier, FILES_SERVICE_NAME, FILES_SERVICE_PORT, path, "GET", null, true);

        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    } */

    const carrier = [];
    const path = "api/files/" + fileId;
    invokeService(carrier, FILES_SERVICE_NAME, FILES_SERVICE_PORT, path, "GET", null, true)
    .then(result => {
        console.log("result", result);
        console.log("content-type", result.headers["content-type"]);

        /*res.writeHead(200, {
            "Content-Type": result.headers["content-type"],
            "Content-disposition": "attachment;filename=" + fileId,
            "Content-Length": result.data.length
        });
        return res.end(new Buffer(result.data, "binary"));*/

        // res.contentType(result.headers["content-type"]);
        // return res.end(result.data, "binary");

        res.set("Content-Type", result.headers["content-type"]);
        return res.send(result.body);
    })
    .catch(error => {
        console.error("ERROR", error);
        return res.send(error);
    });
}

// TODO invokeService cannot handle formData multipart... so far....
export async function filesPostHandler(req: Request, res: Response): P<any> {
    console.log("naming_strategy", req.swagger.params.naming_strategy.value);
    console.log("file.encoding", req.swagger.params.file.value.encoding);
    console.log("file.fieldname", req.swagger.params.file.value.fieldname);
    console.log("file.mimetype", req.swagger.params.file.value.mimetype);
    console.log("file.originalname", req.swagger.params.file.value.originalname);
    console.log("file.size", req.swagger.params.file.value.size);

    if (!FILES_SERVICE_NAME) {
        const result: FileResponse = { result: "success", filename: req.swagger.params.file.value.originalname };
        return res.send(result);
    }

    try {
        const carrier = [];
        const path = "api/files";
        const result = await invokeService(carrier, FILES_SERVICE_NAME, FILES_SERVICE_PORT, path, "POST", null);

        console.log("result", result);
        return res.send(result);
    } catch (error) {
        console.error("ERROR", error);
        return res.send(error);
    }
}
