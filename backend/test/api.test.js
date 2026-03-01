const request = require('supertest');
require('dotenv').config();

const BASE_URL = `http://localhost:3000`;

describe('NeuroQuiz API Integration Tests (Comprehensive Suite)', () => {
    let testUser = {
        username: `testuser_${Date.now()}`,
        email: `testemail_${Date.now()}@gmail.com`,
        password: 'password123'
    };
    let testToken = '';
    let testUserId = null;
    let testQuestionId = null;

    // 1. User Registration
    it('1. should register a new user successfully', async () => {
        const res = await request(BASE_URL)
            .post('/api/user/register')
            .send(testUser);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User added successfully');
        testUserId = res.body.user.id;
    });

    // 2. Prevent Duplicate Registration
    it('2. should not allow duplicate user registration', async () => {
        const res = await request(BASE_URL)
            .post('/api/user/register')
            .send(testUser);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User already exists');
    });

    // 3. User Login
    it('3. should log in successfully and return a token', async () => {
        const res = await request(BASE_URL)
            .post('/api/user/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Login successful');
        expect(res.body).toHaveProperty('token');
        testToken = res.body.token;
    });

    // 4. Invalid Login
    it('4. should fail login with incorrect password', async () => {
        const res = await request(BASE_URL)
            .post('/api/user/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword'
            });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid email or password');
    });

    // 5. Update User Profile
    it('5. should update user profile details', async () => {
        const res = await request(BASE_URL)
            .put(`/api/user/update/${testUserId}`)
            .send({ username: `${testUser.username}_updated` });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User updated successfully');
    });

    // 6. Forgot Password (Token Generation)
    it('6. should initiate forgot password process', async () => {
        const res = await request(BASE_URL)
            .post('/api/user/forgot-password')
            .send({ email: testUser.email });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    // 7. Question Creation (Admin Simulation)
    it('7. should create a new quiz question', async () => {
        const res = await request(BASE_URL)
            .post('/api/questions/add')
            .send({
                questionText: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: "4",
                category: "Math",
                difficulty: "easy"
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Question added');
        testQuestionId = res.body.question.id;
    });

    // 8. Fetch All Questions
    it('8. should retrieve all quiz questions', async () => {
        const res = await request(BASE_URL).get('/api/questions');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // 9. Fetch Questions by Category
    it('9. should retrieve questions by specific category', async () => {
        const res = await request(BASE_URL).get('/api/questions/category/Math');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // 10. Question Deletion
    it('10. should delete a quiz question', async () => {
        const res = await request(BASE_URL).delete(`/api/questions/${testQuestionId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Question deleted');
    });
});