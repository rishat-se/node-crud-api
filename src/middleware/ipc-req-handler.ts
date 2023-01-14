import { User, users } from '../data/in-memody-db.js';

export interface ipcReq {
    cmd: string;
    data: User;
}

export interface ipcRes {
    code: number
    data: User | User[] | string
}


//let dbLock = false;

export const ipcReqHandler = (ipcReq: ipcReq): ipcRes => {
    try {
        switch (ipcReq.cmd) {
            case 'readAll':
                return { code: 0, data: users.readAll() };
                break;
            case 'readById':
                return { code: 0, data: users.readById(ipcReq.data.id) };
                break;
            case 'create':
                users.create(ipcReq.data);
                return { code: 0, data: ipcReq.data };
                break;
            case 'update':
                users.update(ipcReq.data);
                return { code: 0, data: ipcReq.data };
                break;
            case 'delete':
                users.delete(ipcReq.data.id);
                return { code: 0, data: ipcReq.data };
                break;
            default:
                throw new Error('Internal Server Error. Invalid ipc command');
        }
    } catch (err) {
        if (err instanceof Error) {
            return { code: 1, data: err.message };
        } else {
            return { code: 1, data: String(err) };
        }
    }
}