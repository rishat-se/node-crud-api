import http, { IncomingMessage, ServerResponse } from "http";
import { getReqBody } from "../utils.js";


let lbCounter = 1;

const sendReqToWorker = (req: IncomingMessage, body: string, workerPort: number): Promise<{ lbRes: IncomingMessage; lbBody: string; }> => {

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: workerPort,
            path: req.url,
            method: req.method,
            headers: req.headers
        }

        const lbReq = http.request(options, (lbRes) => {
            let lbBody = '';
            lbRes.on('data', (chunk) => lbBody += chunk);
            lbRes.on('end', () => { resolve({ lbRes, lbBody }) })
            lbRes.on('error', (err) => { reject(err) });
        });

        lbReq.write(body);
        lbReq.end();
        lbReq.on('error', (err) => { reject(err) });
    })
}

export const loadBalanceReq = async (req: IncomingMessage, res: ServerResponse, PORT: number) => {
    try {
        // Round Robin Port Calculation
        const workerPort = PORT + lbCounter;
        lbCounter < 8 ? lbCounter++ : lbCounter = 1;

        const body = await getReqBody(req);

        const { lbRes, lbBody } = await sendReqToWorker(req, body, workerPort);
        if (lbRes.statusCode === undefined) throw new Error('Status Code of Worker Response is Undefined');

        res.writeHead(lbRes.statusCode, lbRes.headers);
        res.end(lbBody);

    } catch (err) {
        if (err instanceof Error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        } else {
            console.log(String(err));
        }
    }
}
