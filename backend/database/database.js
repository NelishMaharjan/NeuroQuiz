const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const isTestEnvironment = process.env.NODE_ENV === "test";
console.log(`Running in ${isTestEnvironment ? "TEST" : "DEVELOPMENT"} mode.`);

const sequelize = new Sequelize(
  isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    port: process.env.DB_PORT || 5432,
  }
);

// 🔌 Connect DB
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// 🧠 IMPORT MODELS
const QuestionModel = require("../models/questionModel");
const UserModel = require("../models/userModel");
const ResultModel = require("../models/resultModel");

// 🧩 INIT MODELS
const Question = QuestionModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Result = ResultModel(sequelize, DataTypes);

// 📦 EXPORT EVERYTHING
module.exports = {
  sequelize,
  connectDB,
  Question,
  User,
  Result,
};
