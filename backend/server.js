
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import path from "path";

// import authRoutes from "./routes/authRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import geminiRoutes from "./routes/geminiRoutes.js";
// import flightRoutes from "./routes/flightRoutes.js";
// // import testRoutes from "./routes/testRoutes.js";
// import geoapifyRoutes from "./routes/geoapifyRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";

// // For Socket





// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// // ✅ Serve uploaded images as static files
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads", express.static("uploads"));

// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/gemini", geminiRoutes); // ✅ Add Gemini Route
// app.use("/api/flights", flightRoutes); // ✅ Enabled Flights API
// // app.use("/api", testRoutes);
// app.use("/api/geoapify", geoapifyRoutes);  // ✅ Add Geoapify Route
// app.use("/api/chat", chatRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

//for socket
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import geoapifyRoutes from "./routes/geoapifyRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Message from './models/message.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5500", "null"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    },
    transports: ['websocket', 'polling']
});

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500", "null"],
    credentials: true
}));

// ✅ Serve uploaded images as static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/geoapify", geoapifyRoutes);
app.use("/api/chat", chatRoutes);

// Add Socket.io debug logging
io.engine.on("connection_error", (err) => {
    console.log("🔴 Socket.io connection error:", err);
});

// Socket.io connection handling
io.on("connection", (socket) => {

    // These are needed for logging and to chat what is wrong 
    
    // console.log("🟢 Socket.io Status:");
    // console.log("- Server running:", io.engine.clientsCount, "clients connected");
    // console.log("- Socket ID:", socket.id);
    // console.log("- Transport:", socket.conn.transport.name);

    socket.on("join", (data) => {
        socket.join(data.blogId);
        console.log(`👥 User ${data.userId} joined blog chat: ${data.blogId}`);
    });

    // These are needed for logging and to chat what is wrong 

    socket.on("send_message", async (messageData) => {
        try {
            // Validate that sender is not the author
            if (messageData.userId === messageData.authorId) {
                console.log("❌ Cannot send message to yourself");
                return;
            }
    
            // Convert string IDs to ObjectIds
            const senderId = new mongoose.Types.ObjectId(messageData.userId);
            const receiverId = new mongoose.Types.ObjectId(messageData.authorId);
            const blogId = new mongoose.Types.ObjectId(messageData.blogId);
    
            // Save message to database with converted IDs
            const newMessage = new Message({
                content: messageData.text,
                sender: senderId,
                receiver: receiverId,
                blogId: blogId,
                read: false
            });
            await newMessage.save();

            // Emit to chat room
            io.to(messageData.blogId).emit("receive_message", {
                text: messageData.text,
                userId: messageData.userId,
                authorId: messageData.authorId
            });
    
            console.log("📨 Message saved and sent in blog chat:", messageData.blogId);
        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    });
    
    socket.on("disconnect", () => {
        console.log("👋 User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        httpServer.listen(PORT, () => 
            console.log(`✅ Server running on port ${PORT} with Socket.io enabled`)
        );
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));