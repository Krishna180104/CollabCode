import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) =>{
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort({ createdAt: -1 })
            .populate("relatedTask", "title");

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, recipient: req.user.id },
            { isRead: true },
            { new: true }
        );

        if (!notification)
            return res.status(404).json({ message: "Notification not found" });

        res.json({ message: "Notification marked as read", notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ recipient: req.user.id, isRead: false }, { isRead: true });
        res.json({ message: "All notifications marked as read" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};