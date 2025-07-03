"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonProgressSchema = new mongoose_1.default.Schema({
    lessonId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
    },
    timeSpent: {
        type: Number,
        default: 0,
    },
    watchTime: {
        type: Number,
        default: 0,
    },
});
const courseProgressSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now,
    },
    totalTimeSpent: {
        type: Number,
        default: 0,
    },
    completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
    },
    lessons: [lessonProgressSchema],
    notes: [
        {
            type: String,
        },
    ],
    bookmarks: [
        {
            lessonId: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Number,
                required: true,
            },
            note: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {
    timestamps: true,
});
// Create compound index for efficient queries
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
courseProgressSchema.index({ userId: 1 });
courseProgressSchema.index({ courseId: 1 });
const ProgressModel = mongoose_1.default.model("Progress", courseProgressSchema);
exports.default = ProgressModel;
