const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        //default: Date.now
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    seminar_halls: [{
        type: ObjectId,
        ref: "Seminar"
    }],
    approved: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);