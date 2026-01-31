const request = require('supertest');
require('dotenv').config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

describe('Open API Tests', () => {
     
    it ('should create a new user without an image', async () => {
        const uniqueUsername = `testuser_${Date.now()}`;
        const uniqueEmail = `testemail_${Date.now()}@gmail.com`;

        const res = await request(BASE_URL)
            .post('/api/user')
            .send({
                username: uniqueUsername,
                email: uniqueEmail,
                password: 'test@1234'
            });

            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('User created successfully');
            expect(res.body.user.email).toBe(uniqueEmail);
    }
    );
});  