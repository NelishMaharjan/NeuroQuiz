const request = require('supertest');
require('dotenv').config();

const BASE_URL = `http://localhost:3000`;

describe('NeuroQuiz API Integration Tests', () => {
     
    it('should register a new user successfully', async () => {
        const uniqueUsername = `testuser_${Date.now()}`;
        const uniqueEmail = `testemail_${Date.now()}@gmail.com`;

        const res = await request(BASE_URL)
            .post('/api/user/register')
            .send({
                username: uniqueUsername,
                email: uniqueEmail,
                password: 'password123'
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User added successfully');
        expect(res.body.user.email).toBe(uniqueEmail);
    });

    it('should fail login with wrong credentials', async () => {
        const res = await request(BASE_URL)
            .post('/api/user/login')
            .send({
                email: 'wrong@email.com',
                password: 'wrongpassword'
            });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid email or password');
    });
});  