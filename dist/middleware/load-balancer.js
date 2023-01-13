var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import http from "http";
import { getReqBody } from "../utils.js";
let lbCounter = 1;
const sendReqToWorker = (req, body, workerPort) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: workerPort,
            path: req.url,
            method: req.method,
            headers: req.headers
        };
        const lbReq = http.request(options, (lbRes) => {
            let lbBody = '';
            lbRes.on('data', (chunk) => lbBody += chunk);
            lbRes.on('end', () => { resolve({ lbRes, lbBody }); });
            lbRes.on('error', (err) => { reject(err); });
        });
        lbReq.write(body);
        lbReq.end();
        lbReq.on('error', (err) => { reject(err); });
    });
};
export const loadBalanceReq = (req, res, PORT) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Round Robin Port Calculation
        const workerPort = PORT + lbCounter;
        lbCounter < 8 ? lbCounter++ : lbCounter = 1;
        const body = yield getReqBody(req);
        const { lbRes, lbBody } = yield sendReqToWorker(req, body, workerPort);
        if (lbRes.statusCode === undefined)
            throw new Error('Status Code of Worker Response is Undefined');
        res.writeHead(lbRes.statusCode, lbRes.headers);
        res.end(lbBody);
    }
    catch (err) {
        if (err instanceof Error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
        else {
            console.log(String(err));
        }
    }
});
