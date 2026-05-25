const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();
const middleware=require("../middleware/auth")
const validator=require('validator')

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
       

        if(!validator.isEmail(email)){
            return res.status(400).json({message:"invalid email format"})
        }
         const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);

   
        const user = await User.create({
            email,
            password: hashedPassword
        });
        const token=jwt.sign({
            id:user._id
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

        res.json({
            message: "User created successfully",
            token
        });

    } catch (error) {
        console.log(" ABSOLUTE SIGNUP ERROR:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;