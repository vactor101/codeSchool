"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = require("mongoose");
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
;
const newsLetterSchema = new mongoose_1.Schema({
    portfolioId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "please enter a valid email",
        },
    },
}, {
    timestamps: true
});
const newsLetterModel = (0, mongoose_1.model)('NewsLetter', newsLetterSchema);
exports.default = newsLetterModel;
