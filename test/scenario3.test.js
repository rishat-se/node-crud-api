const request = require('supertest');

const host = 'http://localhost:4000';

const user = {
    username: 'Wednesday Addams',
    age: 22,
    hobbies: ['archery']
}

const WRONG_FIELD_NAME_USER = {
    wrongname: 'Wednesday Addams',
    age: 22,
    hobbies: ['archery']
}

const WRONG_FIELD_TYPE_USER = {
    username: 'Wednesday Addams',
    age: 22,
    hobbies: 1000
}

const MISSING_FIELD_USER = {
    username: 'Wednesday Addams',
    age: 22
}

let id = '';

test('send POST request to create user with wrong field name and receive 400 in response', async () => {
    const response = await request(host).post('/api/users').send(WRONG_FIELD_NAME_USER);
    expect(response.statusCode).toBe(400);
});

test('send POST request to create user with wrong field type and receive 400 in response', async () => {
    const response = await request(host).post('/api/users').send(WRONG_FIELD_TYPE_USER);
    expect(response.statusCode).toBe(400);
});

test('send POST request to create user with missing field and receive 400 in response', async () => {
    const response = await request(host).post('/api/users').send(MISSING_FIELD_USER);
    expect(response.statusCode).toBe(400);
});

test('send POST request to create user and receive created record in response', async () => {
    const response = await request(host).post('/api/users').send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual(expect.objectContaining(user));
    id = response.body.id;
});


test('send PUT request to update user with wrong field name and receive 400 in response', async () => {
    const response = await request(host).put(`/api/users/${id}`).send(WRONG_FIELD_NAME_USER);
    expect(response.statusCode).toBe(400);
});

test('send PUT request to create user with wrong field type and receive 400 in response', async () => {
    const response = await request(host).put(`/api/users/${id}`).send(WRONG_FIELD_TYPE_USER);
    expect(response.statusCode).toBe(400);
});

test('send PUT request to create user with missing field and receive 400 in response', async () => {
    const response = await request(host).put(`/api/users/${id}`).send(MISSING_FIELD_USER);
    expect(response.statusCode).toBe(400);
});

user.age = 14;

test('send PUT request to update record by id and receive updated record in response', async () => {
    const response = await request(host).put(`/api/users/${id}`).send(user)
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(id);
    expect(response.body).toEqual(expect.objectContaining(user));
});

test('send DELETE request to delete record by valid id and receive response confirming deletion', async () => {
    const response = await request(host).delete(`/api/users/${id}`).send('')
    expect(response.statusCode).toBe(204);
});
