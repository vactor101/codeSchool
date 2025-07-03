"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kidProfile_controller_1 = require("../controllers/kidProfile.controller");
const auth_1 = require("../middleware/auth");
const kidRouter = express_1.default.Router();
// Route to add a kid (for users with role "user")
kidRouter.post("/add-kid", kidProfile_controller_1.addKid);
// Route to edit kid follow-up data (for users with role "admin")
kidRouter.put("/edit-kid/:kidId", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), kidProfile_controller_1.editKidFollowUp);
// Route to get all kids (for users with role "admin")
kidRouter.get("/all-kids", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), kidProfile_controller_1.getAllKids);
// Route to get all courses (for users with role "admin")
kidRouter.get("/all-courses", kidProfile_controller_1.getAllKids);
exports.default = kidRouter;
