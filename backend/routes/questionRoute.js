const router = require("express").Router();
const {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByCategory,
  submitQuestion,
  approveQuestion, 
} = require("../controllers/questionController");

// Basic List & Add
router.get("/", getAllQuestions);
router.post("/add", addQuestion);
router.post("/submit", submitQuestion);
router.put("/approve/:id", approveQuestion);

// Specialized Filter
router.get("/category/:category", getQuestionsByCategory);

// ID Specific
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;