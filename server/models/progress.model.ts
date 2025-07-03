import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILessonProgress extends Document {
  lessonId: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number; // in minutes
  watchTime: number; // in seconds for videos
}

export interface ICourseProgress extends Document {
  userId: string;
  courseId: string;
  enrolledAt: Date;
  lastAccessedAt: Date;
  totalTimeSpent: number; // in minutes
  completionPercentage: number;
  isCompleted: boolean;
  completedAt?: Date;
  lessons: ILessonProgress[];
  notes: string[];
  bookmarks: {
    lessonId: string;
    timestamp: number;
    note?: string;
  }[];
}

const lessonProgressSchema: Schema<ILessonProgress> = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
  watchTime: {
    type: Number,
    default: 0,
  },
});

const courseProgressSchema: Schema<ICourseProgress> = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    lessons: [lessonProgressSchema],
    notes: [
      {
        type: String,
      },
    ],
    bookmarks: [
      {
        lessonId: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Number,
          required: true,
        },
        note: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Create compound index for efficient queries
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
courseProgressSchema.index({ userId: 1 });
courseProgressSchema.index({ courseId: 1 });

const ProgressModel: Model<ICourseProgress> = mongoose.model(
  "Progress",
  courseProgressSchema,
);

export default ProgressModel;
