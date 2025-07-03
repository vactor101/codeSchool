import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel, { IComment } from "../models/course.model";
import { redis } from "../utils/redis";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import skillModel from "../models/skills.model";
import portfolioModel from "../models/portfolio.model";
import categoryModel from "../models/category.model";
import userModel from "../models/user.model";
import contactModel from "../models/contact.model";
import newsLetterModel from "../models/newsletter.model";
import path from "path";
import ejs from "ejs";

// create portfolio
export const createPortfolio = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const data = req.body;
      const image = data.image;

      const isUserNameExist = await portfolioModel.findOne({
        $or: [{ userId }, { userName: data?.userName || "" }],
      });
      if (isUserNameExist) {
        return next(
          new ErrorHandler(
            "there is another portfolio for the same user or with the same userName",
            409
          )
        );
      }
      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "Portfolios",
        });

        data.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      data.userId = userId;

      const portfolio = await portfolioModel.create(data);

      res.status(201).json({
        success: true,
        portfolio,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit portfolio
export const editPortfolio = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const image = data.image;

      const userId = req.user?._id;

      const portfolioData = (await portfolioModel.findOne({ userId })) as any;

      if (image && !image.startsWith("https")) {
        if (portfolioData.image.public_id) {
          await cloudinary.v2.uploader.destroy(portfolioData.image.public_id);
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "Portfolios",
        });

        data.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (image && image.startsWith("https")) {
        data.image = {
          public_id: portfolioData?.image.public_id,
          url: portfolioData?.image.url,
        };
      }

      const portfolio = await portfolioModel.findOneAndUpdate(
        { userId },
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        portfolio,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete portfolio
export const deletePortfolio = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    try {
      // Check if the portfolio exists
      const portfolio = await portfolioModel.findOne({ userId });
      if (!portfolio) {
        return next(new ErrorHandler("Portfolio not found", 404));
      }

      try {
        // Delete associated skills, categories, and the portfolio
        await Promise.all([
          skillModel.deleteMany({ portfolioId: portfolio._id }),
          categoryModel.deleteMany({ portfolioId: portfolio._id }),
          portfolioModel.findOneAndDelete({ userId }),
        ]);
        if (portfolio.image && portfolio.image.public_id) {
          await cloudinary.v2.uploader.destroy(portfolio.image.public_id);
        }
      } catch (deletionError) {
        return next(
          new ErrorHandler(
            "An error occurred while deleting associated data",
            500
          )
        );
      }

      res.status(200).json({
        success: true,
        message:
          "Portfolio, associated skills, categories, and projects deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add skills
export const addSkills = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const portfolio = await portfolioModel.findOne({ userId });

      const { skills } = req.body;

      if (!portfolio) {
        return next(new ErrorHandler("Portfolio doesnot exist", 400));
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        return next(new ErrorHandler("Skills array is required", 400));
      }

      // Map skills to include portfolioId
      const skillsWithPortfolioId = skills.map((skill: any) => ({
        ...skill,
        portfolioId: portfolio?._id,
      }));

      // Insert multiple skills
      const savedSkills = await skillModel.insertMany(skillsWithPortfolioId);
      const subscribers = await newsLetterModel.find({
        portfolioId: portfolio._id,
      });

      if (subscribers.length > 0) {
        // Prepare email data for EJS template
        const emailData = {
          portfolio: portfolio.userName,
          skillNames: skills.map((skill: any) => skill.name).join(", "),
        };

        // Render HTML content for the email
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/new-skills.ejs"),
          emailData
        );

        try {
          // Send email to all subscribers
          await Promise.all(
            subscribers.map((subscriber: any) =>
              sendMail({
                email: subscriber.email,
                subject: `New Skills Added to ${portfolio?.userName} Portfolio`,
                template: "new-skills.ejs",
                data: emailData,
              })
            )
          );
        } catch (emailError: any) {
          console.error("Failed to send email notifications:", emailError);
        }
      }

      res.status(201).json({
        success: true,
        skills: savedSkills,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit skill
export const editSkill = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skillId } = req.params;
      const data = req.body;
      const skill = await skillModel.findByIdAndUpdate(
        skillId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        skill,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete skill
export const deleteSkill = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skillId } = req.params;
      const deletedSkill = await skillModel.findByIdAndDelete(skillId);
      if (!deletedSkill) {
        return next(new ErrorHandler("Failed to delete skill", 400));
      }
      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all skills
export const getAllSkills = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const portfolio = await portfolioModel.findOne({ userId: userId });
    const skills = await skillModel.find({ portfolioId: portfolio?._id });

    res.status(200).json({
      success: true,
      skills,
    });
  }
);

// Create a new category with projects
export const createCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const portfolio = await portfolioModel.findOne({ userId });
      const { categoryName, projects } = req.body;

      if (!categoryName) {
        return next(new ErrorHandler("Category name are required", 400));
      }

      // Process images for each project (if provided)
      if (projects && projects.length) {
        for (const project of projects) {
          if (project.image) {
            const myCloud = await cloudinary.v2.uploader.upload(project.image, {
              folder: "Projects",
            });

            project.image = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }
        }
      }

      const newCategory = await categoryModel.create({
        portfolioId: portfolio?._id,
        categoryName,
        projects,
      });
      const subscribers = await newsLetterModel.find({
        portfolioId: portfolio?._id,
      });

      if (subscribers.length > 0) {
        // Prepare email data for EJS template
        const emailData = {
          portfolio: portfolio?.userName,
          projectsNames: projects
            .map((project: any) => project.name)
            .join(", "),
        };

        // Render HTML content for the email
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/new-project.ejs"),
          emailData
        );

        try {
          // Send email notifications
          await Promise.all(
            subscribers.map((subscriber: any) =>
              sendMail({
                email: subscriber.email,
                subject: `New Projects Added to ${portfolio?.userName}'s Portfolio`,
                template: "new-projects.ejs",
                data: emailData,
              })
            )
          );
        } catch (emailError: any) {
          console.error("Failed to send email notifications:", emailError);
        }
      }
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Add a project to an existing category
// export const addProjectToCategory = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.user?._id
//       const portfolio = await portfolioModel.findOne({userId})

//       const { categoryId } = req.params;
//       const { name, description, link, image } = req.body;

//       if (!name || !description || !link || !image) {
//         return next(new ErrorHandler("All project fields are required", 400));
//       }

//       let imageData = null;

//       // Upload image to Cloudinary
//       if (image) {
//         const myCloud = await cloudinary.v2.uploader.upload(image, {
//           folder: "Projects",
//         });

//         imageData = {
//           public_id: myCloud.public_id,
//           url: myCloud.secure_url,
//         };
//       }

//       const updatedCategory = await categoryModel.findByIdAndUpdate(
//         categoryId,
//         {
//           $push: {
//             projects: {
//               name,
//               description,
//               link,
//               image: imageData,
//             },
//           },
//         },
//         { new: true } // Return the updated document
//       );

//       if (!updatedCategory) {
//         return next(new ErrorHandler("Category not found", 404));
//       }
//       const subscribers = await newsLetterModel.find({ portfolioId:portfolio?._id });

//       if (subscribers.length > 0) {
//         // Prepare email data for EJS template
//         const emailData = {
//           portfolio:portfolio?.userName,
//           projectName:name
//         };

//         // Render HTML content for the email
//         const html = await ejs.renderFile(
//           path.join(__dirname, "../mails/new-project.ejs"),
//           emailData
//         );

//         try {
//           // Send email to all subscribers
//           await Promise.all(
//             subscribers.map((subscriber: any) =>
//               sendMail({
//                 email: subscriber.email,
//                 subject: `New project Added to ${portfolio?.userName} Portfolio`,
//                 template: "new-project.ejs",
//                 data: emailData,
//               })
//             )
//           );
//         } catch (emailError: any) {
//           console.error("Failed to send email notifications:", emailError);
//         }
//       }
//       res.status(200).json({
//         success: true,
//         message: "Project added to category successfully",
//         data: updatedCategory,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

export const addProjectsToCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const portfolio = await portfolioModel.findOne({ userId });

      if (!portfolio) {
        return next(new ErrorHandler("Portfolio does not exist", 400));
      }

      const { categoryId } = req.params;
      const { projects } = req.body;

      if (!Array.isArray(projects) || projects.length === 0) {
        return next(new ErrorHandler("Projects array is required", 400));
      }

      const projectsWithImages = [];

      // Upload images for each project
      for (const project of projects) {
        const { name, description, link, image } = project;

        if (!name || !description || !link || !image) {
          return next(
            new ErrorHandler(
              "Each project must include name, description, link, and image",
              400
            )
          );
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "Projects",
        });

        projectsWithImages.push({
          name,
          description,
          link,
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
        });
      }

      // Add projects to the category
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        categoryId,
        { $push: { projects: { $each: projectsWithImages } } },
        { new: true } // Return the updated document
      );

      if (!updatedCategory) {
        return next(new ErrorHandler("Category not found", 404));
      }

      const subscribers = await newsLetterModel.find({
        portfolioId: portfolio._id,
      });

      if (subscribers.length > 0) {
        // Prepare email data for EJS template
        const emailData = {
          portfolio: portfolio.userName,
          projectNames: projects.map((project: any) => project.name).join(", "),
        };

        try {
          // Send email notifications
          await Promise.all(
            subscribers.map((subscriber: any) =>
              sendMail({
                email: subscriber.email,
                subject: `New Projects Added to ${portfolio.userName}'s Portfolio`,
                template: "new-projects.ejs",
                data: emailData,
              })
            )
          );
        } catch (emailError: any) {
          console.error("Failed to send email notifications:", emailError);
        }
      }

      res.status(200).json({
        success: true,
        message: "Projects added to category successfully",
        data: updatedCategory,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update category
export const updateCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryName) {
      return next(new ErrorHandler("Category name is required", 400));
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { categoryName },
      { new: true }
    );

    if (!updatedCategory) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  }
);

// Update project in a category
export const updateProject = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId, projectId } = req.params;
    const { name, description, link, image } = req.body;

    const updateFields: any = {};
    if (name) updateFields["projects.$.name"] = name;
    if (description) updateFields["projects.$.description"] = description;
    if (link) updateFields["projects.$.link"] = link;

    if (image) {
      try {
        // Upload the image to Cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(image, {
          folder: "Projects",
        });

        // Update the image fields in the project
        updateFields["projects.$.image"] = {
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        };
      } catch (error) {
        return next(new ErrorHandler("Image upload failed", 500));
      }
    }

    const updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: categoryId, "projects._id": projectId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(new ErrorHandler("Project or Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedCategory,
    });
  }
);

// Get all categories with projects
export const getAllCategories = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const portfolio = await portfolioModel.findOne({ userId: userId });
    const categories = await categoryModel.find({
      portfolioId: portfolio?._id,
    });

    res.status(200).json({
      success: true,
      categories,
    });
  }
);

// Delete a project from a category
export const deleteProjectFromCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId, projectId } = req.params;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        $pull: { projects: { _id: projectId } },
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return next(new ErrorHandler("Category or Project not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Project removed from category successfully",
    });
  }
);

// Delete a category and its projects
export const deleteCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    // Find and delete the category and its projects
    const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Category and its projects deleted successfully",
    });
  }
);

// get portfolio
export const getPortfolioDash = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    const [portfolio, user] = await Promise.all([
      portfolioModel.findOne({ userId }),
      userModel.findById(userId),
    ]);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    if (!portfolio) {
      return next(new ErrorHandler("Portfolio not found", 404));
    }
    const [skills, categories] = await Promise.all([
      skillModel
        .find({ portfolioId: portfolio?._id })
        .select("name percentage"),
      categoryModel
        .find({ portfolioId: portfolio?._id })
        .select("categoryName projects"),
    ]);
    const result = {
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,

      userName: portfolio.userName,
      facebookLink: portfolio.facebookLink || undefined,
      instagramLink: portfolio.instagramLink || undefined,
      linkedinLink: portfolio.linkedinLink || undefined,
      githubLink: portfolio.githubLink || undefined,
      description: portfolio.description,
      positions: portfolio.positions,
      image: portfolio.image?.url || undefined,
      phoneNumber: portfolio.phoneNumber,

      skillsDesc: portfolio.skillsDesc,
      skills,
      projectsDesc: portfolio.projectsDesc,
      projects: categories,
    };
    res.status(200).json({
      success: true,
      portfolio: result,
    });
  }
);

export const getPortfolio = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.params;

    const portfolio = await portfolioModel.findOne({ userName });
    const user = await userModel.findById(portfolio?.userId);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    if (!portfolio) {
      return next(new ErrorHandler("Portfolio not found", 404));
    }
    const [skills, categories] = await Promise.all([
      skillModel
        .find({ portfolioId: portfolio?._id })
        .select("name percentage"),
      categoryModel
        .find({ portfolioId: portfolio?._id })
        .select("categoryName projects"),
    ]);
    const result = {
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,
      portfolioId: portfolio._id,
      userName: portfolio.userName,
      facebookLink: portfolio.facebookLink || undefined,
      instagramLink: portfolio.instagramLink || undefined,
      linkedinLink: portfolio.linkedinLink || undefined,
      githubLink: portfolio.githubLink || undefined,
      description: portfolio.description,
      positions: portfolio.positions,
      image: portfolio.image?.url || undefined,
      phoneNumber: portfolio.phoneNumber,

      skillsDesc: portfolio.skillsDesc,
      skills,
      projectsDesc: portfolio.projectsDesc,
      projects: categories,
    };
    res.status(200).json({
      success: true,
      portfolio: result,
    });
  }
);

export const contact = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const contact = await contactModel.create(data);

      res.status(201).json({
        success: true,
        contact,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getContacts = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const portfolio = await portfolioModel.findOne({ userId });
      const contacts = await contactModel.find({ portfolioId: portfolio?._id });
      res.status(201).json({
        success: true,
        contacts,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const sendNewsLetter = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { portfolioId, email } = data;
      const newsLetter = await newsLetterModel.create({ portfolioId, email });

      res.status(201).json({
        success: true,
        newsLetter,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
