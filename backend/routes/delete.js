const express = require('express');
const router = express.Router();
const Account = require('../models/Account');


router.delete('/:id', async (req, res) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);

        if (!deletedAccount) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            message: "Account deleted successfully",
            data: deletedAccount
        });

    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;