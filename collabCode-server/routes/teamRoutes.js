import express from "express";
import auth from "../middleware/authMidlleware.js";
import {createTeam,getMyTeams,joinTeam,getProjectsOfTeam} from "../controllers/teamController.js";

const router = express.Router();

router.post("/create",auth,createTeam);
router.get("/my",auth,getMyTeams);
router.post("/join",auth,joinTeam);
router.get("/projects",auth,getProjectsOfTeam)

export default router;
