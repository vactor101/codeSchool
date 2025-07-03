"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = require("mongoose");
;
const skillSchema = new mongoose_1.Schema({
    portfolioId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    name: {
        type: String,
        required: [true, "Please enter skill name"],
    },
    percentage: {
        type: Number,
        required: [true, "Please enter skill percentage"],
    },
}, {
    timestamps: true
});
const skillModel = (0, mongoose_1.model)('Skill', skillSchema);
exports.default = skillModel;
