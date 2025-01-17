const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "No token provided. Access denied." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found. Access denied." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token.... Access denied." });
    }
};

module.exports = { verifyToken };