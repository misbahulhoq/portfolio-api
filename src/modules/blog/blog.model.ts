import { Document, Types } from "mongoose";
export interface IComment extends Document {
  name: string; // Name of the commenter
  email?: string; // Optional email of the commenter
  text: string;
  createdAt: Date;
}

// Interface for the Blog document (this remains unchanged)
export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: Types.ObjectId;
  tags: string[];
  status: "draft" | "published" | "archived";
  featuredImage?: string;
  views: number;
  likeCount: number;
  dislikeCount: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
