import mongoose, { Document, Model, Schema } from "mongoose";
import { ICourse } from "./course.model";

// Define the interface for KidProfile
interface IKidProfile extends Document {
  kidName: string;
  age: number;
  mobileNumber: string;
  suggestedCourses: ICourse[];
  followUp1: boolean;
  note1: string;
  followUp2: boolean;
  note2: string;
  followUp3: boolean;
  note3: string;
  customerFeedback: string;
  whatsAppLink: string;
  faceBookLink: string;
  mobile: string;
  instagramLink: string;
  tag: string;
  //   createdAt?: Date;
  //   updatedAt?: Date;
}

// Define the schema
const KidProfileSchema = new Schema<IKidProfile>(
  {
    kidName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    suggestedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    followUp1: {
      type: Boolean,
      default: false,
    },
    note1: {
      type: String,
      default: "",
    },
    followUp2: {
      type: Boolean,
      default: false,
    },
    note2: {
      type: String,
      default: "",
    },
    followUp3: {
      type: Boolean,
      default: false,
    },
    note3: {
      type: String,
      default: "",
    },
    customerFeedback: {
      type: String,
      default: "",
    },
    whatsAppLink: {
      type: String,
      default: "",
    },
    faceBookLink: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    instagramLink: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "lead",
      enum: ["lead", "wine", "froze", "lost"],
    },
  },
  {
    timestamps: true,
  }
);

const KidProfileModel: Model<IKidProfile> = mongoose.model(
  "KidProfile",
  KidProfileSchema
);

export default KidProfileModel;