const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const middleware=require("../middleware/auth")
router.post('/post',middleware, async (req, res) => {
      console.log(req.body)
    try {
        const { url , username, password } = req.body;
        console.log(req.body)
        if (!url || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
   const newAccount = new Account({
     userId: req.user.id,
            url,
            username,
            password
        });
 const savedAccount = await newAccount.save();

        res.status(201).json({
            message: "Account created successfully",
            data: savedAccount
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;