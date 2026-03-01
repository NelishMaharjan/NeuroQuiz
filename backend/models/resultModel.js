const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Result = sequelize.define(
    "Result",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "results",
      timestamps: true,
    }
  );

  return Result;
};