import http from 'node:http';
import { getUserAll, getUserById, createUser, updateUser, deleteUser, responseOnWrongUrl } from './controllers/user-controller.js';
import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { loadBalanceReq } from './middleware/load-balancer.js';
dotenv.config();
if (process.env.PORT === undefined) {
    console.log('PORT is undefined. Please check .env file');
    process.exit(1);
}
const PORT = +process.env.PORT;
const numCPUs = cpus().length;
if (cluster.isPrimary) {
    const lbServer = http.createServer((req, res) => {
        loadBalanceReq(req, res, PORT);
    });
    lbServer.listen(PORT, () => console.log(`Load Balancing HTTP server ( pid: ${process.pid} ) is started and listening on port: ${PORT}`));
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: PORT + i + 1 });
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    const server = http.createServer((req, res) => {
        console.log(`Worker ${process.pid} on ${PORT} processing request`);
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
    server.listen(PORT, () => console.log(`Worker HTTP server ( pid: ${process.pid} ) is started and listening on port: ${PORT}`));
}
