import http from 'node:http';
import { getUserAll, getUserById, createUser, updateUser, deleteUser, responseOnWrongUrl } from './controllers/user-controller.js';
const server = http.createServer((req, res) => {
    if (req.url !== undefined) {
        if (req.url === '/api/users' && req.method === 'GET') {
            getUserAll(res);
        }
        else if (req.url.match(/\/api\/users\/.+/) && req.method === 'GET') {
            getUserById(req, res);
        }
        else if (req.url === '/api/users' && req.method === 'POST') {
            createUser(req, res);
        }
        else if (req.url.match(/\/api\/users\/.+/) && req.method === 'PUT') {
            updateUser(req, res);
        }
        else if (req.url.match(/\/api\/users\/.+/) && req.method === 'DELETE') {
            deleteUser(req, res);
        }
        else {
            responseOnWrongUrl(res);
        }
    }
    else {
        responseOnWrongUrl(res);
    }
});
const PORT = 4000;
server.listen(PORT, () => console.log(`HTTP server is started and listening on port: ${PORT}`));
