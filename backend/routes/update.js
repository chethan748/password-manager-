const express = require('express');
const router = express.Router();
const Account = require('../models/Account');


router.put('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            {
                url: req.body.url,
                username: req.body.username,
                password: req.body.password
            },
            { new: true }
        );

        res.status(200).json({
            message: "Updated successfully",
            data: updatedAccount
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;