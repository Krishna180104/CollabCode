import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: String,
    type: String, // e.g., task_assigned, task_updated
    relatedTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Notification", notificationSchema);
