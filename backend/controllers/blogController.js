
// import fs from "fs";
// import path from "path";
// import heicConvert from "heic-convert";
// import { fileURLToPath } from "url";
// import Blog from "../models/blog.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const createBlog = async (req, res) => {
//     try {
//         console.log("📩 Request received:", req.body);
//         console.log("🖼️ Files received:", req.files);

//         const { title, location, dateOfTravel, tags, content, rating } = req.body;

//         if (!title || !content) {
//             return res.status(400).json({ message: "Title and content are required" });
//         }

//         let images = [];
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 let filePath = file.path;

//                 // If HEIC, convert to JPG
//                 if (file.mimetype === "image/heic" || file.mimetype === "image/heif") {
//                     const jpgPath = filePath.replace(".heic", ".jpg");
//                     const inputBuffer = fs.readFileSync(filePath);
//                     const outputBuffer = await heicConvert({
//                         buffer: inputBuffer,
//                         format: "JPEG",
//                         quality: 0.8,
//                     });

//                     fs.writeFileSync(jpgPath, outputBuffer);
//                     fs.unlinkSync(filePath); // Remove original HEIC file
//                     filePath = jpgPath;
//                 }
                
//                 images.push(filePath);
//             }
//         }

//         const newBlog = new Blog({
//             title,
//             location,
//             dateOfTravel,
//             tags,
//             content,
//             images,
//             rating,
//             author: req.user.id,
//             updatedAt: Date.now(),
//         });

//         await newBlog.save();
//         res.status(201).json({ message: "✅ Blog created successfully", blog: newBlog });
//     } catch (error) {
//         console.error("❌ Error creating blog:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };




import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";
import { fileURLToPath } from "url";
import Blog from "../models/blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBlog = async (req, res) => {
    try {
        console.log("📩 Request received:", req.body);
        console.log("🖼️ Files received:", req.files);

        const { title, location, dateOfTravel, tags, content, rating } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        let images = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                let filePath = file.path;

                // If HEIC, convert to JPG
                if (file.mimetype === "image/heic" || file.mimetype === "image/heif") {
                    try {
                        console.log(`🔄 Converting HEIC to JPG: ${filePath}`);
                        const jpgPath = filePath.replace(/\.(heic|HEIC|heif|HEIF)$/, ".jpg");
                        const inputBuffer = fs.readFileSync(filePath);
                        const outputBuffer = await heicConvert({
                            buffer: inputBuffer,
                            format: "JPEG",
                            quality: 0.8,
                        });

                        fs.writeFileSync(jpgPath, outputBuffer);
                        fs.unlinkSync(filePath); // Remove original HEIC file
                        filePath = jpgPath; // Update path to JPG
                        console.log(`✅ HEIC converted successfully: ${jpgPath}`);
                    } catch (error) {
                        console.error("❌ HEIC conversion failed:", error);
                        return res.status(500).json({ message: "Error converting HEIC file" });
                    }
                }

                images.push(filePath);
            }
        }

        // Ensure tags is an array
        const formattedTags = tags ? tags.split(",").map(tag => tag.trim()) : [];

        const newBlog = new Blog({
            title,
            location,
            dateOfTravel,
            tags: formattedTags,
            content,
            images,
            rating,
            author: req.user.id,
            updatedAt: Date.now(),
        });

        await newBlog.save();
        console.log("✅ Blog created successfully:", newBlog);
        res.status(201).json({ message: "✅ Blog created successfully", blog: newBlog });
    } catch (error) {
        console.error("❌ Error creating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
