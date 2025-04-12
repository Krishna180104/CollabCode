import express from "express";
import auth from "../middleware/authMidlleware.js";
import {createTeam,getMyTeams} from "../controllers/teamController.js";

const router = express.Router();

router.post("/create",auth,createTeam);
router.get("/my",auth,getMyTeams);

export default router;
