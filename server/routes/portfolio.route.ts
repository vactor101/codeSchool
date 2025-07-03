import express from "express";
import {
  addProjectsToCategory,
  addSkills,
  contact,
  createCategory,
  createPortfolio,
  deleteCategory,
  deletePortfolio,
  deleteProjectFromCategory,
  deleteSkill,
  editPortfolio,
  editSkill,
  getAllCategories,
  getAllSkills,
  getContacts,
  getPortfolio,
  getPortfolioDash,
  sendNewsLetter,
  updateCategory,
  updateProject,
} from "../controllers/portfolio.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const portfolioRouter = express.Router();

portfolioRouter.post("/create-portfolio", isAutheticated, createPortfolio);

portfolioRouter.put("/edit-portfolio", isAutheticated, editPortfolio);

portfolioRouter.delete("/delete-portfolio", isAutheticated, deletePortfolio);

portfolioRouter.post("/add-skills", isAutheticated, addSkills);

portfolioRouter.put("/edit-skill/:skillId", isAutheticated, editSkill);

portfolioRouter.delete("/delete-skill/:skillId", isAutheticated, deleteSkill);

portfolioRouter.get("/get-skills", isAutheticated, getAllSkills);

portfolioRouter.post("/create-category", isAutheticated, createCategory);

portfolioRouter.put(
  "/add-projects-to-category/:categoryId",
  isAutheticated,
  addProjectsToCategory
);

portfolioRouter.put(
  "/update-category/:categoryId",
  isAutheticated,
  updateCategory
);

portfolioRouter.put(
  "/update-project/:categoryId/:projectId",
  isAutheticated,
  updateProject
);

portfolioRouter.get("/get-categories", isAutheticated, getAllCategories);

portfolioRouter.delete(
  "/delete-project/:categoryId/:projectId",
  isAutheticated,
  deleteProjectFromCategory
);

portfolioRouter.delete(
  "/delete-category/:categoryId",
  isAutheticated,
  deleteCategory
);

portfolioRouter.get("/get-portfolio", isAutheticated, getPortfolioDash);

portfolioRouter.get("/get-portfolio/:userName", getPortfolio);

portfolioRouter.post("/contact", contact);

portfolioRouter.get("/get-contacts", isAutheticated, getContacts);

portfolioRouter.post("/send-newsLetter", sendNewsLetter);

export default portfolioRouter;
