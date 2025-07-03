require("dotenv").config();

import { Document, model, Model, Schema } from "mongoose";

// Interface for the Project Subdocument
interface IProject {
  name: string;
  description: string;
  link: string;
  image: {
    public_id: string;
    url: string;
  };
}

// Interface for the Category Document
export interface ICategory extends Document {
  portfolioId: Schema.Types.ObjectId;
  categoryName: string; // Category name
  projects: IProject[]; // Array of project subdocuments
}

// Define the Project Subdocument Schema
const projectSchema: Schema<IProject> = new Schema(
  {
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
  },
  { _id: true } // Disable _id for subdocuments
);

// Define the Category Schema with Projects as Subdocuments
const categorySchema: Schema<ICategory> = new Schema(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
    categoryName: {
      type: String,
      required: [true, "Please enter category name"],
    },
    projects: [projectSchema], // Array of project subdocuments
  },
  {
    timestamps: true,
  }
);

const categoryModel: Model<ICategory> = model("Category", categorySchema);
export default categoryModel;
