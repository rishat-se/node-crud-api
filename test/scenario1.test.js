const request = require('supertest');

const host = 'http://localhost:4000';

const user = {
    username: 'John Doe',
    age: 32,
    hobbies: ['skates']
}

let id = '';

test('send GET request to receive all records and receive empty array', async () => {
    const response = await request(host).get('/api/users').send('')
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});

test('send POST request to create user and receive created record in response', async () => {
    const response = await request(host).post('/api/users').send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual(expect.objectContaining(user));
    id = response.body.id;
});

test('send GET request to receive record by id and receive record in response', async () => {
    const response = await request(host).get(`/api/users/${id}`).send('')
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(id);
    expect(response.body).toEqual(expect.objectContaining(user));
});

user.age = 30;
user.hobbies = ['chess', 'hiking'];

test('send PUT request to update record by id and receive updated record in response', async () => {
    const response = await request(host).put(`/api/users/${id}`).send(user)
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(id);
    expect(response.body).toEqual(expect.objectContaining(user));
});

test('send DELETE request to delete record by id and receive response confirming deletion', async () => {
    const response = await request(host).delete(`/api/users/${id}`).send('')
    expect(response.statusCode).toBe(204);
});

test('send GET request to receive deleted record by id and receive fail response', async () => {
    const response = await request(host).get(`/api/users/${id}`).send('')
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('user not found');
});


