const { Question } = require("../database/database");

// NEW: READ BY CATEGORY (For User "Join with Code")
exports.getQuestionsByCategory = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { category: req.params.category }
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ message: "Question added", question });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getQuestionById = async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.json(question);
};

// UPDATE
exports.updateQuestion = async (req, res) => {
  await Question.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({ message: "Question updated" });
};

// DELETE
exports.deleteQuestion = async (req, res) => {
  await Question.destroy({ where: { id: req.params.id } });
  res.json({ message: "Question deleted" });
};