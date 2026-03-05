require('dotenv').config();
const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const {connectDB, sequelize} = require('./database/database');

const app = express();

// 1. Security headers
app.use(helmet());

// 2. Request logging
app.use(morgan('dev'));

// 3. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// 4. CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// 5. Routes
app.use("/api/user", require("./routes/route"));
app.use("/api/questions", require("./routes/questionRoute"));
app.use("/api/results", require("./routes/resultRoute"));

app.get('/', (req, res) => {
    res.json('Welcome to the neuroquiz API');
});

// 6. Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong'
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync(process.env.NODE_ENV === 'development' ? { alter: true } : {}); 
        if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();

// 7. Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await sequelize.close();
    process.exit(0);
});

module.exports = app;

// test