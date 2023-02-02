import http, { IncomingMessage, ServerResponse } from 'node:http';
import { getUserAll, getUserById, createUser, updateUser, deleteUser, responseOnWrongUrl } from './controllers/user-controller.js';
import * as dotenv from 'dotenv';

dotenv.config();



const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url !== undefined) {
        if (req.url === '/api/users' && req.method === 'GET') {
            getUserAll(res);
        } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'GET') {
            getUserById(req, res);
        } else if (req.url === '/api/users' && req.method === 'POST') {
            createUser(req, res);
        } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'PUT') {
            updateUser(req, res);
        } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'DELETE') {
            deleteUser(req, res);
        } else {
            responseOnWrongUrl(res);
        }
    } else {
        responseOnWrongUrl(res);
    }
})

server.listen(process.env.PORT, () => console.log(`HTTP server is started and listening on port: ${process.env.PORT}`));
