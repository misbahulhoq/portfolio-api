import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required."],
      unique: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "A thumbnail URL is required."],
    },
    repoLinks: {
      frontend: {
        type: String,
        required: [true, "The frontend repository link is required."],
      },
      backend: {
        type: String, // Not required
      },
    },
    liveSiteLink: {
      type: String, // Not required, as not all projects have a live site
    },
    description: {
      type: String,
      required: [true, "A project description is required."],
    },
    features: {
      type: String,
      required: [true, "Project features are required."],
    },
    technologies: {
      type: [String],
      required: [true, "Please list the technologies used."],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0, // A lower number can mean higher priority
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Project = model<IProject>("Project", projectSchema);

export default Project;
