const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Create the model once and export it directly
module.exports = mongoose.model('Account', accountSchema);