module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
      questionText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.JSON, // stores array or object
        allowNull: false,
      },
      correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM("easy", "medium", "hard"),
        defaultValue: "easy",
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      submittedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    return Question;
  };
  