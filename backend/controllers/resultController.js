const { Result } = require("../database/database");
const { Op } = require("sequelize");

const saveResult = async (req, res) => {
  try {
    const { userId, category, score, totalQuestions } = req.body;

    if (!userId || !category || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Safety: Prevent duplicate saves within a short window (5 seconds)
    const recentResult = await Result.findOne({
      where: {
        userId,
        category,
        score,
        createdAt: {
          [Op.gt]: new Date(Date.now() - 5000) // Created in the last 5 seconds
        }
      }
    });

    if (recentResult) {
      return res.status(200).json({ success: true, message: "Result already synchronized", result: recentResult });
    }

    const newResult = await Result.create({
      userId,
      category,
      score,
      totalQuestions,
    });

    res.status(201).json({ success: true, message: "Result saved", result: newResult });
  } catch (error) {
    res.status(500).json({ message: "Error saving result", error: error.message });
  }
};

const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.findAll({ 
        where: { userId },
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error: error.message });
  }
};

module.exports = { saveResult, getUserResults };