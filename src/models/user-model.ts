import { v4 as uuidv4, validate, version } from 'uuid';
import { users } from '../data/in-memody-db.js';
import { validateUserData } from '../validators/validate-userdata.js';

export const readRecAll = () => {
    return users.readAll();
}

export const readRecById = (id: string) => {
    if (validate(id) && version(id) === 4) {
        const user = users.readById(id);
        return user;
    } else {
        throw new Error('userId is invalid');
    }
}

export const createRec = (body: string) => {
    const userData = JSON.parse(body);
    validateUserData(userData);
    const newUser = { id: uuidv4(), ...userData };
    users.create(newUser);
    return newUser;
}

export const updateRec = (id: string, body: string) => {
    if (validate(id) && version(id) === 4) {
        const userData = JSON.parse(body);
        validateUserData(userData);
        const updUser = { id, ...userData };
        users.update(updUser);
        return updUser;
    } else {
        throw new Error('userId is invalid');
    }
}

export const deleteRecById = (id: string) => {
    if (validate(id) && version(id) === 4) {
        users.delete(id);
    } else {
        throw new Error('userId is invalid');
    }
}



