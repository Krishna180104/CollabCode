import express from "express";
import {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
    addComment
} from "../controllers/taskController.js";
import auth from "../middleware/authMidlleware.js";
import checkRole from "../middleware/checkRole.js"

const router = express.Router();

router.post("/", auth,checkRole(['Owner','Admin']) ,createTask);
router.get("/:projectId", auth, getTasksByProject);
router.put("/:taskId", auth,checkRole(['Owner','Admin']) ,updateTask);
router.delete("/:taskId", auth,checkRole(['Owner','Admin']) ,deleteTask);
router.post("/:taskId/comment", auth, addComment);

export default router;
