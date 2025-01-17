const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

module.exports = app;