import { Document } from "mongoose";

// Interface for the Project document
export interface IProject extends Document {
  title: string;
  thumbnail: string;
  repoLinks: {
    frontend: string;
    backend?: string; // Optional for frontend-only projects
  }; // Link to GitHub/source code
  liveSiteLink?: string; // Optional link to the live demo
  description: string; // To store HTML from React Quill
  features: string; // To store HTML from React Quill
  technologies: string[];
  displayOrder: number; // For sorting projects on your portfolio
  createdAt: Date;
  updatedAt: Date;
}
