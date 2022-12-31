import http from 'node:http';
//import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './controllers/product-controller.js';
import { getUserAll, getUserById, createUser, updateUser, deleteUser } from './controllers/user-controller.js';


const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getUserAll(req, res);
    } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'GET') {
        getUserById(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'PUT') {
        updateUser(req, res);
    } else if (req.url.match(/\/api\/users\/.+/) && req.method === 'DELETE') {
        deleteUser(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Page Not Found' }));
    }
})

const PORT = 4000;
server.listen(PORT, () => console.log(`HTTP server is started and listening on port: ${PORT}`));
