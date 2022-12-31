import { v4 as uuidv4, validate, version } from 'uuid';
import { users } from '../data/in-memody-db.js';

export const readRecAll = () => {
    return users.readAll();
}

export const readRecById = (id) => {
    if (validate(id) && version(id) === 4) {
        const user = users.readById(id);
        return user;
    } else {
        throw new Error('userId is invalid');
    }
}

export const createRec = (body) => {
    const userData = JSON.parse(body);
    //validate here and throw new Error('fields are missing or invalid')
    const newUser = { id: uuidv4(), ...userData };
    users.create(newUser);
    return newUser;
}

export const updateRec = (id, body) => {
    if (validate(id) && version(id) === 4) {
        const userData = JSON.parse(body);
        //validate here and throw new Error('fields are missing or invalid')
        const updUser = { id, ...userData };
        users.update(updUser);
        return updUser;
    } else {
        throw new Error('userId is invalid');
    }
}

export const deleteRecById = (id) => {
    if (validate(id) && version(id) === 4) {
        const user = users.delete(id);
    } else {
        throw new Error('userId is invalid');
    }
}



