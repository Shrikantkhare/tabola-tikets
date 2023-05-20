const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: Number, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true, min: 8, max: 15 }
   
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema) 