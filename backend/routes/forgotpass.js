const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); 
const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs')

router.post('/forgot-password', async (req, res) => {
    try {
      
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "this is not a registered user." });
        }

        const rawtoken = crypto.randomBytes(20).toString('hex');
     const actualtoken=   user.resetpasswordtoken = crypto.createHash('sha256').update(rawtoken).digest('hex');
        user.resetpasswordexpire = Date.now() + 3600000;
        await user.save();

        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, 
            },
        });

      
        const resetUrl = `http://localhost:5173/reset-password/${actualtoken}`;

        const mailoption = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'password reset request',

            text: `click this link to reset your password. It is valid for 1 hour:\n\n${resetUrl}`,
        };

     
        await transport.sendMail(mailoption); 
        
        res.status(200).json({
            message: 'Reset link sent to your email.'
        });
  
    } catch (error) {
       
        console.error(" THE ACTUAL BACKEND BUG IS:", error); 
        
        res.status(500).json({ 
            message: 'server error handles workflow',
            error: error.message 
        });     
    }
});




router.post('/reset-password/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const { password } = req.body; 
        
      
        if (!password) {
            return res.status(400).json({ message: 'Password field is required.' });
        }

        const user = await User.findOne({
            resetpasswordtoken: token,
            resetpasswordexpire: { $gt: new Date() }
        });
       
        if (!user) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }
  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt); 
        
        user.resetpasswordtoken = undefined;
        user.resetpasswordexpire = undefined; 
        
        await user.save();
        res.status(200).json({ message: 'Password has been updated successfully!' });
    
    } catch (error) {
        console.error(" RESET PASSWORD ROUTE CRASHED:", error);
        res.status(500).json({ 
            message: 'server error processing password update.',
            error: error.message 
        });
    }
});
module.exports = router;