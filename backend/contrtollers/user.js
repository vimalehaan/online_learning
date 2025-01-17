const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/userSchema");

const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role,
        })
        await newUser.save();

        return res.status(201).json({message: "User saved successfully"});

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({message: "Server Error"});
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credential"});
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        res.status(200).json({
            message: "User successfully logged in",
            token,
            user
        });
    } catch (error) {
        return res.status(500).json({message: `Server Error: ${error.message} `});
    }
}


module.exports = {registerUser, loginUser};