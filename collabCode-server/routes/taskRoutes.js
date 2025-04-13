import express from "express";
import auth from "../middleware/authMidlleware.js";
import {createTask,deleteTask,updateTask,getTasksByProject} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create",auth,createTask);
router.get("/project/:projectId",auth,getTasksByProject);
router.put('/update/:taskId', auth, updateTask);
router.delete('/delete/:taskId', auth, deleteTask);

export default router;