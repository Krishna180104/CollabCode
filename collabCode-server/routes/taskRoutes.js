import express from "express";
import {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
    addComment
} from "../controllers/taskController.js";
import auth from "../middleware/authMidlleware.js";

const router = express.Router();

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasksByProject);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);
router.post("/:taskId/comment", auth, addComment);

export default router;
