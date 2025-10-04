"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//  Comment Schema for anonymous users
const commentSchema = new mongoose_1.Schema({
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
const blogSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    likeCount: {
        type: Number,
        default: 0,
    },
    // The comments field uses the updated commentSchema
    comments: [commentSchema],
}, {
    timestamps: true,
});
// Pre-save hook (remains the same)
blogSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }
    if (this.isModified("likes")) {
        this.likeCount = this.likes.length;
    }
    next();
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
