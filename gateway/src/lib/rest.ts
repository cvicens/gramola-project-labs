import * as P from "bluebird";
import * as request from "request-promise";

export async function invokeService(carrier, service, port, path, method, data): P<any>  {
    console.log("service:", service, "path:", path, "port", port, "method:", method, "data:", JSON.stringify(data));

    const serviceURI = "http://" + service + ":" + port + "/" + path;

    if (typeof service !== "undefined" && typeof method !== "undefined" && typeof data !== "undefined") {
        const options = {
            method,
            uri: serviceURI,
            json: true,
            headers: carrier,
            qs: null,
            body: null
        };
        if (method === "GET") {
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
