// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema({
//     conversationId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Conversation',
//         required: true
//     },
//     sender: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     read: {
//         type: Boolean,
//         default: false
//     }
// }, { timestamps: true });

// export default mongoose.model("Message", MessageSchema);

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Message", MessageSchema);