const request = require('supertest');
require('dotenv').config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

// describe('Open API Tests', () => {
     
//     it ('should create a new user without an image', async () => {
//         const uniqueUsername = `testuser_${Date.now()}`;
//         const uniqueEmail = `testemail_${Date.now()}@gmail.com`;

//         const res = await request(BASE_URL)
//             .post('/api/users')
//             .send({
//                 username: uniqueUsername,
//                 email: uniqueEmail,
//                 password: 'Test@1234'
//             });

// });  