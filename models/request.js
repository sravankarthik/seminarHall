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
        type: Date
    },
    timefrom: {
        type: Date,
        required: true
    },
    timeto: {
        type: Date,
        required: true
    },
    preference_1: {
        type: String,
        default: "any"
    },
    preference_2: {
        type: String,
        default: "any"
    },
    preference_3: {
        type: String,
        default: "any"
    },
    approved: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);