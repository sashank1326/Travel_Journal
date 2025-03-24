import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, default: "" },
    dateOfTravel: { type: Date },
    tags: { type: [String], default: [] },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    rating: { type: Number, min: 1, max: 5 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    visibility: { type: Boolean, default: true },
});

const Blog = mongoose.model("Blog", blogSchema);

// Ensure you are using default export
export default Blog;
