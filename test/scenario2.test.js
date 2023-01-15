const request = require('supertest');

const host = 'http://localhost:4000';

const user = {
    username: 'Marry Doe',
    age: 27,
    hobbies: ['coding']
}

let id = '';
const NONEXISTENT_ID = '6dc8cf2b-fafd-417f-a57a-16b5385dfd6c';
const INVALID_ID = 'id-gone-wrong';

test('send GET request to receive nonexistent record by id and receive 404 response', async () => {
    const response = await request(host).get(`/api/users/${NONEXISTENT_ID}`).send('')
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('user not found');
});

test('send POST request to create user and receive created record in response', async () => {
    const response = await request(host).post('/api/users').send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual(expect.objectContaining(user));
    id = response.body.id;
});

user.age = 26;

test('send PUT request to update nonexistent record by id and receive 404 response', async () => {
    const response = await request(host).put(`/api/users/${NONEXISTENT_ID}`).send(user)
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('user not found');
});

test('send PUT request to update record by id and receive updated record in response', async () => {
    const response = await request(host).put(`/api/users/${id}`).send(user)
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(id);
    expect(response.body).toEqual(expect.objectContaining(user));
});

test('send DELETE request to delete nonexistent record by id and receive 404 response', async () => {
    const response = await request(host).delete(`/api/users/${NONEXISTENT_ID}`).send('')
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('user not found');
});

test('send DELETE request to delete record by invalid id and receive 400 response', async () => {
    const response = await request(host).delete(`/api/users/${INVALID_ID}`).send('')
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('userId is invalid');
});

test('send DELETE request to delete record by valid id and receive response confirming deletion', async () => {
    const response = await request(host).delete(`/api/users/${id}`).send('')
    expect(response.statusCode).toBe(204);
});