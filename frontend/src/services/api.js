import axios from "axios";

const API = axios.create({
  // Ensure this matches your server.js port (3000)
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= AUTH ================= */

export const loginUserApi = (data) =>
  API.post("/api/user/login", data);

export const createUserApi = (data) =>
  API.post("/api/user/register", data);

export const updateUserApi = (id, data) => {
  if (data instanceof FormData) {
    return API.put(`/api/user/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return API.put(`/api/user/update/${id}`, data);
};

export const logoutUserApi = (id) =>
  API.post(`/api/user/logout/${id}`);

export const getAllUsersApi = () =>
  API.get("/api/user/all");

export const deleteUserApi = (id) =>
  API.delete(`/api/user/delete/${id}`);

export const changeUserRoleApi = (id, role, adminId) =>
  API.put(`/api/user/change-role/${id}`, { role, adminId });

export const getActiveUsersApi = () =>
  API.get("/api/user/getactiveusers");

export const forgotPasswordApi = (data) =>
  API.post("/api/user/forgot-password", data);

export const resetPasswordApi = (data) =>
  API.post("/api/user/reset-password", data);


/* ================= QUESTIONS ================= */

// 1. GET ALL QUESTIONS (Used by Admin List)
export const getAllQuestionsApi = () =>
  API.get("/api/questions");

// 2. 🔥 ADD THIS: GET QUESTIONS BY CATEGORY (Used by Quiz page "Join with Code")
export const getQuestionsByCategoryApi = (category) =>
  API.get(`/api/questions/category/${category}`);

// 3. GET QUESTION BY ID
export const getQuestionByIdApi = (id) =>
  API.get(`/api/questions/${id}`);

// 4. ADD QUESTION (Admin)
export const createQuestionApi = (data) =>
  API.post("/api/questions/add", data);

// 4b. SUBMIT QUESTION (User)
export const submitQuestionApi = (data) =>
  API.post("/api/questions/submit", data);

// 4c. APPROVE QUESTION (Admin)
export const approveQuestionApi = (id) =>
  API.put(`/api/questions/approve/${id}`);

// 5. UPDATE QUESTION
export const updateQuestionApi = (id, data) =>
  API.put(`/api/questions/${id}`, data);

// 6. DELETE QUESTION
export const deleteQuestionApi = (id) =>
  API.delete(`/api/questions/${id}`);


/* ================= RESULTS ================= */

export const saveResultApi = (data) =>
  API.post("/api/results/add", data);

export const getUserResultsApi = (userId) =>
  API.get(`/api/results/user/${userId}`);

/* ================= SYSTEM ================= */
export const getSystemStatsApi = () =>
  API.get("/api/user/stats");


export default API;