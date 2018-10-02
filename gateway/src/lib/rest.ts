import * as P from "bluebird";
import * as request from "request-promise";
import { Options } from "request-promise";

export async function invokeService(carrier, service, port, path, method, data = null, binary = false): P<any>  {
    console.log("service:", service, "path:", path, "port", port, "method:", method, "data:", JSON.stringify(data));

    const serviceURI = "http://" + service + ":" + port + "/" + path;

    if (service && method) {
        const options: Options = {
            method,
            uri: serviceURI,
            // headers: carrier,
            json: true
        };

        if (binary) {
            options.json = false;
            options.encoding = null;
            options.resolveWithFullResponse = true;
        }
        if (method === "GET" && data) {
            options.qs = data;
        } else if (method === "POST") {
            options.body = data;
        }

        return request(options);
    }
    return new P<any>((resolve, reject) => {
        reject({ result: "ERROR", msg: "WRONG_DATA" });
    });
}
