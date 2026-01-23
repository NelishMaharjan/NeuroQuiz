const router = require("express").Router();
const {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByCategory, 
} = require("../controllers/questionController");

// Basic List & Add
router.get("/", getAllQuestions);
router.post("/add", addQuestion);

// Specialized Filter
router.get("/category/:category", getQuestionsByCategory);

// ID Specific
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;