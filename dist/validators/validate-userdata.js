const userDataSchema = {
    type: 'object',
    required: ['username', 'age', 'hobbies'],
    properties: {
        username: { type: 'string' },
        age: { type: 'number' },
        hobbies: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }
};
export const validateUserData = (userData) => {
    if (typeof userData !== userDataSchema['type'])
        throw new Error('invalid object format');
    for (const item of userDataSchema['required']) {
        if (!userData.hasOwnProperty(item))
            throw new Error(`${item} field is missing`);
    }
    if (Object.keys(userDataSchema).length !== Object.keys(userData).length)
        throw new Error('invalid number of fields');
    for (const prop in userDataSchema['properties']) {
        if (userDataSchema['properties'][prop].type === 'array') {
            if (userData[prop].constructor !== Array)
                throw new Error(`${prop} field has invalid type. Please, enter in ${userDataSchema['properties'][prop].type} format`);
        }
        else if (typeof userData[prop] !== userDataSchema['properties'][prop].type) {
            throw new Error(`${prop} field has invalid type. Please, enter in ${userDataSchema['properties'][prop].type} format`);
        }
    }
    for (const item of userData.hobbies) {
        if (typeof item !== userDataSchema['properties']['hobbies']['items'].type)
            throw new Error('one of items of hobbies field has invalid type');
    }
};
