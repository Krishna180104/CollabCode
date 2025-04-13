import express from "express";
import auth from "../middleware/authMidlleware.js";
import {createTask,deleteTask,updateTask,getTasksByProject} from "../controllers/taskController.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/create",auth,checkRole(['Owner','Admin']),createTask);
router.get("/project/:projectId",auth,getTasksByProject);
router.put('/update/:taskId', auth, updateTask);
router.delete('/delete/:taskId', auth,checkRole(['Owner','Admin']), deleteTask);

export default router;