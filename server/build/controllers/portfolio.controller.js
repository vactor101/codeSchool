"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewsLetter = exports.getContacts = exports.contact = exports.getPortfolio = exports.getPortfolioDash = exports.deleteCategory = exports.deleteProjectFromCategory = exports.getAllCategories = exports.updateProject = exports.updateCategory = exports.addProjectsToCategory = exports.createCategory = exports.getAllSkills = exports.deleteSkill = exports.editSkill = exports.addSkills = exports.deletePortfolio = exports.editPortfolio = exports.createPortfolio = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const skills_model_1 = __importDefault(require("../models/skills.model"));
const portfolio_model_1 = __importDefault(require("../models/portfolio.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const contact_model_1 = __importDefault(require("../models/contact.model"));
const newsletter_model_1 = __importDefault(require("../models/newsletter.model"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
// create portfolio
exports.createPortfolio = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const data = req.body;
        const image = data.image;
        const isUserNameExist = await portfolio_model_1.default.findOne({
            $or: [{ userId }, { userName: data?.userName || "" }],
        });
        if (isUserNameExist) {
            return next(new ErrorHandler_1.default("there is another portfolio for the same user or with the same userName", 409));
        }
        if (image) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "Portfolios",
            });
            data.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        data.userId = userId;
        const portfolio = await portfolio_model_1.default.create(data);
        res.status(201).json({
            success: true,
            portfolio,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// edit portfolio
exports.editPortfolio = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const image = data.image;
        const userId = req.user?._id;
        const portfolioData = (await portfolio_model_1.default.findOne({ userId }));
        if (image && !image.startsWith("https")) {
            if (portfolioData.image.public_id) {
                await cloudinary_1.default.v2.uploader.destroy(portfolioData.image.public_id);
            }
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
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
        const portfolio = await portfolio_model_1.default.findOneAndUpdate({ userId }, {
            $set: data,
        }, { new: true });
        res.status(200).json({
            success: true,
            portfolio,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// delete portfolio
exports.deletePortfolio = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.user?._id;
    try {
        // Check if the portfolio exists
        const portfolio = await portfolio_model_1.default.findOne({ userId });
        if (!portfolio) {
            return next(new ErrorHandler_1.default("Portfolio not found", 404));
        }
        try {
            // Delete associated skills, categories, and the portfolio
            await Promise.all([
                skills_model_1.default.deleteMany({ portfolioId: portfolio._id }),
                category_model_1.default.deleteMany({ portfolioId: portfolio._id }),
                portfolio_model_1.default.findOneAndDelete({ userId }),
            ]);
            if (portfolio.image && portfolio.image.public_id) {
                await cloudinary_1.default.v2.uploader.destroy(portfolio.image.public_id);
            }
        }
        catch (deletionError) {
            return next(new ErrorHandler_1.default("An error occurred while deleting associated data", 500));
        }
        res.status(200).json({
            success: true,
            message: "Portfolio, associated skills, categories, and projects deleted successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// add skills
exports.addSkills = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const portfolio = await portfolio_model_1.default.findOne({ userId });
        const { skills } = req.body;
        if (!portfolio) {
            return next(new ErrorHandler_1.default("Portfolio doesnot exist", 400));
        }
        if (!Array.isArray(skills) || skills.length === 0) {
            return next(new ErrorHandler_1.default("Skills array is required", 400));
        }
        // Map skills to include portfolioId
        const skillsWithPortfolioId = skills.map((skill) => ({
            ...skill,
            portfolioId: portfolio?._id,
        }));
        // Insert multiple skills
        const savedSkills = await skills_model_1.default.insertMany(skillsWithPortfolioId);
        const subscribers = await newsletter_model_1.default.find({
            portfolioId: portfolio._id,
        });
        if (subscribers.length > 0) {
            // Prepare email data for EJS template
            const emailData = {
                portfolio: portfolio.userName,
                skillNames: skills.map((skill) => skill.name).join(", "),
            };
            // Render HTML content for the email
            const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/new-skills.ejs"), emailData);
            try {
                // Send email to all subscribers
                await Promise.all(subscribers.map((subscriber) => (0, sendMail_1.default)({
                    email: subscriber.email,
                    subject: `New Skills Added to ${portfolio?.userName} Portfolio`,
                    template: "new-skills.ejs",
                    data: emailData,
                })));
            }
            catch (emailError) {
                console.error("Failed to send email notifications:", emailError);
            }
        }
        res.status(201).json({
            success: true,
            skills: savedSkills,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// edit skill
exports.editSkill = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { skillId } = req.params;
        const data = req.body;
        const skill = await skills_model_1.default.findByIdAndUpdate(skillId, {
            $set: data,
        }, { new: true });
        res.status(201).json({
            success: true,
            skill,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// delete skill
exports.deleteSkill = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { skillId } = req.params;
        const deletedSkill = await skills_model_1.default.findByIdAndDelete(skillId);
        if (!deletedSkill) {
            return next(new ErrorHandler_1.default("Failed to delete skill", 400));
        }
        res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Get all skills
exports.getAllSkills = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.user?._id;
    const portfolio = await portfolio_model_1.default.findOne({ userId: userId });
    const skills = await skills_model_1.default.find({ portfolioId: portfolio?._id });
    res.status(200).json({
        success: true,
        skills,
    });
});
// Create a new category with projects
exports.createCategory = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const portfolio = await portfolio_model_1.default.findOne({ userId });
        const { categoryName, projects } = req.body;
        if (!categoryName) {
            return next(new ErrorHandler_1.default("Category name are required", 400));
        }
        // Process images for each project (if provided)
        if (projects && projects.length) {
            for (const project of projects) {
                if (project.image) {
                    const myCloud = await cloudinary_1.default.v2.uploader.upload(project.image, {
                        folder: "Projects",
                    });
                    project.image = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
                }
            }
        }
        const newCategory = await category_model_1.default.create({
            portfolioId: portfolio?._id,
            categoryName,
            projects,
        });
        const subscribers = await newsletter_model_1.default.find({
            portfolioId: portfolio?._id,
        });
        if (subscribers.length > 0) {
            // Prepare email data for EJS template
            const emailData = {
                portfolio: portfolio?.userName,
                projectsNames: projects
                    .map((project) => project.name)
                    .join(", "),
            };
            // Render HTML content for the email
            const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/new-project.ejs"), emailData);
            try {
                // Send email notifications
                await Promise.all(subscribers.map((subscriber) => (0, sendMail_1.default)({
                    email: subscriber.email,
                    subject: `New Projects Added to ${portfolio?.userName}'s Portfolio`,
                    template: "new-projects.ejs",
                    data: emailData,
                })));
            }
            catch (emailError) {
                console.error("Failed to send email notifications:", emailError);
            }
        }
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
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
exports.addProjectsToCategory = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const portfolio = await portfolio_model_1.default.findOne({ userId });
        if (!portfolio) {
            return next(new ErrorHandler_1.default("Portfolio does not exist", 400));
        }
        const { categoryId } = req.params;
        const { projects } = req.body;
        if (!Array.isArray(projects) || projects.length === 0) {
            return next(new ErrorHandler_1.default("Projects array is required", 400));
        }
        const projectsWithImages = [];
        // Upload images for each project
        for (const project of projects) {
            const { name, description, link, image } = project;
            if (!name || !description || !link || !image) {
                return next(new ErrorHandler_1.default("Each project must include name, description, link, and image", 400));
            }
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
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
        const updatedCategory = await category_model_1.default.findByIdAndUpdate(categoryId, { $push: { projects: { $each: projectsWithImages } } }, { new: true } // Return the updated document
        );
        if (!updatedCategory) {
            return next(new ErrorHandler_1.default("Category not found", 404));
        }
        const subscribers = await newsletter_model_1.default.find({
            portfolioId: portfolio._id,
        });
        if (subscribers.length > 0) {
            // Prepare email data for EJS template
            const emailData = {
                portfolio: portfolio.userName,
                projectNames: projects.map((project) => project.name).join(", "),
            };
            try {
                // Send email notifications
                await Promise.all(subscribers.map((subscriber) => (0, sendMail_1.default)({
                    email: subscriber.email,
                    subject: `New Projects Added to ${portfolio.userName}'s Portfolio`,
                    template: "new-projects.ejs",
                    data: emailData,
                })));
            }
            catch (emailError) {
                console.error("Failed to send email notifications:", emailError);
            }
        }
        res.status(200).json({
            success: true,
            message: "Projects added to category successfully",
            data: updatedCategory,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Update category
exports.updateCategory = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    if (!categoryName) {
        return next(new ErrorHandler_1.default("Category name is required", 400));
    }
    const updatedCategory = await category_model_1.default.findByIdAndUpdate(categoryId, { categoryName }, { new: true });
    if (!updatedCategory) {
        return next(new ErrorHandler_1.default("Category not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
    });
});
// Update project in a category
exports.updateProject = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { categoryId, projectId } = req.params;
    const { name, description, link, image } = req.body;
    const updateFields = {};
    if (name)
        updateFields["projects.$.name"] = name;
    if (description)
        updateFields["projects.$.description"] = description;
    if (link)
        updateFields["projects.$.link"] = link;
    if (image) {
        try {
            // Upload the image to Cloudinary
            const uploadedImage = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "Projects",
            });
            // Update the image fields in the project
            updateFields["projects.$.image"] = {
                public_id: uploadedImage.public_id,
                url: uploadedImage.secure_url,
            };
        }
        catch (error) {
            return next(new ErrorHandler_1.default("Image upload failed", 500));
        }
    }
    const updatedCategory = await category_model_1.default.findOneAndUpdate({ _id: categoryId, "projects._id": projectId }, { $set: updateFields }, { new: true, runValidators: true });
    if (!updatedCategory) {
        return next(new ErrorHandler_1.default("Project or Category not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedCategory,
    });
});
// Get all categories with projects
exports.getAllCategories = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.user?._id;
    const portfolio = await portfolio_model_1.default.findOne({ userId: userId });
    const categories = await category_model_1.default.find({
        portfolioId: portfolio?._id,
    });
    res.status(200).json({
        success: true,
        categories,
    });
});
// Delete a project from a category
exports.deleteProjectFromCategory = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { categoryId, projectId } = req.params;
    const updatedCategory = await category_model_1.default.findByIdAndUpdate(categoryId, {
        $pull: { projects: { _id: projectId } },
    }, { new: true } // Return the updated document
    );
    if (!updatedCategory) {
        return next(new ErrorHandler_1.default("Category or Project not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Project removed from category successfully",
    });
});
// Delete a category and its projects
exports.deleteCategory = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { categoryId } = req.params;
    // Find and delete the category and its projects
    const deletedCategory = await category_model_1.default.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
        return next(new ErrorHandler_1.default("Category not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Category and its projects deleted successfully",
    });
});
// get portfolio
exports.getPortfolioDash = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.user?._id;
    const [portfolio, user] = await Promise.all([
        portfolio_model_1.default.findOne({ userId }),
        user_model_1.default.findById(userId),
    ]);
    if (!user) {
        return next(new ErrorHandler_1.default("user not found", 404));
    }
    if (!portfolio) {
        return next(new ErrorHandler_1.default("Portfolio not found", 404));
    }
    const [skills, categories] = await Promise.all([
        skills_model_1.default
            .find({ portfolioId: portfolio?._id })
            .select("name percentage"),
        category_model_1.default
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
});
exports.getPortfolio = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const { userName } = req.params;
    const portfolio = await portfolio_model_1.default.findOne({ userName });
    const user = await user_model_1.default.findById(portfolio?.userId);
    if (!user) {
        return next(new ErrorHandler_1.default("user not found", 404));
    }
    if (!portfolio) {
        return next(new ErrorHandler_1.default("Portfolio not found", 404));
    }
    const [skills, categories] = await Promise.all([
        skills_model_1.default
            .find({ portfolioId: portfolio?._id })
            .select("name percentage"),
        category_model_1.default
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
});
exports.contact = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const contact = await contact_model_1.default.create(data);
        res.status(201).json({
            success: true,
            contact,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.getContacts = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const portfolio = await portfolio_model_1.default.findOne({ userId });
        const contacts = await contact_model_1.default.find({ portfolioId: portfolio?._id });
        res.status(201).json({
            success: true,
            contacts,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.sendNewsLetter = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const { portfolioId, email } = data;
        const newsLetter = await newsletter_model_1.default.create({ portfolioId, email });
        res.status(201).json({
            success: true,
            newsLetter,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
