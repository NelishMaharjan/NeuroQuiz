import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= AUTH ================= */

// LOGIN
export const loginUserApi = (data) =>
  API.post("/api/user/login", data);

// REGISTER
export const createUserApi = (data) =>
  API.post("/api/user/register", data);


/* ================= QUESTIONS ================= */

// GET ALL QUESTIONS
export const getAllQuestionsApi = () =>
  API.get("/api/questions");

// GET QUESTION BY ID
export const getQuestionByIdApi = (id) =>
  API.get(`/api/questions/${id}`);

// ADD QUESTION
export const createQuestionApi = (data) =>
  API.post("/api/questions/add", data);

// UPDATE QUESTION
export const updateQuestionApi = (id, data) =>
  API.put(`/api/questions/${id}`, data);

// DELETE QUESTION
export const deleteQuestionApi = (id) =>
  API.delete(`/api/questions/${id}`);

export default API;
