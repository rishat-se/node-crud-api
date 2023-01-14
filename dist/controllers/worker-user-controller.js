var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ipcReadRecAll, ipcReadRecById, ipcCreateRec, ipcUpdateRec, ipcDeleteRecById } from "../models/worker-user-model.js";
import { getReqBody } from "../utils.js";
export const workerGetUserAll = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ipcRes = yield ipcReadRecAll();
        if (ipcRes.code)
            throw new Error(ipcRes.data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
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
export const workerGetUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.url === undefined)
            throw new Error('Internal Server Error');
        const id = req.url.split('/')[3];
        const ipcRes = yield ipcReadRecById(id);
        if (ipcRes.code)
            throw new Error(ipcRes.data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    }
    catch (err) {
        if (err instanceof Error) {
            switch (err.message) {
                case 'userId is invalid':
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                case 'user not found':
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                default:
                    console.log(err.message);
            }
        }
        else {
            console.log(String(err));
        }
    }
});
export const workerCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield getReqBody(req);
        const ipcRes = yield ipcCreateRec(body);
        if (ipcRes.code)
            throw new Error(ipcRes.data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    }
    catch (err) {
        if (err instanceof Error) {
            switch (true) {
                case err.message.startsWith('Validation'):
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                default:
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
            }
        }
        else {
            console.log(String(err));
        }
    }
});
export const workerUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.url === undefined)
            throw new Error('Internal Server Error');
        const id = req.url.split('/')[3];
        const body = yield getReqBody(req);
        const ipcRes = yield ipcUpdateRec(id, body);
        if (ipcRes.code)
            throw new Error(ipcRes.data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    }
    catch (err) {
        if (err instanceof Error) {
            switch (true) {
                case err.message.includes('user not found'):
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                case err.message.startsWith('Validation'):
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                default:
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
            }
        }
        else {
            console.log(String(err));
        }
    }
});
export const workerDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.url === undefined)
            throw new Error('Internal Server Error');
        const id = req.url.split('/')[3];
        const ipcRes = yield ipcDeleteRecById(id);
        if (ipcRes.code)
            throw new Error(ipcRes.data);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    }
    catch (err) {
        if (err instanceof Error) {
            switch (err.message) {
                case 'userId is invalid':
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                case 'user not found':
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                default:
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
            }
        }
        else {
            console.log(String(err));
        }
    }
});
export const workerResponseOnWrongUrl = (res) => __awaiter(void 0, void 0, void 0, function* () {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page Not Found' }));
});
