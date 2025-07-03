"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = require("mongoose");
// Define the Project Subdocument Schema
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter project name"],
    },
    description: {
        type: String,
        required: [true, "Please enter project description"],
    },
    link: {
        type: String,
        required: [true, "Please enter project link"],
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
}, { _id: true } // Disable _id for subdocuments
);
// Define the Category Schema with Projects as Subdocuments
const categorySchema = new mongoose_1.Schema({
    portfolioId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true,
    },
    categoryName: {
        type: String,
        required: [true, "Please enter category name"],
    },
    projects: [projectSchema], // Array of project subdocuments
}, {
    timestamps: true,
});
const categoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.default = categoryModel;
