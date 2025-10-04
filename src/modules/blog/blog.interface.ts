import { Schema, model } from "mongoose";
import { IBlog, IComment } from "./blog.model";

//  Comment Schema for anonymous users
const commentSchema = new Schema<IComment>({
  name: {
    type: String,
    required: [true, "Name is required for comments."],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // Optional: Basic email format validation
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Blog Schema
const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
      trim: true,
      minlength: [5, "Title must be at least 5 characters long."],
      maxlength: [150, "Title cannot be more than 150 characters long."],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    excerpt: {
      type: String,
      maxlength: [300, "Excerpt cannot be more than 300 characters."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    featuredImage: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook (remains the same)
blogSchema.pre<IBlog>("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  if (this.isModified("likeCount")) {
    this.likeCount = this.likeCount + 1;
  }
  if (this.isModified("dislikeCount")) {
    this.dislikeCount = this.dislikeCount + 1;
  }
  next();
});

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
