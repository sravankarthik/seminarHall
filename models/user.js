const mongoose = require("mongoose");
const crypto = require("crypto")
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String
    },
    encry_password: {
        type: String,
    },
    salt: String,
    role: {
        type: Number,
        default: 1
    },
    requests: [{
        type: ObjectId,
        ref: "Request"
    }]

}, { timestamps: true });

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.secretPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticator: function (plainPassword) {
        return this.secretPassword(plainPassword) == this.encry_password;
    },
    secretPassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        }
        catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);