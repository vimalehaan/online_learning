const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const openaiRoutes = require("./routes/openaiRoutes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const react_app_url = process.env.REACT_APP_BASE_URL

app.use(cors({
    origin: `${react_app_url}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.options('*', cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/openai", openaiRoutes);

module.exports = app;