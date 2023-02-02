import cluster from 'cluster';
import { v4 as uuidv4, validate, version } from 'uuid';
import { validateUserData } from '../validators/validate-userdata.js';
import { ipcReq, ipcRes } from '../middleware/ipc-req-handler.js';

const ipcResPromise = (): Promise<ipcRes> => {
    return new Promise((resolve, reject) => {
        if (cluster.worker === undefined) throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.once('message', (msg) => resolve(msg));
        cluster.worker.once('error', (err) => reject(err));
    })
}

export const ipcReadRecAll = () => {
    if (cluster.worker === undefined) throw new Error('Internal Server Error. cluster.worker is undefined');
    cluster.worker.send({ cmd: 'readAll', data: {} } as ipcReq);
    return ipcResPromise();
}

export const ipcReadRecById = (id: string) => {
    if (validate(id) && version(id) === 4) {
        if (cluster.worker === undefined) throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.send({ cmd: 'readById', data: { id } } as ipcReq);
        return ipcResPromise();
    } else {
        throw new Error('userId is invalid');
    }
}

export const ipcCreateRec = async (body: string) => {
    const userData = JSON.parse(body);
    validateUserData(userData);
    const newUser = { id: uuidv4(), ...userData };
    if (cluster.worker === undefined) throw new Error('Internal Server Error. cluster.worker is undefined');
    cluster.worker.send({ cmd: 'create', data: newUser } as ipcReq);
    return ipcResPromise();
}

export const ipcUpdateRec = async (id: string, body: string) => {
    if (validate(id) && version(id) === 4) {
        const userData = JSON.parse(body);
        validateUserData(userData);
        const updUser = { id, ...userData };
        if (cluster.worker === undefined) throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.send({ cmd: 'update', data: updUser } as ipcReq);
        return ipcResPromise();
    } else {
        throw new Error('userId is invalid');
    }
}

export const ipcDeleteRecById = (id: string) => {
    if (validate(id) && version(id) === 4) {
        if (cluster.worker === undefined) throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.send({ cmd: 'delete', data: { id } } as ipcReq);
        return ipcResPromise();
    } else {
        throw new Error('userId is invalid');
    }
}