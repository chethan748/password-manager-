// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetpasswordtoken: { type: String },
    resetpasswordexpire: { type: Date }
});


module.exports = mongoose.model("User", userSchema);