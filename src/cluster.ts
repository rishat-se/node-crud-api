import http, { IncomingMessage, ServerResponse } from 'node:http';
import { } from './controllers/user-controller.js';
import { workerGetUserAll, workerGetUserById, workerCreateUser, workerUpdateUser, workerDeleteUser, workerResponseOnWrongUrl } from './controllers/worker-user-controller.js';
import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { loadBalanceReq } from './middleware/load-balancer.js';
import { ipcReqHandler } from './middleware/ipc-req-handler.js';

dotenv.config();

if (process.env.PORT === undefined) {
    console.log('PORT is undefined. Please check .env file');
    process.exit(1);
}

const PORT = +process.env.PORT;

const numCPUs = cpus().length;

if (cluster.isPrimary) {

    const lbServer = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        loadBalanceReq(req, res, PORT);
    })

    lbServer.listen(PORT, () => console.log(`Load Balancing HTTP server ( pid: ${process.pid} ) is started and listening on port: ${PORT}`));

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: PORT + i + 1 });
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    for (const id in cluster.workers) {
        const worker = cluster.workers[id];
        worker && worker.on('message', (ipcRec) => {
            const ipcRes = ipcReqHandler(ipcRec);
            worker.send(ipcRes);
        })
    }

} else {

    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        console.log(`Worker ${process.pid} on ${PORT} processing request`);
        if (req.url !== undefined) {
            if (req.url === '/api/users' && req.method === 'GET') {
                workerGetUserAll(res);
            } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'GET') {
                workerGetUserById(req, res);
            } else if (req.url === '/api/users' && req.method === 'POST') {
                workerCreateUser(req, res);
            } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'PUT') {
                workerUpdateUser(req, res);
            } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'DELETE') {
                workerDeleteUser(req, res);
            } else {
                workerResponseOnWrongUrl(res);
            }
        } else {
            workerResponseOnWrongUrl(res);
        }
    })

    server.listen(PORT, () => console.log(`Worker HTTP server ( pid: ${process.pid} ) is started and listening on port: ${PORT}`));

}
