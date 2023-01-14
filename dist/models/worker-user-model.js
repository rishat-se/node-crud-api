var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cluster from 'cluster';
import { v4 as uuidv4, validate, version } from 'uuid';
import { validateUserData } from '../validators/validate-userdata.js';
const ipcResPromise = () => {
    return new Promise((resolve, reject) => {
        if (cluster.worker === undefined)
            throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.once('message', (msg) => resolve(msg));
        cluster.worker.once('error', (err) => reject(err));
    });
};
export const ipcReadRecAll = () => {
    if (cluster.worker === undefined)
        throw new Error('Internal Server Error. cluster.worker is undefined');
    cluster.worker.send({ cmd: 'readAll', data: {} });
    return ipcResPromise();
};
export const ipcReadRecById = (id) => {
    if (validate(id) && version(id) === 4) {
        if (cluster.worker === undefined)
            throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.send({ cmd: 'readById', data: { id } });
        return ipcResPromise();
    }
    else {
        throw new Error('userId is invalid');
    }
};
export const ipcCreateRec = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = JSON.parse(body);
    validateUserData(userData);
    const newUser = Object.assign({ id: uuidv4() }, userData);
    if (cluster.worker === undefined)
        throw new Error('Internal Server Error. cluster.worker is undefined');
    cluster.worker.send({ cmd: 'create', data: newUser });
    return ipcResPromise();
});
export const ipcUpdateRec = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (validate(id) && version(id) === 4) {
        const userData = JSON.parse(body);
        validateUserData(userData);
        const updUser = Object.assign({ id }, userData);
        if (cluster.worker === undefined)
            throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.send({ cmd: 'update', data: updUser });
        return ipcResPromise();
    }
    else {
        throw new Error('userId is invalid');
    }
});
export const ipcDeleteRecById = (id) => {
    if (validate(id) && version(id) === 4) {
        if (cluster.worker === undefined)
            throw new Error('Internal Server Error. cluster.worker is undefined');
        cluster.worker.send({ cmd: 'delete', data: { id } });
        return ipcResPromise();
    }
    else {
        throw new Error('userId is invalid');
    }
};
