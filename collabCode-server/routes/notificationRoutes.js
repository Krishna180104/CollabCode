

import express from "express";
import {
    getNotifications,
    markAsRead,
    markAllAsRead
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMidlleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.put("/:notificationId/read", authMiddleware, markAsRead);
router.put("/mark-all-read", authMiddleware, markAllAsRead);

export default router;
