import express from "express";
import auth from "../middleware/authMidlleware.js";
import {createProject,getProjectsByteam} from "../controllers/projectController.js";

const router = express.Router();

router.post("/create",auth,createProject);
router.get("/team/:teamUsername",auth,getProjectsByteam);

export default router;
