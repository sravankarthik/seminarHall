const mongoose = require("mongoose");

const seminarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Seminar", seminarSchema);