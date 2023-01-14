import { IncomingMessage, ServerResponse } from "http";
import { ipcReadRecAll, ipcReadRecById, ipcCreateRec, ipcUpdateRec, ipcDeleteRecById } from "../models/worker-user-model.js";
import { getReqBody } from "../utils.js";

export const workerGetUserAll = async (res: ServerResponse) => {
    try {
        const ipcRes = await ipcReadRecAll();
        if (ipcRes.code) throw new Error(ipcRes.data as string)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    } catch (err) {
        if (err instanceof Error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        } else {
            console.log(String(err));
        }
    }
}

export const workerGetUserById = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url === undefined) throw new Error('Internal Server Error');
        const id: string = req.url.split('/')[3];
        const ipcRes = await ipcReadRecById(id);
        if (ipcRes.code) throw new Error(ipcRes.data as string);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    } catch (err) {
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
        } else {
            console.log(String(err));
        }
    }
}

export const workerCreateUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getReqBody(req);
        const ipcRes = await ipcCreateRec(body);
        if (ipcRes.code) throw new Error(ipcRes.data as string);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    } catch (err) {
        if (err instanceof Error) {
            switch (true) {
                case err.message.startsWith('Validation'):
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                default:
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
            }
        } else {
            console.log(String(err));
        }
    }
}


export const workerUpdateUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url === undefined) throw new Error('Internal Server Error');
        const id = req.url.split('/')[3];
        const body = await getReqBody(req);
        const ipcRes = await ipcUpdateRec(id, body);
        if (ipcRes.code) throw new Error(ipcRes.data as string);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ipcRes.data));
    } catch (err) {
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
        } else {
            console.log(String(err));
        }
    }
}

export const workerDeleteUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url === undefined) throw new Error('Internal Server Error');
        const id = req.url.split('/')[3];
        const ipcRes = await ipcDeleteRecById(id);
        if (ipcRes.code) throw new Error(ipcRes.data as string)
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
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
        } else {
            console.log(String(err));
        }
    }
}

export const workerResponseOnWrongUrl = async (res: ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page Not Found' }));
}
