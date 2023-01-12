var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readRecAll, readRecById, createRec, updateRec, deleteRecById } from "../models/user-model.js";
import { getReqBody } from "../utils.js";
export const getUserAll = (res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(readRecAll()));
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        else
            console.log(String(err));
    }
};
export const getUserById = (req, res) => {
    try {
        if (req.url === undefined)
            throw new Error('Page not found');
        const id = req.url.split('/')[3];
        const user = readRecById(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
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
};
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield getReqBody(req);
        const newUser = createRec(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    }
    catch (err) {
        if (err instanceof Error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: err.message }));
        }
        else {
            console.log(String(err));
        }
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.url === undefined)
            throw new Error('Page not found');
        const id = req.url.split('/')[3];
        const body = yield getReqBody(req);
        const updUser = updateRec(id, body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updUser));
    }
    catch (err) {
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
        }
        else {
            console.log(String(err));
        }
    }
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.url === undefined)
            throw new Error('Page not found');
        const id = req.url.split('/')[3];
        deleteRecById(id);
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
                    console.log(err.message);
            }
        }
        else {
            console.log(String(err));
        }
    }
});
export const responseOnWrongUrl = (res) => __awaiter(void 0, void 0, void 0, function* () {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page Not Found' }));
});
