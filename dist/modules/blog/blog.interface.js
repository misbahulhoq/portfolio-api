"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
    likeCount: {
        type: Number,
        default: 0,
    },
    dislikeCount: {
        type: Number,
        default: 0,
    },
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
    if (this.isModified("likeCount")) {
        this.likeCount = this.likeCount + 1;
    }
    if (this.isModified("dislikeCount")) {
        this.dislikeCount = this.dislikeCount + 1;
    }
    next();
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
