"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllKids = exports.getAllCourses = exports.editKidFollowUp = exports.addKid = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const kidProfile_model_1 = __importDefault(require("../models/kidProfile.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const course_model_1 = __importDefault(require("../models/course.model"));
// Add Kid Controller
exports.addKid = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { kidName, mobileNumber, age } = req.body;
        const newKidProfile = await kidProfile_model_1.default.create({
            kidName,
            mobileNumber,
            age,
        });
        res.status(201).json({
            success: true,
            message: "Kid profile added successfully",
            data: newKidProfile,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.editKidFollowUp = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { kidId } = req.params;
    const { followUp1, note1, followUp2, note2, followUp3, note3, whatsAppLink, faceBookLink, mobile, instagramLink, customerFeedback, tag, suggestedCourse, } = req.body;
    const kidProfile = (await kidProfile_model_1.default.findById(kidId));
    if (!kidProfile) {
        return next(new Error("Kid profile not found"));
    }
    let suggestedCourses = kidProfile.suggestedCourses;
    const course = await course_model_1.default.findById(suggestedCourse);
    if (suggestedCourse) {
        suggestedCourses.push(course?._id);
    }
    kidProfile.followUp1 = followUp1;
    kidProfile.note1 = note1;
    kidProfile.followUp2 = followUp2;
    kidProfile.note2 = note2;
    kidProfile.followUp3 = followUp3;
    kidProfile.note3 = note3;
    kidProfile.whatsAppLink = whatsAppLink || kidProfile.whatsAppLink;
    kidProfile.faceBookLink = faceBookLink || kidProfile.faceBookLink;
    kidProfile.mobile = mobile || kidProfile.mobile;
    kidProfile.instagramLink = instagramLink || kidProfile.instagramLink;
    kidProfile.customerFeedback =
        customerFeedback || kidProfile.customerFeedback;
    kidProfile.suggestedCourses = suggestedCourses;
    kidProfile.tag = tag || kidProfile.tag;
    const updatedKidProfile = await kidProfile.save();
    res.status(200).json({
        success: true,
        message: "Kid follow-up data updated successfully",
        kidProfile: updatedKidProfile,
    });
});
exports.getAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const courses = await course_model_1.default.find().select("name description");
    res.status(200).json({
        success: true,
        data: courses,
    });
});
exports.getAllKids = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { ageGroup } = req.query; // Get the ageGroup from the query parameters
    let ageFilter = {};
    // Define age ranges based on ageGroup
    switch (ageGroup) {
        case "ageGroup1":
            ageFilter = { age: { $gte: 3, $lte: 6 } };
            break;
        case "ageGroup2":
            ageFilter = { age: { $gte: 7, $lte: 10 } };
            break;
        case "ageGroup3":
            ageFilter = { age: { $gte: 11, $lte: 16 } };
            break;
        default:
            // If no ageGroup is specified, return all kids
            ageFilter = {};
            break;
    }
    const kidProfiles = await kidProfile_model_1.default.find(ageFilter).populate({
        path: "suggestedCourses",
        model: "Course",
        select: "name description", // Adjust the fields you want to include
    });
    res.status(200).json({
        success: true,
        data: kidProfiles,
    });
});
