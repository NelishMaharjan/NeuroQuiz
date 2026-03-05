const { Question, sequelize, User } = require("../database/database");
const { Op } = require("sequelize");

// NEW: READ BY CATEGORY (Only Approved Questions)
exports.getQuestionsByCategory = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: {
        category: {
          [Op.iLike]: req.params.category
        },
        isApproved: true // Only return verified questions to players
      }
    });
    
    if (questions.length === 0) {
      const allQuestions = await Question.findAll({ where: { isApproved: true } });
      const filtered = allQuestions.filter(q => 
        q.category.toLowerCase() === req.params.category.toLowerCase()
      );
      return res.json(filtered);
    }

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE (Admin version - auto approved)
exports.addQuestion = async (req, res) => {
  try {
    const question = await Question.create({ ...req.body, isApproved: true });
    res.status(201).json({ message: "Question added", question });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SUBMIT (User version - pending approval)
exports.submitQuestion = async (req, res) => {
  try {
    const question = await Question.create({ 
      ...req.body, 
      isApproved: false 
    });
    res.status(201).json({ message: "Question submitted for review", question });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPROVE (Admin only)
exports.approveQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.update({ isApproved: true });

    // Reward user if it was a submission
    if (question.submittedBy) {
      const user = await User.findByPk(question.submittedBy);
      if (user) {
        const newXp = (user.xp || 0) + 500;
        let newLevel = user.level || 1;
        if (newXp >= newLevel * 1000) {
          newLevel += 1;
        }
        await user.update({ xp: newXp, level: newLevel });
      }
    }

    res.json({ message: "Question approved and user rewarded" });
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