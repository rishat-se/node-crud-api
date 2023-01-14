
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
}

export interface UserData {
    username: string,
    age: number,
    hobbies: string[]
}

export const validateUserData = (userData: UserData) => {
    if (typeof userData !== userDataSchema['type']) throw new Error('Validation error: invalid object format');
    for (const item of userDataSchema['required']) {
        if (!userData.hasOwnProperty(item)) throw new Error(`Validation error: ${item} field is missing`);
    }
    if (Object.keys(userDataSchema).length !== Object.keys(userData).length) throw new Error('Validation error: invalid number of fields');
    for (const prop in userDataSchema['properties']) {
        if (userDataSchema['properties'][prop as keyof UserData].type === 'array') {
            if (userData[prop as keyof UserData].constructor !== Array) throw new Error(`Validation error: ${prop} field has invalid type. Please, enter in ${userDataSchema['properties'][prop as keyof UserData].type} format`);
        } else if (typeof userData[prop as keyof UserData] !== userDataSchema['properties'][prop as keyof UserData].type) {
            throw new Error(`Validation error: ${prop} field has invalid type. Please, enter in ${userDataSchema['properties'][prop as keyof UserData].type} format`);
        }
    }
    for (const item of userData.hobbies) {
        if (typeof item !== userDataSchema['properties']['hobbies']['items'].type) throw new Error('Validation error: one of items of hobbies field has invalid type');
    }
}

