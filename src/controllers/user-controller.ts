import { IncomingMessage, ServerResponse } from "http";
import { readRecAll, readRecById, createRec, updateRec, deleteRecById } from "../models/user-model.js";
import { getReqBody } from "../utils.js";

export const getUserAll = (res: ServerResponse) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(readRecAll()));
    } catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        else
            console.log(String(err));
    }
}

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url === undefined) throw new Error('Page not found');
        const id: string = req.url.split('/')[3];
        const user = readRecById(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
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

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getReqBody(req);
        const newUser = createRec(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } catch (err) {
        if (err instanceof Error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        } else {
            console.log(String(err));
        }
    }
}


export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url === undefined) throw new Error('Page not found');
        const id = req.url.split('/')[3];
        const body = await getReqBody(req);
        const updUser = updateRec(id, body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updUser));
    } catch (err) {
        if (err instanceof Error) {
            switch (err.message) {
                case 'user not found':
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
                    break;
                default:
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: err.message }));
            }
        } else {
            console.log(String(err));
        }
    }
}

export const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (req.url === undefined) throw new Error('Page not found');
        const id = req.url.split('/')[3];
        deleteRecById(id);
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
                    console.log(err.message);
            }
        } else {
            console.log(String(err));
        }
    }
}

export const responseOnWrongUrl = async (res: ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page Not Found' }));
}
