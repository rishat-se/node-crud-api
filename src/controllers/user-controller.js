import { readRecAll, readRecById, createRec, updateRec, deleteRecById } from "../models/user-model.js";
import { getReqBody } from "../utils.js";

export const getUserAll = (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(readRecAll()));
    } catch (err) {
        console.log(err.message);
    }
}

export const getUserById = (req, res) => {
    try {
        const id = req.url.split('/')[3];
        const user = readRecById(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } catch (err) {
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
}

export const createUser = async (req, res) => {
    try {
        const body = await getReqBody(req);
        const newUser = createRec(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Can not create new User' }));
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.url.split('/')[3];
        const body = await getReqBody(req);
        const updUser = updateRec(id, body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updUser));
    } catch (err) {
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
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.url.split('/')[3];
        deleteRecById(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
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
}