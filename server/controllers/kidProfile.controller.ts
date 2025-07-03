import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import KidProfileModel from "../models/kidProfile.model";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/course.model";

// Add Kid Controller
export const addKid = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { kidName, mobileNumber, age } = req.body;

      const newKidProfile = await KidProfileModel.create({
        kidName,
        mobileNumber,
        age,
      });

      res.status(201).json({
        success: true,
        message: "Kid profile added successfully",
        data: newKidProfile,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editKidFollowUp = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { kidId } = req.params;
    const {
      followUp1,
      note1,
      followUp2,
      note2,
      followUp3,
      note3,
      whatsAppLink,
      faceBookLink,
      mobile,
      instagramLink,
      customerFeedback,
      tag,
      suggestedCourse,
    } = req.body;

    const kidProfile = (await KidProfileModel.findById(kidId)) as any;
    if (!kidProfile) {
      return next(new Error("Kid profile not found"));
    }
    let suggestedCourses = kidProfile.suggestedCourses;
    const course = await CourseModel.findById(suggestedCourse);
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
  }
);

export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await CourseModel.find().select("name description");

    res.status(200).json({
      success: true,
      data: courses,
    });
  }
);

export const getAllKids = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
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

    const kidProfiles = await KidProfileModel.find(ageFilter).populate({
      path: "suggestedCourses",
      model: "Course",
      select: "name description", // Adjust the fields you want to include
    });

    res.status(200).json({
      success: true,
      data: kidProfiles,
    });
  }
);
