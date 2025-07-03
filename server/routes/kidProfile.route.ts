import express from "express";
import {
  addKid,
  editKidFollowUp,
  getAllKids,
} from "../controllers/kidProfile.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const kidRouter = express.Router();

// Route to add a kid (for users with role "user")
kidRouter.post("/add-kid", addKid);

// Route to edit kid follow-up data (for users with role "admin")
kidRouter.put(
  "/edit-kid/:kidId",
  isAutheticated,
  authorizeRoles("admin"),
  editKidFollowUp
);

// Route to get all kids (for users with role "admin")
kidRouter.get(
  "/all-kids",
  isAutheticated,
  authorizeRoles("admin"),
  getAllKids
);

// Route to get all courses (for users with role "admin")
kidRouter.get(
  "/all-courses",
  getAllKids
);

export default kidRouter;
