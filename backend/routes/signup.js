const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Standardized to bcryptjs to match your other files
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validator = require('validator');
require('dotenv').config();


router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
      

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
      

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1d" }
        );
       
        res.status(201).json({ message: "User created successfully", token });

    } catch (error) {
        console.log("THE ACTUAL ERROR IN TERMINAL IS:", error);
        res.status(500).json({
            message: "Server error during registration workflow",
            error: error.message
        });
    }
});

module.exports = router;