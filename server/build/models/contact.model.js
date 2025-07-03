"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = require("mongoose");
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
;
const contactSchema = new mongoose_1.Schema({
    portfolioId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    firstName: {
        type: String,
        required: [true, "Please enter first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter last name"]
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
    phoneNumber: {
        type: String,
        required: [true, "Please enter phoneNumber"]
    },
    message: {
        type: String,
    },
}, {
    timestamps: true
});
const contactModel = (0, mongoose_1.model)('Contact', contactSchema);
exports.default = contactModel;
