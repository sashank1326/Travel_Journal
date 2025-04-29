


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    getOrCreateConversation,
    sendMessage,
    getMessages,
    getUserConversations
} from "../controllers/chatController.js";
import Message from '../models/message.js';
import mongoose from 'mongoose';

const router = express.Router();

// Protect all chat routes with authentication
router.use(authMiddleware);

// Add this new route for blog messages
router.get('/blog-messages/:blogId', async (req, res) => {
    try {
        const messages = await Message.find({ 
            blogId: new mongoose.Types.ObjectId(req.params.blogId) 
        })
        .sort({ createdAt: 1 })
        .populate('sender', 'name')
        .populate('receiver', 'name');
        
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Existing chat routes
router.post("/conversation", getOrCreateConversation);
router.post("/message", sendMessage);
router.get("/messages/:conversationId", getMessages);
router.get("/conversations", getUserConversations);

export default router;


