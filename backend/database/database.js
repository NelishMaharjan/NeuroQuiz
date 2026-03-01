require("dotenv").config({ override: true });
const { Sequelize, DataTypes } = require("sequelize");

const env = (process.env.NODE_ENV || "development").trim();
const isTestEnvironment = env === "test";

const dbName = (isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME).trim();
const dbUser = process.env.DB_USER.trim();
const dbPass = process.env.DB_PASS.trim();
const dbHost = process.env.DB_HOST.trim();

console.log(`-----------------------------------------------`);
console.log(`MODE: ${env}`);
console.log(`DATABASE: ${dbName}`);
console.log(`-----------------------------------------------`);

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: "postgres",
    logging: false,
    port: parseInt(process.env.DB_PORT) || 5432,
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
