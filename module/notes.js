const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // ✅ sahi variable
        ref: "User", // Optional: relationship define karta hai
        required: true
    }
}, { timestamps: true }); // ✅ sahi spelling

module.exports = mongoose.model("Note", NoteSchema);
