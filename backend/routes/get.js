const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const middleware=require("../middleware/auth")


router.get('/',middleware, async (req, res) => {
    try {
        const accounts = await Account.find( { userId: req.user.id});

        res.json({
            message: "All accounts fetched",
            data: accounts
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            message: "Account fetched",
            data: account
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;