"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
// Portfolio schema definition
const portfolioSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        unique: true,
        required: [true, "Please enter your userName"],
    },
    facebookLink: {
        type: String,
    },
    instagramLink: {
        type: String,
    },
    linkedinLink: {
        type: String,
    },
    githubLink: {
        type: String,
    },
    skillsDesc: {
        type: String,
    },
    projectsDesc: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please enter a description for your portfolio"],
    },
    positions: [{
            type: String,
            required: [true, "Please enter your positions"],
        }],
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });
const portfolioModel = mongoose_1.default.model("Portfolio", portfolioSchema);
exports.default = portfolioModel;
