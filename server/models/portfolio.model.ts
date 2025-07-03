require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for the Portfolio schema
export interface IPortfolio extends Document {
    userId: mongoose.Schema.Types.ObjectId; // Referencing the User model
    userName: string;
    facebookLink?: string;
    instagramLink?: string;
    linkedinLink?: string;
    githubLink?: string;
    skillsDesc?: string;
    projectsDesc?: string;
    description: string;
    image?: {
        public_id: string;
        url: string;
    };
    positions: string[],
    phoneNumber:string
}

// Portfolio schema definition
const portfolioSchema: Schema<IPortfolio> = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
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
                type:String,
            },
            url: {
                type:String,
            },
        },
        phoneNumber:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
);

const portfolioModel: Model<IPortfolio> = mongoose.model("Portfolio", portfolioSchema);

export default portfolioModel;
