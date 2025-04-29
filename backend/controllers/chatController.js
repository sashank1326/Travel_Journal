import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import User from "../models/user.js";

// 📌 Function to create or get a conversation
export const getOrCreateConversation = async (req, res) => {
    try {
        const { participantId } = req.body;
        const userId = req.user.id;

        if (participantId === userId) {
            return res.status(400).json({ message: "Cannot start conversation with yourself" });
        }

        // Check if conversation exists
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, participantId] }
        });

        if (!conversation) {
            // Create new conversation
            conversation = new Conversation({
                participants: [userId, participantId]
            });
            await conversation.save();
            console.log("✅ New conversation created");
        }

        res.status(200).json({ conversation });
    } catch (error) {
        console.error("❌ Error in conversation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 📌 Function to send a message
export const sendMessage = async (req, res) => {
    try {
        const { conversationId, content } = req.body;
        const sender = req.user.id;

        const newMessage = new Message({
            conversationId,
            sender,
            content,
        });

        await newMessage.save();

        // Update conversation's lastMessage timestamp
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: Date.now()
        });

        console.log("✅ Message sent successfully");
        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.error("❌ Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 📌 Function to get conversation messages
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        
        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 })
            .populate("sender", "name");

        res.status(200).json({ messages });
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 📌 Function to get user's conversations
export const getUserConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId
        })
        .populate("participants", "name email")
        .sort({ lastMessage: -1 });

        res.status(200).json({ conversations });
    } catch (error) {
        console.error("❌ Error fetching conversations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};