// backend/server.js
const express = require('express');
require('dotenv').config();
const cors = require("cors");
const {connectDB, sequelize} = require('./database/database');

const app = express();

// 1. CORS MUST be at the very top
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// 2. Routes
app.use("/api/user", require("./routes/route"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/results", require("./routes/resultRoute"));

app.get('/', (req, res) => {
    res.json('Welcome to the neuroquiz API');
});

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true }); 
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}
startServer();